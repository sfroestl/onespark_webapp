App.Task = DS.Model.extend({
    dueDate: DS.attr('date'),
    title: DS.attr('string'),
    desc: DS.attr('string'),
    project: DS.belongsTo('App.Project'),
    completed: DS.attr('boolean'),
    completedAt: DS.attr('date'),
    completedBy: DS.belongsTo('App.User'), //User-Model müsste noch completed-projects enthalten, oder? hasMany
                                             // server-seitig?
    estimatedHours: DS.attr('number'),
    workedHours: DS.attr('number'),
    // comments: DS.hasMany('App.Comment');
    creator: DS.belongsTo('App.User'),
    worker: DS.belongsTo('App.User'),    
});

DS.AuthenticatedRESTAdapter.map('App.Task', {
    dueDate: { key: 'due_date'},
    project: { key: 'project_id'},
    estimatedHours: { key: 'estimated_hours'},
    workedHours: { key: 'worked_hours'},
    // comments: {key: 'comment_ids'}
    creator: { key: 'creator_id'},
    worker: { key: 'worker_id'},
    completedBy: { key: 'completed_by'},
});
