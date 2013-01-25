{{#if isOwn}}
<div class="own">  
	{{#if isDisabled}}  
	<header class="profile-head clearfix">
		<img {{bindAttr src="user.displayAvatarUrl"}} alt="Profile">
		<h1>Your profile, {{user.username}}.</h1>
	</header>
	<table class="profile-desc">
		  <tr><td class="label">Username: </td><td>{{user.username}}</td></tr>
		  <tr><td class="label">Email: </td><td>{{user.email}}</td></tr>
		  <tr><td class="label">Forename: </td><td>{{user.profile.forename}}</td></tr>
		  <tr><td class="label">Surname: </td><td>{{user.profile.surname}}</td></tr>
		  <tr><td class="label">City: </td><td>{{user.profile.city}}</td></tr>
		  <tr><td class="label">About: </td><td>{{user.profile.about}}</td></tr>
	</table>
	{{#unless isDeleteAccount}}
	<section class="profile-act clearfix">  
		<a href="#"{{action edit target="controller"}} class="edit-btn">edit</a> 
		<a href="#"{{action goToDeleteMe target="controller"}} class="delete-btn">delete account</a>
	</section>
	{{/unless}}
{{else}}
	<header class="profile-head clearfix">
		<img {{bindAttr src="user.displayAvatarUrl"}} alt="Profile">
		<h1>Edit Account</h1>
	</header>
	<table class="profile-desc">
	  	<tr><td class="label">Username: </td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.username"}}</td></tr>
	  	<tr><td class="label">Email: </td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.email"}}</td></tr>
	  	<tr><td class="label">Forename: </td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.forename"}}</td></tr>
	  	<tr><td class="label">Surname: </td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.surname"}}</td></tr>
	  	<tr><td class="label">City: </td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.city"}}</td></tr>
	  	<tr><td class="label">About: </td><td>{{view Ember.TextField disabledBinding="isDisabled" valueBinding="user.profile.about"}}</td></tr>
	</table>
	<section class="profile-act clearfix"> 
		<a {{action goUpdate}} class="edit-btn">Save Changes</a>
		<a {{action edit target="controller"}} class="btn-cancel">Cancel</a>
	</section>
{{/if}}

{{#if isDeleteAccount}}
<div class="delete">   
   	{{#view App.DeleteAccountView}}   
		<h2>Do you really want to delete your Account?</h2>

		<p>Password Confirmation:</p>
		<p>{{view Ember.TextField valueBinding="password_conf" type="password"}}</p>

		<button {{action goDelete}}>Delete Account</button>
		<button {{action goToDeleteMe target="controller"}} class="btn-cancel">Cancel</button>
    {{/view}}   
</div>
{{/if}}
</div>
{{/if}}
{{#unless isOwn}}
	<div class="contributor">
		<header>
			<img {{bindAttr src="user.displayAvatarUrl"}} alt="Profile" />
	  	</header>
	  	<section class="details">
	  		<ul>
	  			<li>Username: {{user.username}}</li>
	  			<li>Email: {{user.email}}</li>
	  			<li>Forename: {{user.profile.forename}}</li>
	  			<li>Surname: {{user.profile.surname}}</li>
	  			<li>City: {{user.profile.city}}</li>
	  			<li>About: {{user.profile.about}}</li>
			</ul>
		</section>
	</div>
{{/unless}}
