if (Meteor.isClient) {


Template.companyJoin.rendered = function () {


$('#companyjoinform').validate(
{					
					// Rules for form validation
					rules:
					{
						domain:
						{
							required: true,
							url:true
						},
						username:
						{
							required: true
						},
						emailAddress:
						{
							required: true,
							email: true
						},
						password:
						{
							required: true,
							minlength: 3,
							maxlength: 20
						},
						passwordConfirm:
						{
							required: true,
							minlength: 3,
							maxlength: 20,
							equalTo: '#password'
						},
						firstname:
						{
							required: true
						},
						lastname:
						{
							required: true
						},
						gender:
						{
							required: true
						},
						terms:
						{
							required: true
						}
					},
					
					// Messages for form validation
					messages:
					{
						domain:
						{
							required: 'Please enter your domain address',
							url: 'Please enter a valid domain name e.g.http://www.etibol.com'
						},
						login:
						{
							required: 'Please enter your login'
						},
						emailAddress:
						{
							required: 'Please enter your email address',
							email: 'Please enter a VALID email address'
						},
						password:
						{
							required: 'Please enter your password'
						},
						passwordConfirm:
						{
							required: 'Please enter your password one more time',
							equalTo: 'Please enter the same password as above'
						},
						firstname:
						{
							required: 'Please select your first name'
						},
						lastname:
						{
							required: 'Please select your last name'
						},
						gender:
						{
							required: 'Please select your gender'
						},
						terms:
						{
							required: 'You must agree with Terms and Conditions'
						}
					},
					errorPlacement: function(error, element)
					{
						error.insertAfter(element.parent());
					}
				});
};

var ERRORS_KEY = 'companyjoinErrors';
/* Helper hazırlayarak login olduğumuz da 
hata var mı yokmu var sa ne hatası yakalayabilmemizi sağlıyor */
Template.companyJoin.helpers({
/* burada errorları yakalayıp gösterebilmek için  helper hazırladık
errorMessages ismi ile bunu join sayfamızda yakaladık hata olduğunda 
bunu ile gosterdik içerisindeki Session.get hata halinde gönderilen çalıştırılan
set komutunun cevabı olarak ERRORS_KEY yayınlanacak demek */

  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));

  }
});

Template.companyJoin.events({

	/* bu function da companyJoin template içindeki form da bulunan
	submit nesnesinin tetiklendiğinde yapması gereken olayı bize anlatıyor 
	ilk olarak değişkenleri aldık  */
	'submit form' : function(event, template) {
	event.preventDefault();
	var domain = template.$('[name=domain]').val();
	var emailAddress = template.$('[name=emailAddress]').val();
	var passwordConfirm = template.$('[name=passwordConfirm]').val();
	var password2 = template.$('[name=password]').val();
	var firstname = template.$('[name=firstname]').val();
	var lastname = template.$('[name=lastname]').val();
	var gender = template.$('[name=gender]').val();
	var subscriptons = template.$('[name=subscription]').val();
	var terms = template.$('[name=terms]').val();
	/* burada accounts-password paketinin getirdiği bir koleksiyonu kullanarak
	createUser metodu ile kullanıcı oluşturduk yukarıda tanımladığımız 
	değişkenleri burada accounts ın niteliği olarak belirleyip 
	kayıt etmesini sağlıyoruz.*/
     Accounts.createUser({
      email: emailAddress,
      password: password2,

      profile: {
                first_name: firstname,
                last_name: lastname,
                domain : domain,
                gender : gender,
                subscriptons : subscriptons,
                terms : terms
    },
    /* ilk olarak hatanın var olup olmadığına bakıyoruz error u de bize 
    accounts-password paketi gönderiyor biz burada sadece var olup olmadığını
    kontrol ediyoruz çünkü diğer tüm olasılıklara validate lerle kontrol
    ediyoruz bu sayede ek seçeneklere gerek kalmıyor ilk olarak ERRORS_KEY i 
    gönderiyoruz daha sonra mesajımızı gönderiyoruz error.reason burada
    bizim mesajımız oluyor EMAIL ALREADY EXISTS. yazısını hazır olarak
    aldığımız bir error komutu*/
    }, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }
/*burada da meteor.user ile user var mı yokmu diye bakıyoruz eğer sorun 
oluşmadıysa kayıt olacaktır ve direk olarak giriş Employees sayfasına giriş 
yapacaktır burada söyle bir tezat var biz zaten kayıt işlemini yapıyoruz 
hata esnasında üstteki if de tıkanacağı için yanlış girdiler de de validate
ler devreye girdiği için burada sadece
else
{
	Route.go('Employees')
}
komutu kullanmış olsaydık aynı olacaktı bu defa sadece kullanıcı var mı
yok mu diye kontrol etmeyecekti o kadar
*/
/*
****Düzenleme****
meteor bir kullanıcıyı kayıt ettiğinde otomatik olarak online hale de getiriyor yani
giriş yapmış oluyor ama bizim isteğimiz önce activasayon mail i alsın sonra 
giriş yapabilsin bu nednele biz önce kontrol ediyoruz Meteor.user ile kullanıcı
girişi yapmış mı yapmamış mı  diye yapması durumunda giriş yapan kullanıcıyı 
logout metodu ile önce dışarıya çıkartıyoruz daha sonra aktivasyon mail i atıyoruz bu 
sayede sistemimizin açığını kapamış oluyoruz.

*/
	  if (Meteor.user()) {
	  Meteor.logout(function() {
            Router.go('verifyEmail');
        });
      };
      
    });
	}
});

}

/*  SAYGILARIMLA FATİH SULTAN SARUHAN :) */