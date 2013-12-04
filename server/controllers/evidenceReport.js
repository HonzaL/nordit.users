
/**
 * Module Dependencies
 */

var EvidenceReport = require(process.cwd() + '/app/models/evidenceReport');

exports.show = function(req, res, next) {
    try {
	var params = req.params;
	var query = req.query;

	EvidenceReport[req.params.evidence](params, query, req.gettext, function(err, report) {
	    if (err) return next(err);
	    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	    res.send(report);
	});
    } catch(err) {
	console.log(err);
	res.send('404');
    }
};
