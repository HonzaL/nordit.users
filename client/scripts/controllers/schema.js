
NU.SchemaController = NU.BaseController.extend({
    init: function() {
	this.reloadSchemaNative();
    },
    schemaUrl: null,
    schemaUrlObserver: function() {
	this.reloadSchemaNative();
    }.observes('schemaUrl'),
    schemaDirectUrl: null,
    reloadSchemaNative: function() {
	this.set('schemaDirectUrl', this.schemaUrl + "?"+ new Date().getTime());
    },
    actions: {
	reloadSchema:function() {
	    this.reloadSchemaNative();
	}
    }
})
