import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.values.js";
import { getComponentAstData, getBindableType } from './metadata';
import { getComponentDefinition } from '../helpers';

var shouldEncode = function shouldEncode(obj) {
  return (obj === null || obj === void 0 ? void 0 : obj.toString()) === '[object Object]' || Array.isArray(obj);
};

export var extractArgTypes = function extractArgTypes(component) {
  if (!component) return null;
  var def = getComponentDefinition(component);
  var astData = getComponentAstData(component.prototype, Object.keys(def.bindables));
  return Object.values(def.bindables).reduce(function (acc, bindable) {
    // get all available metadata
    var type = getBindableType(component, bindable);
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