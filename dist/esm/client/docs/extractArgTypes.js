import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.values.js";
import { CustomElement } from 'aurelia'; // eslint-disable-next-line @typescript-eslint/no-namespace

var getType = function getType(component, property) {
  var metadata = Reflect.getMetadata('design:type', component.prototype, property);
  var type;

  switch (metadata) {
    case String:
      type = 'string';
      break;

    case Boolean:
      type = 'boolean';
      break;

    case Number:
      type = 'number';
      break;

    case Object:
      type = 'object';
      break;

    case Function:
      type = 'function';
      break;

    default:
  }

  return type;
};

export var extractArgTypes = function extractArgTypes(component) {
  if (component) {
    var def = CustomElement.getDefinition(component);
    return Object.values(def.bindables).reduce(function (acc, bindable) {
      var type = getType(component, bindable.property);
      var control = type && type !== 'function' ? {
        type: type === 'string' ? 'text' : type
      } : undefined;
      var action = type === 'function' ? bindable.property : undefined;
      acc[bindable.attribute] = {
        name: bindable.attribute,
        description: bindable.property,
        table: type ? {
          type: {
            summary: type
          }
        } : undefined,
        control: control,
        action: action
      };
      return acc;
    }, {});
  }

  return null;
};