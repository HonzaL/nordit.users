
var Counter = require(process.cwd() + '/app/models/counter');

exports.index = function(req, res, next) {
    try {
	var params = req.params;
	var query = req.query;
	Counter.index(query, req.gettext, function(err, report) {
	    if(err) return next(err);
	    res.format({
		json: function() {
		    res.json(report);
		},
		csv: function() {
		    res.send("ok;ok;ok");
		}
	    })


	});
    } catch(err) {
	console.log(err);
	res.send('404');
    }
};
