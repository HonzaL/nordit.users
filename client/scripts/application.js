
window.NU = Ember.Application.create({
  LOG_TRANSITIONS: true
  , LOG_TRANSITIONS_INTERNAL: true
  , LOG_VIEW_LOOKUPS: true
});

Ember.Handlebars.helper('inc', function(value, options) {
    return value + 1;
});
Ember.Handlebars.helper('valByKey', function(object, key) {
    return object[key];
})
Ember.Handlebars.helper('round', function(value, ndn) {
    return parseFloat(value).toFixed(ndn);
})
Ember.Handlebars.helper('roundValByKey', function(object, key, ndn) {
    if (typeof object[key] === 'string') return object[key];
    var value = parseFloat(object[key]);
    return value ? value.toFixed(ndn) : object[key];
})

// Taken from http://stackoverflow.com/questions/10274391/is-it-possible-to-load-handlebar-template-with-script-tag-or-define-handlebar-t/13474886#13474886
Ember.View.reopen({
    templateForName: function(name, type) {
        if (!name) { return; }
        var templates = Ember.get(this, 'templates')
	  , template = null;
	try {
            template = Ember.get(templates, name);
	} catch(err) {}
	var urlPrefix = name.indexOf('||') == -1 ? '' : '/' + NU.Application.lang + '/nc/' + NU.Application.contract; 
        urlName = name.replace(/^[^\|]*\|\|/, "");
	var url = urlName.match(/^\//) ? urlName : urlPrefix + '/views/templates/%@.hbs'.fmt(urlName);
        if (!template) {
            $.ajax({
                url: url,
                async: false
            }).success(function(data) {
                template = Ember.Handlebars.compile(data);
		Ember.TEMPLATES[name] = template;
            });
        }
        if (!template) {
            throw new Ember.Error('%@ - Unable to find %@ "%@".'.fmt(this, type, name));
        }
        return template;
    }
});

NU.Application = Ember.Object.create({
  lang: 'db'
  , CONTRACTS: {}
  , contract: ''
});

NU.AboutView = Ember.View.extend({templateName: 'about'});
NU.RestrictedView = Ember.View.extend({templateName: 'restricted'});
NU.UserNewView = Ember.View.extend({templateName: 'user/new'});
NU.LoginView = Ember.View.extend({templateName: 'authentication/login'});
NU.CommonView = Ember.View.extend({templateName: 'common'});
NU.NavigationView = Ember.View.extend({templateName: 'navigation'});
NU.SubmenuView = Ember.View.extend({templateName: 'index/submenu'});
NU.ContractsIndexView = Ember.View.extend({templateName: 'index/contracts'});
NU.ContractIndexView = Ember.View.extend({templateName: 'contracts/detail'});

// Spolecne pohledy
NU.AlarmsView = Ember.View.extend({templateName: 'index/alarms'});
NU.DataDrivenTableView = Ember.View.extend({templateName: 'index/dataDrivenTable'});
NU.SchemaView = Ember.View.extend({templateName: 'index/schema'});

NU.LoginWidgetView = Ember.View.extend({templateName: 'authentication/loginWidget'});
