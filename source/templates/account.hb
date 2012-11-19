{{#if signedIn }}
<hr/>
<table>
<tr>

<td>UserPic</td>
<td>{{ sessionUser.username }}</td>
<td>##</td>
<td>ProfileLink</td>
<td>ContactsLink</td>
<td>MessagesLink</td>
<button {{action goLoggedOut}}>Logout</button>
</tr>
</table>
{{/if}}
