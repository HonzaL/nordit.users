
NU.Router.map(function() {
    this.resource('main', {path: '/'});
    this.resource('lang', {path: '/:lang_id'}, function() {
	this.resource('login');
	this.resource('about');
	this.resource('common');
	this.resource('contracts',  function() {
	    this.resource('contract', {path: "/:contract_id"}, function() {
		this.route('bake');
	    });
	});
    });
//    this.route('fhaf', {path: '/*'});
})
NU.Router.reopen({location: 'history'});

NU.BaseRoute = Ember.Route.extend({
  actions: {
    error: function(reason, transition) {
	// vyvola se pokud prijde Unauthenticated - pozadavek na login
	if (reason.status === 401) {
	    redirectToLogin(transition);
	}
    },
    anchor: function(url) {
      this.transitionTo(url, NU.Application.lang);
    },
    anchor2: function(url, param) {
      this.transitionTo(url, NU.Application.lang, param);
    },
    submenu: function(submenu) {
      var _self = this;
      $.ajax({
        url: '/' + NU.Application.lang + submenu + '.ejs',
        async: false
      }).success(function(data) {
	var submenuCtrl = _self.controllerFor('submenu');
	submenuCtrl.clearMenu();
	if (typeof data === 'string')
	    data = $.parseJSON(data);
	for (var i = 0; i < data.length; i++) {
	    submenuCtrl.menu.pushObject(data[i]);
        }
	_self.render('submenu', {into: 'application', controller: 'submenu', outlet: 'submenu'});
      });
    }
  },
  redirectToLogin: function(transition) {
      var loginController = this.controllerFor('login');
      loginController.set('attemptedTransition', transition);
      this.transitionTo('login');
  }
//  , activate: function() {
//    var controller = this.controllerFor('application');
//    controller.set('lastFilter', this.templateName);
//  }
});

NU.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1'
})

// Redirect do about pokud pristupuji do root aplikace
NU.MainRoute = NU.BaseRoute.extend({beforeModel: function() { this.transitionTo('about', 'en'); }});
// Nastaveni jazyka pri pruchodu Lang routou
NU.LangRoute = NU.BaseRoute.extend({
  model: function(params) {
    NU.Application.set('lang', params.lang_id);
    this.controllerFor('application').langObserver();
    return {};
  }
});
NU.Contract = DS.Model.extend({
  _id: DS.attr('string'),
  title: DS.attr('string'),
  active: DS.attr('boolean')
})
NU.ContractsIndexRoute = NU.BaseRoute.extend({
  model: function() {
    return this.store.find('contract');
  }
})
// Nastaveni prave prohlizene zakazky
// TODO Nacteni js dane zakazky - pokud jeste nebyla nactena
NU.ContractRoute = NU.BaseRoute.extend({
    model: function(params) {
	NU.Application.set('contract', params.contract_id);
    }
});

NU.ContractIndexRoute = NU.BaseRoute.extend({
  setupController: function(controller, model) {
    controller.set('model', model);
    console.log('ContractDetail Route - setupController');

    // nacist vse kolem zakazky a redirect na main stranku zakazky
    var _self = this;
    var contract_id = NU.Application.contract;
    $.ajax({
      url: '/' + NU.Application.lang + '/nc/' + contract_id + '/scripts/' + contract_id + '.js',
      async: false
    }).success(function(data) {
	eval(data);
	if (NU.Application.contract != 'main') {
            _self.transitionTo(NU.Application.contract + '.main', NU.Application.lang, NU.Application.contract);
	}
    });
  }
  , serialize: function(model) {
      return {contract_id: NU.Application.contract};
  }
/*  , init: function() {
    this._super();
    console.log('ContractDetail Route - init');

    // nacist vse kolem zakazky a redirect na main stranku zakazky
    var _self = this;
    var contract_id = 'desin';//this.controllerFor('application').contract;
    $.ajax({
      url: '/en/nc/' + contract_id + '/scripts/' + contract_id + '.js',
      async: false
    }).success(function(data) {
	eval(data);
    });
  }
*/
})

NU.CommonRoute = NU.BaseRoute.extend();






