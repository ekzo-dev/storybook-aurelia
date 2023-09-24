import "core-js/modules/es.array.reduce.js";
import { getComponentAstData, getBindableType } from './metadata';
import { getComponentDefinition } from '../helpers';

const shouldEncode = obj => (obj === null || obj === void 0 ? void 0 : obj.toString()) === '[object Object]' || Array.isArray(obj);

export const extractArgTypes = component => {
  if (!component) return null;
  const def = getComponentDefinition(component);
  const astData = getComponentAstData(component.prototype, Object.keys(def.bindables));
  return Object.values(def.bindables).reduce((acc, bindable) => {
    // get all available metadata
    const type = getBindableType(component, bindable);
    const propAstData = astData[bindable.property] || {}; // get default value

    const {
      defaultValue
    } = propAstData; // determine appropriate control or action

    const control = type && type !== 'function' ? {
      type: type === 'string' ? 'text' : type
    } : undefined;
    acc[bindable.property] = {
      name: bindable.attribute,
      defaultValue,
      table: {
        type: type ? {
          summary: type
        } : undefined,
        defaultValue: defaultValue !== undefined ? {
          summary: shouldEncode(defaultValue) ? JSON.stringify(defaultValue) : defaultValue
        } : undefined
      },
      control
    };
    return acc;
  }, {});
};