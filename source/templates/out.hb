<br />

<h1>Logged Out</h1>
<h2>Login with "bob/testbob"</h2>
{{ outlet login }}

{{#if App.router.outController.isError}}
<span class="error">Error: Invalid username or password.</span><br />
{{/if}}


<h2> ...or register a new Onespark-User</h2>
{{#with App.RegisterController.registerInformation}}
<label>Username: </label>{{view Ember.TextField valueBinding="username"}}<br />
<label>Email: </label>{{view Ember.TextField valueBinding="email"}}<br />
<label>Password: </label>{{view Ember.TextField valueBinding="password" type="password"}}<br />
<label>Password: </label>{{view Ember.TextField valueBinding="password_confirmation" type="password"}}<br />
{{#if App.loginController.isError}}
<span class="register-error">Error: User already exists.</span><br />
{{/if}}
<button {{bindAttr disabled="valid"}} {{action goRegister}}>Register</button>
{{/with}}
