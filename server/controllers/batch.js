
var Batch = require(process.cwd() + '/app/models/batch');

exports.show = function(req, res, next) {
    try {
	var params = req.params;
	var query = req.query;
	Batch.show(params, query, function(err, batch) {
	    if(err) return next(err);
	    res.send(batch);
	});
    } catch(err) {
	console.log(err);
	res.send('404');
    }
};
