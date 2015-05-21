import Ember from 'ember';

export default Ember.Route.extend({

  model:function(){
    return Ember.RSVP.all([
      this.store.find('item'),
      this.store.find('composite'),
      this.store.find('product'),
      this.store.find('unit-type'),
      this.store.find('unit-type-quantity'),
      this.store.find('item-step')
    ]);
  }

});
