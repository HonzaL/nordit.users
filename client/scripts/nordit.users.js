
window.NU = Ember.Application.create({
  LOG_TRANSITIONS: true
});

// Taken from http://stackoverflow.com/questions/10274391/is-it-possible-to-load-handlebar-template-with-script-tag-or-define-handlebar-t/13474886#13474886
Ember.View.reopen({
    templateForName: function(name, type) {
        if (!name) { return; }
        var templates = Ember.get(this, 'templates'),
            template = Ember.get(templates, name);
 
        if (!template) {
            $.ajax({
                url: 'views/templates/%@.hbs'.fmt(name),
                async: false
            }).success(function(data) {
                template = Ember.Handlebars.compile(data);
            });
        }
        if (!template) {
            throw new Ember.Error('%@ - Unable to find %@ "%@".'.fmt(this, type, name));
        }
        return template;
    }
});

NU.ApplicationController = Ember.Controller.extend({
  actions: {
    changeLang: function(toLang) {
console.log(this)
      this.transitionToRoute(this.currentRouteName, toLang);
    }
  }
});

NU.AboutView = Ember.View.extend({templateName: 'about'});
NU.CommonView = Ember.View.extend({templateName: 'common'});

;NU.Router.map(function() {
    this.resource('main', {path: '/'});
    this.resource('lang', {path: '/:lang'}, function() {
	this.resource('about');
	this.resource('common');
	this.resource('contract', {path: '/contract/:id'})
    });    
})
NU.Router.reopen({location: 'history'});

NU.Router.map(function() {
    this.resource('lang', {path: '/:lang'}, function() {
	this.resource('append');
    });
});

NU.Router.map(function() {
    this.resource('lang', {path: '/:lang'}, function() {
	this.resource('append', {path: 'ble'});
    });
});

NU.BaseRoute = Ember.Route.extend({
  activate: function() {
    console.log('BaseRoute');
    var controller = this.controllerFor('application');
    controller.set('lastFilter', this.templateName);
  }
});

NU.AboutRoute = NU.BaseRoute.extend({
    model: function(params, transition) {
	console.log('AboutRoute');
//	console.log(transition.params.lang);
    }
})

NU.MainRoute = NU.BaseRoute.extend({beforeModel: function() { this.transitionTo('about', 'en'); }});
NU.CommonRoute = NU.BaseRoute.extend();
