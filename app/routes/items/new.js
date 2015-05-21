import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    var newConversion = this.store.createRecord('unit-type-quantity');
    return this.store.createRecord('item', {conversion:newConversion});
  }
});