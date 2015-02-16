import Ember from 'ember';
import {searchGenders} from 'lion-guardians/utils/units';

export default Ember.Component.extend({
  store: null,
  genders: searchGenders,
  selectedGender: searchGenders[0],
  defaultGender: Ember.computed.alias('genders.firstObject'),

  selectedSearchDateStart: null,
  selectedSearchDateEnd: null,

  organizations: null,
  selectedOrganization: null,
  selectedName: null,
  action: null,
  searchModel: 'lion',

  defaultOrganization: function(){
    return Ember.Object.create({
      name: 'all',
      id: -1
    });
  }.property(),

  searchOrganizations: function() {
    var organizations = this.get('organizations'),
        defaultOrganization = this.get('defaultOrganization');

    if (!organizations) {
      return [];
    }

    var searchOptions = Ember.A([defaultOrganization]);
    organizations.forEach(function(org) {
      searchOptions.pushObject(org);
    });

    return searchOptions;
  }.property('organizations', 'defaultOrganization'),

  params: function(){
    var params = {},
        selectedGender = this.get('selectedGender'),
        defaultGender = this.get('defaultGender'),
        selectedOrganizationId = this.get('selectedOrganization.id'),
        selectedName = this.get('selectedName'),
        selectedSearchDateStart = this.get('selectedSearchDateStart'),
        selectedSearchDateEnd = this.get('selectedSearchDateEnd');

    if (selectedGender !== defaultGender){
      params['gender'] = selectedGender;
    }

    if (selectedOrganizationId && selectedOrganizationId !== -1) {
      params['organization_id'] = selectedOrganizationId;
    }

    if (selectedName && !Ember.isBlank(selectedName)) {
      params['name'] = selectedName;
    }

    if (selectedSearchDateStart && selectedSearchDateEnd) {
      params['dob_range_start'] = selectedSearchDateStart;
      params['dob_range_end'] = selectedSearchDateEnd;
    }

    return params;
  }.property('selectedGender', 'defaultGender', 'selectedOrganization',
             'selectedName', 'selectedSearchDateEnd', 'selectedSearchDateStart'),

  actions: {
    search: function() {
      var params = this.get('params'),
          store = this.get('store'),
          component = this,
          searchModel = this.get('searchModel');

      store.find(searchModel, params).then(function(results){
        component.sendAction('action', results);
      }, function() {
        alert("There was an error searching.");
      });
    }
  }
});
