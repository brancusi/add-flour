import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  price: DS.attr('number'),
  item: DS.belongsTo('item')
});
