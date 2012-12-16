<h1 class="headline">Sign in</h1>

<fieldset>
	<label for="username">Username</label>
	{{view Ember.TextField valueBinding="username" id="username"}}
</fieldset>

<fieldset>
	<label for="password">Password</label>
	{{view Ember.TextField valueBinding="password" type="password" id="password"}}
</fieldset>

<fieldset>
	<button {{action goLoggedIn}} class="btn-login">Login</button>
</fieldset>
<a {{action goToRegister href=true}}>Register</a>



