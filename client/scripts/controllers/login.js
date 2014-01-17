
NU.LoginController = NU.BaseController.extend({
    username: '',
    password: '',
    errorMessage: '',
    attemptedTransition: '',
    reset: function() {
	this.setProperties({
	    username: "",
	    password: "",
	    errorMessage: ""
	});
    },
    actions: {
	login: function() {
	    var _self = this, data = this.getProperties('username', 'password');
	    // Clear out any error messages.
	    this.set('errorMessage', null);

	    Em.$.post('/api/v1/auth/login', data).then(function(response) {
		_self.set('errorMessage', response.message);
		if(response.success) {
//		    localStorage.token = response.token;
		    _self.set('application.token', response.token);
		    _self.set('application.user', response.username);
		    
		    var attemptedTransition = _self.get('attemptedTransition');
        	    if (attemptedTransition) {
	          	attemptedTransition.retry();
          		_self.set('attemptedTransition', null);
       		    } else {
          		// Redirect to 'about' by default.
          		_self.transitionToRoute('about', NU.Application.lang);
        	    }
		}
	    }).fail(function(res) { 
		_self.set('errorMessage', "Wrong username/password combination.");
	    });
	}
    }
})
