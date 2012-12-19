App.RegisterView = Ember.View.extend({
  tagName: "form",
  templateName: 'register',
  classNames:['register-form'],
  userBinding: 'App.User',

  	didInsertElement: function(){
	    var jVal = {
        'username' : function() {
            var ele = $('#username');
            if(ele.val().length != 0) { 
	            if(ele.val().length < 3) {
	                jVal.errors = true;
	                App.FlashMessage.create({text:"Username too short."});
	                //$('#username').addClass("error");  
	            } else {
	            	//$('#username').addClass("success");
	            }
	        }
        },
        
        'email' : function() {
            var patt = /^.+@.+[.].{2,}$/i;
            var ele = $('#email'); 
            if(ele.val().length != 0) {
	            if(!patt.test(ele.val())) {
	                jVal.errors = true;
	                App.FlashMessage.create({text:"Invalid Email address."});
	                //$('#username').addClass("error");  
	            } else {
	            	//$('#username').addClass("success");
	            }
	        }
        },

        'pwLength' : function() {
            var ele1 = $('#password'); 
            var ele2 = $('#password-conf'); 
            if((ele1.val().length < 6 && ele1.val().length != 0) || (ele2.val().length < 6 && ele2.val().length != 0)) {
                jVal.errors = true;
                App.FlashMessage.create({text:"Password too short."});
                //$('#username').addClass("error");  
            } else {
            	//$('#username').addClass("success");
            }
        },

        'pwMatch' : function() {
            var ele1 = $('#password'); 
            var ele2 = $('#password-conf'); 
            if(ele1.val().length != 0 && ele2.val().length != 0) {
	            if(ele1.val() != ele2.val()) {
	                jVal.errors = true;
	                App.FlashMessage.create({text:"Your passwords don't match."});
	                //$('#username').addClass("error");  
	            } else {
	            	//$('#username').addClass("success");
	            }
        	}
        }
    };


	    // bind jVal.x function to X form field
	    $('#username').change(jVal.username);
	    $('#email').change(jVal.email);
	    $('#password').change(jVal.pwLength);
	    $('#password-conf').change(jVal.pwLength);
	    $('#password').change(jVal.pwMatch);
	    $('#password-conf').change(jVal.pwMatch);
    }
});