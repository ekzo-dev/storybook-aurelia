import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.array.map.js";
import { getComponentBindables, getComponentAstData, getPropertyType, getTypeFromValue } from './metadata';

var shouldEncode = function shouldEncode(obj) {
  return obj.toString() === '[object Object]' || Array.isArray(obj);
};

export var extractArgTypes = function extractArgTypes(component) {
  if (component) {
    var bindables = getComponentBindables(component);
    var astData = getComponentAstData(component, bindables.map(function (bindable) {
      return bindable.property;
    }));
    return bindables.reduce(function (acc, bindable) {
      // get all available metadata
      var tsType = getPropertyType(component, bindable.property);
      var propAstData = astData[bindable.property] || {}; // get default value

      var defaultValue = propAstData.defaultValue; // determine data type

      var type = tsType;

      if (type === 'object' && defaultValue !== undefined) {
        type = getTypeFromValue(defaultValue);
      } // determine appropriate control or action


      var control = type && type !== 'function' ? {
        type: type === 'string' ? 'text' : type
      } : undefined;
      var action = type === 'function' ? bindable.property : undefined;
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
        control: control,
        action: action
      };
      return acc;
    }, {});
  }

  return null;
};