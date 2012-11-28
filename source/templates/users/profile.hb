<h2>My Profile:</h2>

<table border="0">
  <tr><td>Username:</td><td>{{user.username}}</td></tr>
  <tr><td>Email:</td><td>{{user.email}}</td></tr>
  <tr><td>Forename:</td><td>{{user.profile.forename}}</td></tr>
  <tr><td>Surname:</td><td>{{user.profile.surname}}</td></tr>
  <tr><td>City:</td><td>{{user.profile.city}}</td></tr>
  <tr><td>About:</td><td>{{user.profile.about}}</td></tr>
  <tr><td><img {{bindAttr src="profile_img"}} alt="Profile"></td></tr>
</table>

<a {{action goToUpdateProfile href=true}}>edit profile</a>
<a {{action goToDeleteMe href=true}}>delete account</a>