<div>
<span><a {{!action showProject href=true}}>{{title}}</a></span><br/>
{{! eigenes outtlet/template/state... anlegen, zum zurückkehren}}

<span><a {{action goToProjectOverview href=true}}>overview</a></span><br/>
<span><a {{action goToProjectTasks href=true}}>tasks</a></span><br/>
<span><a {{action goToProjectPostings href=true}}>postings</a></span><br/>
<span><a {{action goToProjectFiles href=true}}>files</a></span><br/>
<span><a {{action goToProjectContributors href=true}}>contributors</a></span><br/>
<span><a {{action goToProjectEdit href=true}}>edit</a></span><br/>
<span><a {{action goToProjectTrash href=true}}>trash</a></span><br/>
<div>
{{!outlet ownedProjects}}
{{!outlet contribProjects}}
{{!outlet archivedProjects}}