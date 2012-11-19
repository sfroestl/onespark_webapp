<label>Username: </label>{{view Ember.TextField placeholder="your username"  valueBinding="App.router.loginFormController.username"}}<br/>

<label>Password: </label>{{view Ember.TextField placeholder="your password" valueBinding="App.router.loginFormController.password" type="password"}}<br />

<button {{action goLoggedIn}}>Login</button>

