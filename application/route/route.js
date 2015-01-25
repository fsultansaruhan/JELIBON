
Router.configure({
	layoutTemplate:'layout'
});

Router.configure({
    notFoundTemplate: 'notFound'   

});

Router.map(function () {
  this.route('home', {
  path: '/',
  template: 'home',
  layoutTemplate: 'layout',
  yieldTemplates: {
    'header': {to: 'Header'},
    'myFooter': {to: 'footer'}
    }
  });

  this.route('Employees', {
  path: '/Employees',
  template: 'Employees',
  layoutTemplate: 'layout',
  yieldTemplates: {
    'admHeader': {to: 'Header'},
    'Menu': {to: 'Menu'},
    'myFooter': {to: 'footer'}
    }
  });
   this.route('Project', {
  path: '/Project',
  template: 'Project',
  layoutTemplate: 'layout',
  yieldTemplates: {
    'Menu': {to: 'Menu'},
    'admHeader': {to: 'Header'},
    'myFooter': {to: 'footer'}
    }
  });
   this.route('companyJoin', {
  path: '/companyJoin',
  template: 'companyJoin',
  layoutTemplate: 'layout',
  yieldTemplates: {
     'header': {to: 'Header'},
    'myFooter': {to: 'footer'}
    }
  });
      this.route('companyLogin', {
  path: '/companyLogin',
  template: 'companyLogin',
  layoutTemplate: 'layout',
  yieldTemplates: {
     'header': {to: 'Header'},
    'myFooter': {to: 'footer'}
    }
  });
         this.route('verifyEmail', {
            controller: 'AccountController',
            path: '/verify-email/:token',
            action: 'verifyEmail'
        });
});

AccountController = RouteController.extend({

    verifyEmail: function () {
            Accounts.verifyEmail(this.params.token, function () {
                Router.go('/Employees');
            });
    }
});
