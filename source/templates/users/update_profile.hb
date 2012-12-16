<h2>Update Profile:</h2>

<table border="0">
  <tr><td>Forename:</td><td>{{view Ember.TextField valueBinding="forename"}}</td></tr>
  <tr><td>Surname:</td><td>{{view Ember.TextField valueBinding="surname"}}</td></tr>
  <tr><td>City:</td><td>{{view Ember.TextField valueBinding="city"}}</td></tr>
  <tr><td>About:</td><td>{{view Ember.TextField valueBinding="about"}}</td></tr>
</table>

<button {{action goUpdate}}>Send</button>

<br /><br /><br />