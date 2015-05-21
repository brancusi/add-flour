import DS from 'ember-data';

export default DS.Model.extend({
  parent: DS.belongsTo('composite', {inverse: 'children', polymorphic: true}),
  child: DS.belongsTo('item', {inverse: 'parents', polymorphic: true}),
  measure: DS.belongsTo('measure', {inverse: 'itemSteps'}),
  rawText: DS.attr('string'),
  quantity: DS.attr('number'),

  weight: function(){
    return this.get('child').factorFor(this.get('unitType')) * this.get('quantity');
  }.property('quantity')
});