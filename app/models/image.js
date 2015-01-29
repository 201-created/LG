import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  isPublic: DS.attr('boolean'),
  imageType: DS.attr('string'),
  imageSet: DS.belongsTo('image-set', {inverse: 'images'})
});
