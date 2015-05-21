import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('composites', function() {
    this.route('new');
  });

  this.route('items', function() {
    this.route('new');
  });

  this.route('products', function() {
    this.route('new');
  });

  this.route('unit-types', function() {
    this.route('new');
  });
});
