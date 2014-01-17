
NU.UserController = Ember.Controller.extend({
    reset: function() {
	this.setProperties({
	    username: "",
	    password: "",
	    email: "",
	    errorMessage: ""
	});
    },
  actions: {
    create: function() {
      	var _self = this, data = this.getProperties('username', 'password', 'email');
	
	// Clear out any error messages.
	this.set('errorMessage', null);

	Em.$.post('/api/v1/users', data).then(function(response, neco, nic) {
//	  _self.set('errorMessage', response.message);
	  console.log(response, neco, nic);
	  
	});
    }
  }

});

NU.UserNewController = NU.UserController.extend({});
