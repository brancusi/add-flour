import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),
  description: DS.attr('string'),
  parents: DS.hasMany('item-step', {inverse: 'child'}),
  weightToVolumeRatio: DS.attr('number')

});
