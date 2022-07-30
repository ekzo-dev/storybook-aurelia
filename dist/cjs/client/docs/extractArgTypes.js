"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractArgTypes = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.object.values.js");

var _aurelia = require("aurelia");

var extractArgTypes = function extractArgTypes(component) {
  if (component) {
    var def = _aurelia.CustomElement.getDefinition(component);

    return Object.values(def.bindables).reduce(function (acc, bindable) {
      acc[bindable.attribute] = {
        name: bindable.attribute,
        description: bindable.property,
        control: {
          type: 'text'
        }
      };
      return acc;
    }, {});
  }

  return null;
};

exports.extractArgTypes = extractArgTypes;