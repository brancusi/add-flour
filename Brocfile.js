/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var app = new EmberApp();

app.import('bower_components/ace/src/ace.js');
app.import('bower_components/rxjs/dist/rx.all.min.js');
app.import('bower_components/lodash/lodash.js');

module.exports = app.toTree();