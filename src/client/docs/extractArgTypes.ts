import type { SBType, StrictArgTypes } from '@storybook/csf';
import type { ArgTypesExtractor, Component } from '@storybook/docs-tools';
import { CustomElement } from 'aurelia';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Reflect {
  function getMetadata(metadataKey: any, target: any, propertyKey?: string | symbol): any;
}

const getType = (component: Component, property: string): SBType['name'] | undefined => {
  const metadata = Reflect.getMetadata('design:type', component.prototype, property);

  let type: SBType['name'];
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

export const extractArgTypes: ArgTypesExtractor = (component) => {
  if (component) {
    const def = CustomElement.getDefinition(component);
    return Object.values(def.bindables).reduce((acc: StrictArgTypes, bindable) => {
      const type = getType(component, bindable.property);
      const control =
        type && type !== 'function'
          ? {
              type: type === 'string' ? 'text' : type,
            }
          : undefined;
      const action = type === 'function' ? bindable.property : undefined;

      acc[bindable.attribute] = {
        name: bindable.attribute,
        description: bindable.property,
        table: type
          ? {
              type: { summary: type },
            }
          : undefined,
        control,
        action,
      };

      return acc;
    }, {});
  }

  return null;
};
