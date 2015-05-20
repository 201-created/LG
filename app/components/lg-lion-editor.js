import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,
  organizations: null,
  lion: null,

  isSaving: false,
  selectedName: Ember.computed.reads('lion.name'),
  selectedOrganization: Ember.computed.reads('lion.organization'),

  imageSet: Ember.computed.reads('lion.primaryImageSet'),

  // for map marker
  selectedLatitude: Ember.computed.reads('imageSet.latitude'),
  selectedLongitude: Ember.computed.reads('imageSet.longitude'),

  mapMarker: function() {
    var imageSet = this.get('imageSet');
    if (imageSet) {
      return Ember.Object.create({
        isDraggable: false,
        hasInfoWindow: false,
        lat: imageSet.get('latitude'),
        lng: imageSet.get('longitude')
      });
    } else {
      return null;
    }
  }.property('imageSet.latitude', 'imageSet.longitude'),

  resetValues: function() {
    var lion = this.get('lion');
    this.setProperties({
      selectedName: lion.get('name'),
      selectedOrganization: lion.get('organization')
    });
  },

  updateValues: function() {
    var lion = this.get('lion');

    lion.setProperties({
      name: this.get('selectedName'),
      organization: this.get('selectedOrganization')
    });
  },

  finishEditing: function() {
    this.set('isSaving', true);
    this.updateValues();
    var lion = this.get('lion'),
        component = this;

    lion.save().then(function() {
      component.setProperties({
        isEditing: false,
        isSaving: false
      });
    });
  },

  actions: {
    startEditing: function() {
      this.set('isEditing', true);
    },

    cancelEditing: function() {
      this.resetValues();
      this.set('isEditing', false);
    },

    finishEditing: function() {
      var organization = this.get('lion.organization'),
          selectedOrganization = this.get('selectedOrganization');

      if (selectedOrganization !== organization) {
        var message = 'You are about to change ownership of this organization from ' +
              organization.get('name') + ' to ' + selectedOrganization.get('name') +
              '. After changing, you will no longer have access to edit this lion. Are you sure?';

        if(confirm(message)) {
          // automatically set is Verified to false when changing organization
          this.set('selectedIsVerified', false);
          this.finishEditing();
        }
      } else {
        this.finishEditing();
      }
    }
  }
});