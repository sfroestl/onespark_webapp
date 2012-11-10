<h1>Hello {{ sessionUser.username }}!</h1>
<button {{action goLoggedOut}}>Logout</button>
{{outlet navigation}}
{{outlet body}}
