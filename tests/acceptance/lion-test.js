import Ember from 'ember';
import startApp from '../helpers/start-app';
import { stubRequest } from '../helpers/fake-server';
import { stubLionJSON, stubImageSetJSON, stubGetOrganizations,
         stubGetUser, stubGetSearchOptions } from '../helpers/fake-requests';

var application, oldConfirm;

module('Acceptance: Lion', {
  setup: function() {
    application = startApp();

    stubGetOrganizations();
    stubGetSearchOptions();
    stubRequest('get', '/lions/2', function(request){
      return this.success(stubLionJSON());
    });

    oldConfirm = window.confirm;
    window.confirm = function() {
      return true;
    };
  },
  teardown: function() {
    Ember.run(application, 'destroy');
    window.confirm = oldConfirm;
  }
});

test('visiting /lion/2 with no current user', function() {
  redirectsToLogin('/lion/2');
});

test('visiting /lion/2', function() {
  expect(12);

  signInAndVisit('/lion/2');

  andThen(function() {
    equal(currentPath(), 'lion.index');
    equal(currentURL(), '/lion/2');

    expectComponent('lg-lion-editor');
    expectElement('.lion-summary-list');
    expectElement('.view-image-set.disabled');
    expectElement('.select-instructions');
    expectNoElement('lion-summary-list .row.selectable-row.active');
    click('.lion-summary-item .image-set-id:contains(24)');
  });

  andThen(function() {
    expectElement('.lion-summary-list .row.selectable-row.active');
    expectElement('.lg-image-set-summary');
    expectNoElement('.select-instructions');
    expectElement('.mini-image-gallery');

    click('.view-image-set');
  });

  andThen(function() {
    equal(currentURL(), '/image-set/24');
  });
});

test('visiting /lion/2 and removing image set', function() {
  expect(2);
  stubGetUser();
  signInAndVisit('/lion/2');

  andThen(function() {
    click('.lion-summary-item .image-set-id:contains(24)');
  });

  andThen(function() {
    expectElement('.mini-image-gallery .row.selectable-row.active');

    stubRequest('put', '/imageSets/24', function(request){
      ok(true, 'put api called');
      return this.success(stubImageSetJSON());
    });

    click('.remove-image-set');
  });
});
