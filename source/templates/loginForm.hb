<label>Username: </label>{{view Ember.TextField placeholder="your username"  valueBinding="username"}}<br/>

<label>Password: </label>{{view Ember.TextField placeholder="your password" valueBinding="password" type="password"}}<br />

<button {{action goLoggedIn}}>Login</button>

