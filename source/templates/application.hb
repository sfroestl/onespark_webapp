<h1>One Spark Test App</h1>
{{ sessionStatus }}
{{#if needsLogin}}
<p>You must be logged in to view this page.</p>
<p>Testlogin:bob/testbob</p>
<label>Username: </label>{{view Ember.TextField placeholder="your username"  valueBinding="usernameNew"}}<br />
<label>Password: </label>{{view Ember.TextField placeholder="your password" valueBinding="passwordNew" type="password"}}<br />
<button {{action login target="controller"}}>Login</button>
{{/if}}
{{#unless needsLogin}}
{{outlet navigation}}
{{outlet body}}
{{/unless}}
