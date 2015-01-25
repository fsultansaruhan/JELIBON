if (Meteor.isClient) {


Template.companyJoin.rendered = function () {


$('#companyjoinform').validate(
{					
					// Rules for form validation
					rules:
					{
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
						}
					},
					
					// Messages for form validation
					messages:
					{
						username:
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
						}
					},
					errorPlacement: function(error, element)
					{
						error.insertAfter(element.parent());
					}
				});
};

var ERRORS_KEY = 'companyjoinErrors';
Template.companyJoin.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  }
});

Template.companyJoin.events({

	'submit form' : function(event, template) {
	event.preventDefault();
	var emailAddress = template.$('[name=emailAddress]').val();
	var userName = template.$('[name=username]').val();
	var passwordConfirm = template.$('[name=passwordConfirm]').val();
	var password2 = template.$('[name=password]').val();

     Accounts.createUser({
      email: emailAddress,
      password: password2,
      profile: {
                username:userName
    },

    }, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }

	  if (Meteor.user()) {
	  Meteor.logout(function() {
            Router.go('verifyEmail');
        });
      };
      
    });
	}
});

}