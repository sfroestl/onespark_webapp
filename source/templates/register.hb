<h1>Register</h1>

<label>Username: </label><br/>
{{view Ember.TextField valueBinding="username"}}<br/>

<label>Email: </label><br/>
{{view Ember.TextField valueBinding="email"}}<br/>

<label>Password: </label><br/>
{{view Ember.TextField valueBinding="password" type="password"}}<br/>

<label>Password Confirmation: </label><br/>
{{view Ember.TextField valueBinding="password_confirmation" type="password"}}<br />
	
<button {{action goRegister}}>Register</button>
<a {{action goToLogin href=true}}>Back to login</a>