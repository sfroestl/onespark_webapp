{{#if view.user.isAccepted}}
<button {{action goRemove view.record}}>remove</button>
{{/if}}
{{#if view.user.isPending}}
<button {{action goRemove view.record}}>cancel</button>
{{/if}}
{{#if view.user.isRequested}}
<button {{action goAccept view.record}}>accept</button>
{{/if}}
