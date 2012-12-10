{{#each message in App.flashMessages }}
  <li {{bindAttr class="message.type"}}>
    {{message.text}} 
    {{#if message.buttonText}}
      <button {{action "buttonAction" on="click" target="message"}}>{{message.buttonText}}</button>
    {{/if}}
  </li>
{{/each}}
