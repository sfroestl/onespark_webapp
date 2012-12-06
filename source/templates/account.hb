{{#if signedIn }}
<table>
    <tr>
        <td class="account-button">
            <a {{action clickMeToToggleDetail target="controller"}} class="account-image">
                <img {{bindAttr src="App.session.sessionUser.displayAvatarUrl"}} alt="Profile">
            </a>
        </td>
    {{#if isDetailViewable}}
        {{#view App.FadeInView contentBinding="this"}}
        <td class="account-tool">
			<a {{action goToProfile href=true}}>Settings</a>
        </td>
        <td class="account-tool">
			<a>Contacts</a>
        </td>
        <td class="account-tool">
			<a>Messages</a>
		</td>
        <td class="account-tool">	
            <a {{action goLoggedOut}}>Logout</a>
        </td>
        {{/view}}
    {{/if}}
    </tr>
</table>
{{/if}}
