
var Summary = require(process.cwd() + '/app/models/summary');

exports.index = function(req, res, next) {
    try {
	var query = req.query;
	Summary.index(query, req.gettext, function(err, report) {
	    if(err) return next(err);
	    res.send(report);
	});
    } catch(err) {
	console.log(err);
	res.send('404');
    }
};
