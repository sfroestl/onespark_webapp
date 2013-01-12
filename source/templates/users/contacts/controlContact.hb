{{#if view.user.isAccepted}}
<button {{action goRemove view.user}}>remove</button>
{{/if}}
{{#if view.user.isPending}}
<button {{action goRemove view.user}}>cancel</button>
{{/if}}
{{#if view.user.isRequested}}
<button {{action goAccept view.user}}>accept</button>
{{/if}}