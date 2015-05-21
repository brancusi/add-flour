export function initialize( container, application ) {
  application.inject('service:ace', 'store', 'store:main');
  application.inject('component:item-step', 'store', 'store:main');
}

export default {
  name: 'ace',
  initialize: initialize
};