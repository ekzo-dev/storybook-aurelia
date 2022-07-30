import "core-js/modules/es.array.reduce.js";
import { CustomElement } from 'aurelia';
export const extractArgTypes = component => {
  if (component) {
    const def = CustomElement.getDefinition(component);
    return Object.values(def.bindables).reduce((acc, bindable) => {
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