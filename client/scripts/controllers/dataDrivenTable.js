
NU.DataDrivenTableController = NU.BaseController.extend({
    queryParams: ['month', 'year'],
    month: new Date().getMonth()+1,
    year: new Date().getFullYear(),
    yearObserver: function() {
	this.reloadNative();
    }.observes('year'),
    contract: null,
    resource: null,
    report: null,
    middleProcessing: null,
    init: function() {
	this.reloadNative();
    },
    reloadNative: function() {
	var _self = this
	window.history.pushState(window.location.href);
	var url = '/' + this.get('application').lang + "/nc/" + this.contract + "/api/v1/" + this.resource + "/?month=" + this.month + "&year=" + this.year;
	Em.$.get(url).then(function(response) {
	    if (typeof _self.middleProcessing === 'function')
		_self.middleProcessing(response)
	    _self.set('report', response);
	});
    },
    actions: {
	filter: function() {
	    this.reloadNative();
	}
    }
});
