import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    handleSave: function(){
      this.sendAction('action', this.get('model'));
    }
  }
});