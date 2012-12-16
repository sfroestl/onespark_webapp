<h2>My Profile:</h2>

<table border="0">
  <tr><td><img {{bindAttr src="user.displayAvatarUrl"}} alt="Profile"></td></tr>
  <tr><td>Username:</td><td>{{user.username}}</td></tr>
  <tr><td>Email:</td><td>{{user.email}}</td></tr>
  <tr><td>Forename:</td><td>{{user.profile.forename}}</td></tr>
  <tr><td>Surname:</td><td>{{user.profile.surname}}</td></tr>
  <tr><td>City:</td><td>{{user.profile.city}}</td></tr>
  <tr><td>About:</td><td>{{user.profile.about}}</td></tr>
</table>

<a {{action goToUpdateProfile href=true target="view"}}>edit profile</a>
<a {{action goToDeleteMe href=true target="view"}}>delete account</a>
    
    {{#if view.isUpdateProfile}}   
    	{{#view App.UpdateProfileView}}   
			<h2>Update Profile:</h2>

			<table border="0">
			  <tr><td>Forename:</td><td>{{view Ember.TextField valueBinding="user.profile.forename"}}</td></tr>
			  <tr><td>Surname:</td><td>{{view Ember.TextField valueBinding="user.profile.surname"}}</td></tr>
			  <tr><td>City:</td><td>{{view Ember.TextField valueBinding="user.profile.city"}}</td></tr>
			  <tr><td>About:</td><td>{{view Ember.TextField valueBinding="user.profile.about"}}</td></tr>
			</table>

			<button {{action goUpdate}}>Send</button>

			<br /><br /><br />
       	{{/view}}   
    {{/if}}

    {{#if view.isDeleteAccount}}   
    	{{#view App.DeleteAccountView}}   
			<h2>Delete Account:</h2>

			<p>Password Confirmation:</p>
			<p>{{view Ember.TextField valueBinding="password_conf" type="password"}}</p>

			<button {{action goDelete}}>Send</button>

			<br /><br /><br />
       	{{/view}}   
    {{/if}}
