import DS from 'ember-data';

export default DS.Model.extend({
  
  name: DS.attr('string'),

  regexpPattern: DS.attr('string'),

  unitTypeQuantities: DS.hasMany('unit-type-quantity'),

  itemSteps: DS.hasMany('item-step', {inverse: 'unitType'}),

  text: Ember.computed.alias('name'),

  regexp: function(){
    var part1 = '(\d+[\/\.]?\d*[\s]*(?:';
    var part2 = '))';
    return new RegExp(part1 + this.get('regexpPattern') + part2 );
  }.property('regexpPattern'),

  isFactorable: function(){
    var type = this.get('type');
    return (type && (type !== 'nonstandard'));
  }.property('type'),

  isValid: function(){
    var valid = true;
    if(!this.get('type')){
      valid = false;
    }

    if(this.get('isFactorable') && isNaN(this.get('factor'))){
      valid = false;
    }

    if(!this.get('name')){
      valid = false;
    }

    return valid;
  }.property('type', 'name', 'factor'),

  isNotValid: Ember.computed.not('isValid'),

  match: function(query){
    return this.get('regexp').test(query);
  },

  actions: {
    save:function(){
      this.get('model').save();
    }
  }
});