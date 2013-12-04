
NU.ApplicationController = Ember.Controller.extend({
  menu: []
  , clearMenu: function() {
    for(var i = this.menu.length-1; i >= 0; i--) this.menu.popObject(i);
  }
  , lang: 'db'
  , langObserver: function() {
      this.set('lang', NU.Application.lang);
  }.observes('NU.Application.lang')
  , contractObserver: function() {
    var _self = this;
    $.ajax({
      url: '/en/api/v1/contracts/' + NU.Application.contract,
      async: false
    }).success(function(data) {
      _self.clearMenu();
      for (var i = 0; i < data.menu.length; i++) {
	  data.menu[i].isAnchor = (data.menu[i].type == 'anchor');
	  if (data.menu[i].type.match(/[sS]ub[mM]enu/))
	      data.menu[i].url = data.menu[i].type.match(/contract/) ? "/nc/" + NU.Application.contract + "/menu/" + data.menu[i].url : "/menu/" + data.menu[i].url;
	  _self.menu.pushObject(data.menu[i]);
      }
      if (NU.Application.contract != 'main') {
      	_self.menu.pushObject({'title': 'Seznam zakázek', 'url': 'contracts', 'isAnchor': true})
     	_self.menu.pushObject({'title': 'O firme', 'isAnchor': true, 'url': 'about'})
      }
      _self.set('title', data.title);

    });
  }.observes('NU.Application.contract')
  , title: null
  , init: function() {
    NU.Application.set('contract', 'main');
    this.contractObserver();
  }
  , actions: {
    changeLang: function(toLang) {
      this.transitionToRoute(this.currentRouteName, toLang);
    }
  }
});

NU.BaseController = Ember.ObjectController.extend({
  needs: 'application'
  , application: Ember.computed.alias('controllers.application')
})
NU.ArrayBaseController = Ember.ArrayController.extend({
  needs: 'application'
  , application: Ember.computed.alias('controllers.application')
})
NU.ContractsIndexController = NU.ArrayBaseController.extend({});
NU.ContractIndexController = NU.BaseController.extend({});
NU.LangController = NU.BaseController.extend({});
NU.AboutController = NU.BaseController.extend({});
NU.SubmenuController = NU.BaseController.extend({
  menu: []
  , clearMenu: function() {
    for(var i = this.menu.length-1; i >= 0; i--) this.menu.popObject(i);
  }
});

