
/**
 * Shutdown script - nbims
 */

/**
 * Module Dependencies
 */


module.exports = function (config, callback) { 
    console.log(config.app.name + ' - shutdown');
    callback();
}
