import Ember from 'ember';

import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('lg-mini-image-gallery', 'LgMiniImageGalleryComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  setup: function() {
    this.container.register('view:select', Ember.Select);
  }
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject({
    imageSet: Ember.Object.create({
      images: []
    })
  });
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});
