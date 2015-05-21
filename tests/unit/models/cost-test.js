import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('cost', {
  // Specify the other units that are required for this test.
  needs: ['model:item']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
