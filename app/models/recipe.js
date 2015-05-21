import DS from 'ember-data';
import Item from './item';

export default Item.extend({
  children: DS.hasMany('item-step', {inverse: 'parent'}),
  yield: DS.attr('number'),

  items: function(){
    return this.get('children').map(function(itemStep){
      return itemStep.get('child');
    });
  }.property('children.@each.child')
  
});
