{{#if view.record.isAccepted}}
<button {{action goRemove view.record}}>remove</button>
{{/if}}
{{#if view.record.isPending}}
<button {{action goRemove view.record}}>cancel</button>
{{/if}}
{{#if view.record.isRequested}}
<button {{action goAccept view.record}}>accept</button>
{{/if}}
