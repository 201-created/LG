import DS from 'ember-data';
import {defaultLocation} from 'lion-guardians/utils/units';

export default DS.Model.extend({
  mainImage: DS.belongsTo('image'),
  age: DS.attr('string'),
  latitude: DS.attr('number', {defaultValue: defaultLocation.latitude}),
  longitude: DS.attr('number', {defaultValue: defaultLocation.longitude}),
  gender: DS.attr('string'),
  isVerified: DS.attr('boolean'),
  hasCvResults: DS.attr('boolean'),
  images: DS.hasMany('images'),
  user: DS.belongsTo('user', {async: true}),
  lion: DS.belongsTo('lion', {inverse: 'imageSets'}),
  uploadingOrganization: DS.belongsTo('organization'),
  cvResults: DS.hasMany('cv-results', {async: true}),
  cvRequest: DS.belongsTo('cv-request', {async: true}),

  addImage: function(url, isPublic, imageType) {
    var image = this.store.createRecord('image', {
      url: url,
      isPublic: isPublic,
      imageType: imageType
    });

    this.get('images').pushObject(image);
  }
});
