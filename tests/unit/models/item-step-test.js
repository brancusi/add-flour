import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('item-step', {
  // Specify the other units that are required for this test.
  needs: ['model:parent', 'model:child']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
