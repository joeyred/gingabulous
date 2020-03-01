'use strict';

!function() {
const hasOwnProperty = Object.hasOwnProperty.call;

class Core {
  constructor(config = {}) {
    this.config = extend({}, Core.Defaults, config);
    this.modules = {};
    this.instances = {
      byId:   {},
      allIds: []
    };
  }

  addUtility(utility) {
    if (this.util[utility]) {
      this.util[utility];
    } else {
      const name = utility.name || utility.prototype.constructor.name;
      throw Error(`A utility of named ${name} already exists!`);
    }
  }

  addModule(module, name, dataAttrName) {
    name = name || module.name || module.prototype.constructor.name;
    // If no value for `dataAttrName` is passed,
    // then assign `name` to the value.
    dataAttrName = dataAttrName || hyphenate(name);
    // Add the module to the `modules` object.
    this.modules[name] = {
      name:           name,
      dataAttr:       `data-${dataAttrName}`,
      dataAttrTarget: `[data-${dataAttrName}]`
    };
    this[name] = module;
  }

  init(config = {}) {
    let nodes;
    for (let module in this.modules) {
      if (hasOwnProperty(this.modules, module)) {
        nodes = document.querySelectorAll(module.dataAttrTarget);
        for (let i = 0; i < nodes.length; i++) {
          let instance = new Gingabulous[name](
            nodes[i],
            config[name] || {},
            name,
            generateId()
          );
          instance.init();
        }
      }
    }
  }
}

Core.DEFAULTS = {
  /**
   * Values passed to Debug module config method
   * @type {Array}
   */
  debug:       [false, {}],
  /**
   * Default breakpoint object (in REMs)
   * @type {Object}
   */
  breakpoints: {
    sm:  0,
    md:  40,
    lg:  64,
    xl:  75,
    xxl: 90
  }
};

/**
 * Covert CamalCase to hyphenated string.
 * @method hyphenate
 *
 * Found here:
 * @link http://stackoverflow.com/a/8955580
 *
 * @param  {string}   string - String to parse and covert.
 * @return {string}          - hyphenated string.
 */
function hyphenate(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function extend(out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    let obj = arguments[i];

    if (!obj) {
      continue;
    }
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object') {
          out[key] = extend(out[key], obj[key]);
        } else {
          out[key] = obj[key];
        }
      }
    }
  }
  return out;
}

function generateId() {
  return Math.round((Math.pow(32, 7) - (Math.random() * Math.pow(32, 6)))).toString();
}

window.Gingabulous = function(config) {
  return new Core(config);
};
}();
