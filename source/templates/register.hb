<h1> Register here (in progress)</h1>

<label>Username: </label>{{view Ember.TextField placeholder="your username"  valueBinding="username"}}<br/>

<label>Email: </label>{{view Ember.TextField placeholder="your email"  valueBinding="email"}}<br/>

<label>Password: </label>{{view Ember.TextField placeholder="your password" valueBinding="password" type="password"}}<br />

<label>Repeat Password: </label>{{view Ember.TextField placeholder="your password" valueBinding="password" type="password"}}<br />

<button {{action goRegister}}>Register</button>

<a {{action goToLogin href=true}}>Back to login</a>