{{#if signedIn }}
<hr/>
<table>
	<tr>
    	<td><a {{action clickMeToToggleDetail target="controller"}}><img {{bindAttr src="App.session.sessionUser.displayAvatarUrl"}} alt="Profile"></a></td>


    {{#if isDetailViewable}}
        {{#view App.FadeInView contentBinding="this"}}
			<td><a {{action goToProfile href=true}}>User Profile</a></td>
			<td>ContactsLink</td>
			<td>MessagesLink</td>
			<td><button {{action goLoggedOut}}>Logout</button></td>
        {{/view}}
    {{/if}}
    </tr>
</table>
{{/if}}
