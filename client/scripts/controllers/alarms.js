
NU.AlarmsController = NU.BaseController.extend({
    queryParams: ['plc', 'page', 'size'],
    plc: 1,
    page: null,
    size: 5,
    contract: null,
    alarms: null,
    startAlarm: null,
    endAlarm: null,
    init: function() {
	this.reloadAlarmsNative(0);
    },
    reloadAlarmsNative: function(diff) {
	var _self = this
	var newPage = diff == 0 ? 1 : (this.page || 1) + diff;
	this.set('page', newPage < 1 ? 1 : newPage);
	var url = '/' + this.get('application').lang + "/nc/" + this.contract + "/api/v1/alarm/?plc=" + this.plc + "&page=" + this.page + "&size=" + this.size
	Em.$.get(url).then(function(response) {
	    _self.set('alarms', $.parseJSON(response));
	    _self.set('startAlarm', _self.page * _self.size + 1 - _self.size);
	    _self.set('endAlarm', _self.page * _self.size - _self.size + _self.alarms.data.length);

	    for (var i in _self.alarms.data) {
		var row = _self.alarms.data[i];
		var pktime = new Pktime();
		pktime.setValue(row.origin_pktime);
		var d = pktime.getDate();
		row.origin_pktime = formatDate(d);
		if (!row.expiry_pktime) {row.expiry_pktime = '-'; continue;}
		pktime.setValue(row.expiry_pktime);
		var d = pktime.getDate();
		row.expiry_pktime = formatDate(d);
	    }
	});
    },
    actions: {
	reloadAlarms: function(diff) { this.reloadAlarmsNative(diff); }
    }
});

function formatDate(date) {
  return date.getDate().toString() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear() + " " + addLeadingZero(date.getHours()) + ":" + addLeadingZero(date.getMinutes()) + ":" + addLeadingZero(date.getSeconds());
}
function addLeadingZero(val) {
    return val < 10 ? "0" + val : val; 
}
