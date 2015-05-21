import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('item', {
  // Specify the other units that are required for this test.
  needs: ['model:child', 'model:parent', 'model:tag']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
