<h1> Register here (in progress)</h1>


	
		<label>Username: </label>{{view Ember.TextField valueBinding="username"}}
		<br/>

		<label>Email: </label>{{view Ember.TextField valueBinding="email"}}
		<br/>

		<label>Password: </label>{{view Ember.TextField valueBinding="password" type="password"}}
		<br/>

		<label>Password Confirmation: </label>{{view Ember.TextField valueBinding="password_confirmation" type="password"}}
		<br />
	
	<button {{action goRegister}}>Register</button>

<br/>
<a {{action goToLogin href=true}}>Back to login</a>