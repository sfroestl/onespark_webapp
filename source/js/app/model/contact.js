App.Contact = DS.Model.extend({
  user: DS.belongsTo('App.User', {
    inverse: 'outContacts'
  }),
  contact: DS.belongsTo('App.User', {
    inverse: 'inContacts'
  }),
  status : DS.attr('string')
});

DS.AuthenticatedRESTAdapter.map('App.User', {
  contact: { key: 'contact_id' },
  user: { key: 'user_id' }
});