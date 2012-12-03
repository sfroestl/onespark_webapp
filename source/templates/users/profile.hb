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

{{#if App.router.userController.isSuccess}}
<span class="success">{{App.router.userController.success_msg}}</span><br />
{{/if}}<br/>

<a {{action goToUpdateProfile href=true}}>edit profile</a>
<a {{action goToDeleteMe href=true}}>delete account</a>