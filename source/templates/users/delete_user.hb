<h2>Delete Account:</h2>

<p>Password Confirmation:</p>
<p>{{view Ember.TextField valueBinding="password_conf" type="password"}}</p>
{{#if App.router.userController.isError}}
<span class="error">Error: Invalid password.</span><br />
{{/if}}

<button {{action goDelete}}>Send</button>