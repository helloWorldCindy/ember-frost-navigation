import Ember from "ember";

export default {
  name: 'ember-frost-navigation',
  initialize(instance) {
    let navigationService = instance.lookup('service:frost-navigation');

    Ember.RouterDSL.prototype.nav = function (componentName, opts = {}) {
      let self = this
      return new Ember.RSVP.Promise(function (resolve, reject) {
        if (opts.navType !== 'category' && opts.navType !== 'app')
          Ember.assert(`opts.navType must be either 'category' or 'app'`)
        if (opts.type !== 'engine' && opts.type !== 'route')
          Ember.assert(`opts.type must be either 'engine' or 'route'`)
        self[opts.type === 'engine' ? 'mount' : 'route'](componentName, opts)
        let r =  {
          category() {
            return navigationService.registerCategory(opts.name || componentName, opts.columns || [])
          },
          app() {
            return navigation.registerApp(opts.name || componentName, opts.columnTitle, opts.icon, opts.name, opts.description, opts.path)
          }
        }[opts.navType]()
        r ? resolve(r) : reject(r)
      })
    };
  }
};
