<h1 class="headline">Register</h1>

<fieldset>
<label for="username">Username: </label>
{{view Ember.TextField valueBinding="username" id="username"}}
</fieldset>

<fieldset>
<label for="email">Email</label>
{{view Ember.TextField valueBinding="email" id="email"}}
</fieldset>

<fieldset>
<label for="password">Password</label>
{{view Ember.TextField valueBinding="password" type="password" id="password"}}
</fieldset>
<fieldset>
<label for="password-conf">Password Confirmation</label>
{{view Ember.TextField valueBinding="password_confirmation" type="password" id="password-conf"}}
</fieldset>

<fieldset>
<button {{action goRegister}} id="send" class="btn-register">Register</button>
</fieldset>
<a {{action goToLogin href=true}}>Back to login</a>