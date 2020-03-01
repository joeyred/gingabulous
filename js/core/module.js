'use strict';

class UIModule {
  constructor(element, options, name, id) {
    this.element = element;
    this.options = Gingabulous.util.extend(
      {},
      Gingabulous[name].DEFAULTS,
      options
    );
    this.id = id;
  }
  get attr() {
    const {dataAttr} = this.options;
    return Gingabulous.util.extend({}, this._attr(), {
      module: dataAttr,
    });
  }
  eventMatches() {}
  init() {}
}

UIModule.DEFAULTS = {};
