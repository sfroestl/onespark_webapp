{{#if signedIn }}
<hr/>
<table>
<tr>

<td>UserPic</td>
<td>{{ sessionUser.username }}</td>
<td>##</td>
<td><a {{action goToProfile href=true}}>User Profile</a></td>
<td>ContactsLink</td>
<td>MessagesLink</td>
<button {{action goLoggedOut}}>Logout</button>
</tr>
</table>
{{/if}}
