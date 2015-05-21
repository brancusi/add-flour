import Ember from 'ember';
import AceEditor from 'ace/ace';
import AceTokenizer from 'ace/tokenizer';

var Tokenizer = AceTokenizer.Tokenizer;

export default Ember.Service.extend({

  mergedItems: function(){
    var baseItems = this.get('store').all('item').content;
    var composites = this.get('store').all('composite').content;
    var products = this.get('store').all('product').content;

    var merged = _.union(baseItems, composites, products);

    return merged;
  }.property('store'),

  findMatch: function(query){
    var matches = this.get('mergedItems').filter(function(item){
      return item.get('name') === query;
    });

    if(matches){
      return matches[0].get('constructor.typeKey');
    }else{
      return 'error';
    }
  },

  findModelByName: function(name){
    return this.get('mergedItems').findBy('name', name);
  },

  tokenizer: function(){
    var sorted = _.sortBy(this.get('mergedItems'), function(item){
      return item.get('name').length;
    });

    var cleaned = sorted.map(function(item){
      return item.get('name');
    });

    var pattern = cleaned.reverse().join('|');
    console.log(pattern);

    var self = this;

    var rules = {
            'start' : [
                {
                    token: self.findMatch.bind(self),
                    regex: pattern,
                    caseInsensitive: true
                },
                {
                    token: 'quantity',
                    regex: /(\d+[\/\.]?\d*[\s]*(gram|kilo|ounce|pound|tsp|tbsp)\w*)/
                }
            ]
       };

    return new Tokenizer(rules);
    
  }.property('mergedItems.@each.name')

});
