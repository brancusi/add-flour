import Ember from 'ember';

export default Ember.Controller.extend({
  unitTypes: function(){
    return this.get('store').all('unit-type');
  }.property('store'),

  actions: {
    saveUTQ: function(utq){
      var record = this.store.createRecord('unit-type-quantity', {parent:utq});
    },

    saveIngredient: function(){
      var children = this.get('model.conversion.children')
      children.forEach(function(child){
        child.save();
      });

      this.get('model').save();
    }
  }
});
