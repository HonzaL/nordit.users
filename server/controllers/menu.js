
/**
 * Module Dependencies
 */

exports.get = function(req, res) {
    var menu = req.params[0];
    res.type('json').render('menu' + menu);
}
