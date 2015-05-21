import Ember from 'ember';

export default Ember.Route.extend({
  model:function(){
    var composite = this.store.createRecord('composite', {name:'New Recipe'});
    var emptyStep = this.store.createRecord('item-step', {parent:composite});

    return composite;
  },

  action: function(){
    
  }
});
