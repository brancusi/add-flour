import DS from 'ember-data';
import Composite from './composite';

export default Composite.extend({
  
  price: DS.attr('number'),
  sku: DS.attr('string')

});
