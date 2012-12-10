{{#if signedIn }}
{{outlet account}}
<a {{action fadeAccount target="view"}} class="account-button">
    <img {{bindAttr src="App.session.sessionUser.displayAvatarUrl"}} alt="Profile">
</a>
<a class="account-tool" {{action goToUserProfile href=true}}>Settings</a>
<a class="account-tool" {{action goToUserContacts href=true}}>Contacts</a>
<a class="account-tool"{{action goToUserMessages href=true}}>Messages</a>
<a class="account-tool" {{action goLoggedOut}}>Logout</a>

{{/if}}
