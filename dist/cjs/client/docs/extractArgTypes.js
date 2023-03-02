"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractArgTypes = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.values.js");

var _metadata = require("./metadata");

var _helpers = require("../helpers");

var shouldEncode = function shouldEncode(obj) {
  return (obj === null || obj === void 0 ? void 0 : obj.toString()) === '[object Object]' || Array.isArray(obj);
};

var extractArgTypes = function extractArgTypes(component) {
  if (!component) return null;
  var def = (0, _helpers.getComponentDefinition)(component);
  var astData = (0, _metadata.getComponentAstData)(component, Object.keys(def.bindables));
  return Object.values(def.bindables).reduce(function (acc, bindable) {
    // get all available metadata
    var type = (0, _metadata.getBindableType)(component, bindable);
    var propAstData = astData[bindable.property] || {}; // get default value

    var defaultValue = propAstData.defaultValue; // determine appropriate control or action

    var control = type && type !== 'function' ? {
      type: type === 'string' ? 'text' : type
    } : undefined;
    acc[bindable.property] = {
      name: bindable.attribute,
      defaultValue: defaultValue,
      table: {
        type: type ? {
          summary: type
        } : undefined,
        defaultValue: defaultValue !== undefined ? {
          summary: shouldEncode(defaultValue) ? JSON.stringify(defaultValue) : defaultValue
        } : undefined
      },
      control: control
    };
    return acc;
  }, {});
};

exports.extractArgTypes = extractArgTypes;