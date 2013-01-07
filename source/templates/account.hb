{{#if signedIn }}
{{outlet account}}
<a {{action fadeAccount target="view"}} class="account-button">
    <img {{bindAttr src="App.session.sessionUser.displayAvatarUrl"}} alt="Profile">
</a>
<a class="account-tool" {{action goToUserProfile}}>Settings</a>
<a class="account-tool" {{action goToUserContacts}}>Contacts</a>
<a class="account-tool" {{action goToUserMessages}}>Messages</a>
<a class="account-tool" {{action goLoggedOut}}>Logout</a>

{{/if}}
