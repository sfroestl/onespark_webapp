<div>
<span>title: {{title}}<span><br/>
<span>description: {{desc}}</span><br/>
<span>owner: {{owner.displayName}}</span><br/>
<span>due date: {{dueDate}}</span><br/>
contributors:
<ul class="contributors_list">
  {{#each contributors}}
  <li>{{this.displayName}}</li>
  {{/each}}
</ul>
</div>
