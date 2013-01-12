{{#if isOwn}}  
	{{#if isDisabled}}  
		<table>
		  <tr><td><img {{bindAttr src="user.displayAvatarUrl"}} alt="Profile"></td></tr>
		  <tr><td>Username:</td><td>{{user.username}}</td></tr>
		  <tr><td>Email:</td><td>{{user.email}}</td></tr>
		  <tr><td>Forename:</td><td>{{user.profile.forename}}</td></tr>
		  <tr><td>Surname:</td><td>{{user.profile.surname}}</td></tr>
		  <tr><td>City:</td><td>{{user.profile.city}}</td></tr>
		  <tr><td>About:</td><td>{{user.profile.about}}</td></tr>
		</table>
		<br />
	{{#unless isDeleteAccount}}  
		<a href="#"{{action edit target="controller"}}>edit</a> 
		<a href="#"{{action goToDeleteMe target="controller"}}>delete account</a>
	{{/unless}}
{{else}}
    <table>
	  	<tr><td><img {{bindAttr src="user.displayAvatarUrl"}} alt="Profile"></td></tr>
	  	<tr><td>Username:</td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.username"}}</td></tr>
	  	<tr><td>Email:</td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.email"}}</td></tr>

	  	<tr><td>Forename:</td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.forename"}}</td></tr>
	  	<tr><td>Surname:</td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.surname"}}</td></tr>
	  	<tr><td>City:</td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.city"}}</td>
	  	<tr><td>About:</td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.about"}}</td></tr>
	</table>
	<button {{action goUpdate}} class="btn-submit">Send</button>
	<button {{action edit target="controller"}} class="btn-cancel">Cancel</button>
{{/if}}

{{#if isDeleteAccount}}   
   	{{#view App.DeleteAccountView}}   
		<h2>Delete Account:</h2>

		<p>Password Confirmation:</p>
		<p>{{view Ember.TextField valueBinding="password_conf" type="password"}}</p>

		<button {{action goDelete}}>Send</button>
		<button {{action goToDeleteMe target="controller"}} class="btn-cancel">Cancel</button>
    {{/view}}   
{{/if}}
{{/if}}
{{#unless isOwn}}
	<table>
	  	<tr><td><img {{bindAttr src="user.displayAvatarUrl"}} alt="Profile"></td></tr>
	  	<tr><td>Username:</td><td>{{user.username}}</td></tr>
	  	<tr><td>Email:</td><td>{{user.email}}</td></tr>
	  	<tr><td>Forename:</td><td>{{user.profile.forename}}</td></tr>
	  	<tr><td>Surname:</td><td>{{user.profile.surname}}</td></tr>
	  	<tr><td>City:</td><td>{{user.profile.city}}</td></tr>
	  	<tr><td>About:</td><td>{{user.profile.about}}</td></tr>
	</table>
{{/unless}}
