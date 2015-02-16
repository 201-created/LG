import Ember from 'ember';
import {genders} from 'lion-guardians/utils/units';
import ImageSetMarker from 'lion-guardians/models/image-set-marker';

export default Ember.Component.extend({
  genders: genders,
  isEditing: false,
  editingEnabled: false,
  imageSet: null,
  organizations: null,

  selectedDob: Ember.computed.reads('imageSet.dateOfBirth'),
  selectedLatitude: Ember.computed.reads('imageSet.latitude'),
  selectedLongitude: Ember.computed.reads('imageSet.longitude'),
  selectedOrganization: Ember.computed.reads('imageSet.organization'),
  selectedGender: Ember.computed.reads('imageSet.gender'),
  selectedIsVerified: Ember.computed.reads('imageSet.isVerified'),

  mapMarker: function() {
    return ImageSetMarker.create({
      component: this
    });
  }.property(),

  resetValues: function() {
    var imageSet = this.get('imageSet');

    this.setProperties({
      selectedDob: imageSet.get('dateOfBirth'),
      selectedLatitude: imageSet.get('latitude'),
      selectedLongitude: imageSet.get('longitude'),
      selectedOrganization: imageSet.get('organization'),
      selectedGender: imageSet.get('gender'),
      selectedIsVerified: imageSet.get('isVerified')
    });
  },

  updateValues: function() {
    var imageSet = this.get('imageSet');

    imageSet.setProperties({
      dateOfBirth: this.get('selectedDob'),
      latitude: this.get('selectedLatitude'),
      longitude: this.get('selectedLongitude'),
      organization: this.get('selectedOrganization'),
      gender: this.get('selectedGender'),
      isVerified: this.get('selectedIsVerified')
    });
  },

  finishEditing: function() {
    this.set('isSavingImageSet', true);
    this.updateValues();

    var imageSet = this.get('imageSet'),
        component = this;
    if (imageSet.get('id')) {
      imageSet.save().then(function() {
        component.setProperties({
          isEditing: false,
          isSavingImageSet: false
        });
      });
    } else {
      this.setProperties({
        isEditing: false,
        isSavingImageSet: false
      });
    }
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
      var organization = this.get('imageSet.organization'),
          selectedOrganization = this.get('selectedOrganization');

      if (selectedOrganization !== organization) {
        var message = 'You are about to change ownership of this organization from ' +
              organization.get('name') + ' to ' + selectedOrganization.get('name') +
              '. After changing, you will no longer have access to edit this image set. Are you sure?';

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
