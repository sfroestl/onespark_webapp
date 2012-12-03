{{#each message in App.flashMessages }}
  <li {{bindAttr class="message.type"}}>
    {{message.text}} 
    {{#if message.removable}}
      <a {{action "hide" on="click" target="message"}}>[x]</a>
    {{/if}}
  </li>
{{/each}}
