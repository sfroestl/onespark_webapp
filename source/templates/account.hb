{{#if signedIn }}
{{outlet account}}
<a {{action fadeAccount target="view"}} class="account-button">
    <img {{bindAttr src="App.session.sessionUser.displayAvatarUrl"}} alt="Profile">
</a>
<a class="account-tool" {{action goToUserProfile}} href="#">Settings</a>
<a class="account-tool" {{action goToUserContacts}} href="#">Contacts</a>
<a class="account-tool" {{action goToUserMessages}} href="#">Messages</a>
<a class="account-tool" {{action goLoggedOut}} href="#">Logout</a>

{{/if}}
