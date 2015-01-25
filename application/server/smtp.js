Meteor.startup(function () {

/* bu kısımda meteorun içinde ki userlara ulaşıp onların maillerine 
mail gönderdiğimiz kısım yani 
cliend da join ettiğimiz kullanıcıyı server a işlediğimiz mailleri gönderdiğimi
alan  */

  if (Meteor.isServer) {
    var loginAttemptVerifier = function(parameters) {
    	/* burada mail e göre işlem yaptırıyor */
      if (parameters.user && parameters.user.emails && (parameters.user.emails.length > 0)) {
        // return true if verified email, false otherwise.
        //burada kullanıcı yüklendiyse yani bilgileri found a yüklüyor
        var found = _.find(
                           parameters.user.emails, 
                           function(thisEmail) { return thisEmail.verified }
                          );
        	//found boş değil ise burada ki e mail adresini gönderdiğimize 
        	//dair bilgi veriyoruz burada
        if (!found) {
          throw new Meteor.Error(500, 'We send validation e-mail your address');
        }
        return found && parameters.allowed;
        /* eğer mail ile ilgili bir hataya raslarsak hatayı log olara
        console alanına gönderiyoruz.*/
      } else {
        console.log("user has no registered emails.");
        return false;
      }
    }
    /* burada da yukarıda ki işlemleri tamamlayıo
    validateloginattempt metoduna yukarıda ki fonksiyonlarımızdan
    eşitlediğimiz işlemleri alıyoruz ve gönderiyoruz bu saayede işlemi 
    bitirmiş oluyoruz.*/
    Accounts.validateLoginAttempt(loginAttemptVerifier);
  }


/* burad amail göndereceğimiz adresin smtp ayarlarını belirtiyoruz
yani bir nevi sunucu ayarı gibi */
process.env.MAIL_URL = 'smtp://dynorder%40novaside.com:do852456@smtp.gmail.com:587';
Accounts.emailTemplates.from = "no-reply@mydomain.com";
Accounts.emailTemplates.sitename = "My SIte Name";

Accounts.emailTemplates.verifyEmail.subject = function(user) {
  return 'Please confirm your e-mail address' ;
},
Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  return 'Click on the link below to verify your address: ' + url;
}

Accounts.emailTemplates.resetPassword.subject = function(user) {
  return 'Please reset your e-mail address' ;
},
Accounts.emailTemplates.resetPassword.text = function(user, url) {
  return 'Click on the link below to reset your address: ' + url;
}
/* bu adımdan itibaren ise mail i göndermiş oluyoruz */
Accounts.config({
  sendVerificationEmail: true
});

});

(function () {
    "use strict";

    Accounts.urls.resetPassword = function (token) {
        return Meteor.absoluteUrl('reset-password/' + token);
    };
    /*burada ise verifymail in linkini oluşturuyoruz*/
    Accounts.urls.verifyEmail = function (token) {
        return Meteor.absoluteUrl('verify-email/' + token);
    };

})();