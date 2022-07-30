import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.object.values.js";
import { CustomElement } from 'aurelia';
export var extractArgTypes = function extractArgTypes(component) {
  if (component) {
    var def = CustomElement.getDefinition(component);
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