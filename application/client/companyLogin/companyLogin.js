if (Meteor.isClient) {

Template.companyLogin.rendered = function () {

$('#companyloginform').validate(
{					
					// Rules for form validation
					rules:
					{
						username:
						{
							required: true
						},
						password:
						{
							required: true,
							minlength: 3,
							maxlength: 20
						}
					},
					// Messages for form validation
					messages:
					{
						username:
						{
							required: 'Please enter your login'
						},
						password:
						{
							required: 'Please enter your password'
						}
					},
					errorPlacement: function(error, element)
					{
						error.insertAfter(element.parent());
					}
				});
};

var ERRORS_KEY = 'companyLoginErrors';


Template.companyLogin.created = function() {
  Session.set(ERRORS_KEY, {});
  console.log('created')
};

Template.companyLogin.helpers({
  errorMessages: function() {
  	console.log('helper')
    return _.values(Session.get(ERRORS_KEY));

  }
});
/* login events başı */
Template.companyLogin.events({
    'submit form': function(event, template) {
      // increment the counter when button is clicked
	event.preventDefault();
	var email = template.$('[name=userEmail]').val();
    var password = template.$('[name=password]').val();
    var user = Meteor.user();



    Meteor.loginWithPassword(email, password, function(error) {
        if (error) {
          console.log('hata')
          return Session.set(ERRORS_KEY, {'none': error.reason});

        } else {
          console.log('erişildi')
          Router.go('Employees');
        }
      });
    },



 });
/* login events sonu*/
}