"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  extractArgTypes: true,
  createComponentTemplate: true,
  getComponentDefinition: true
};
Object.defineProperty(exports, "createComponentTemplate", {
  enumerable: true,
  get: function get() {
    return _helpers.createComponentTemplate;
  }
});
Object.defineProperty(exports, "extractArgTypes", {
  enumerable: true,
  get: function get() {
    return _extractArgTypes.extractArgTypes;
  }
});
Object.defineProperty(exports, "getComponentDefinition", {
  enumerable: true,
  get: function get() {
    return _helpers.getComponentDefinition;
  }
});

var _preview = require("./preview");

Object.keys(_preview).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _preview[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _preview[key];
    }
  });
});

var _extractArgTypes = require("./docs/extractArgTypes");

var _helpers = require("./helpers");

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}