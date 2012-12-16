<h2>My Profile:</h2>

<table border="0">
	  <tr><td><img {{bindAttr src="user.displayAvatarUrl"}} alt="Profile"></td></tr>
	  <tr><td>Username:</td><td>{{user.username}}</td></tr>
	  <tr><td>Email:</td><td>{{user.email}}</td></tr>

	  <tr><td>Forename:</td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.forename"}}</td></tr>
	  <tr><td>Surname:</td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.surname"}}</td></tr>
	  <tr><td>City:</td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.city"}}</td>
	  <tr><td>About:</td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.about"}}</td></tr>
</table>

{{#unless isDisabled}}
	<button {{action goUpdate}}>Send</button>
{{/unless}}
<br />

<a href="#"{{action edit target="controller"}}>edit</a> 
<a href="#"{{action goToDeleteMe target="controller"}}>delete account</a>

{{#if isDeleteAccount}}   
   	{{#view App.DeleteAccountView}}   
		<h2>Delete Account:</h2>

		<p>Password Confirmation:</p>
		<p>{{view Ember.TextField valueBinding="password_conf" type="password"}}</p>

		<button {{action goDelete}}>Send</button>

		<br /><br /><br />
    {{/view}}   
{{/if}}
