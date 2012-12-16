<h1>Sign in</h1>

<label>Username: </label><br/>
{{view Ember.TextField valueBinding="username"}}<br/>

<label>Password: </label><br/>
{{view Ember.TextField valueBinding="password" type="password"}}<br/><br/>

<button {{action goLoggedIn}}>Login</button><a {{action goToRegister href=true}}>Register</a>



