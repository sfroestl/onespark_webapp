{{#if view.record.isAccepted}}
<button {{action goRemove view.record}}>remove</button>
<button {{action goToContactsProfile view.record}}>profile</button>
{{/if}}
{{#if view.record.isPending}}
<button {{action goRemove view.record}}>cancel</button>
{{/if}}
{{#if view.record.isRequested}}
<button {{action goAccept view.record}}>accept</button>
<button {{action goRemove view.record}}>deny</button>
{{/if}}
