import type { SBType } from '@storybook/csf';
import type { Component } from '@storybook/docs-tools';
import * as recast from 'recast';
import { AssignmentExpression, MemberExpression, Literal, Identifier, Comment } from 'estree';
import { CustomElement } from 'aurelia';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Reflect {
  function getMetadata(metadataKey: any, target: any, propertyKey?: string | symbol): any;
}

export type ComponentAstData = Record<string, { defaultValue: any; comment?: string }>;

export const getComponentBindables = (component: Component) => {
  const def = CustomElement.getDefinition(component);

  return Object.values(def.bindables);
};

export const getComponentAstData = (
  component: Component,
  properties: string[]
): ComponentAstData => {
  const source = component.prototype.constructor.toString();
  const data: ComponentAstData = {};
  let lastProperty: string;

  recast.visit(recast.parse(source), {
    visitAssignmentExpression: ({ value }: { value: AssignmentExpression }) => {
      const { left, right } = value;

      if (
        left.type === 'MemberExpression' &&
        (left.object.type === 'ThisExpression' || (left.object as Identifier).name === '_this') &&
        ['Literal', 'ObjectExpression', 'ArrayExpression'].includes(right.type)
      ) {
        const { name } = (left as MemberExpression).property as Identifier;

        if (properties.includes(name)) {
          const defaultValue =
            right.type === 'Literal'
              ? (right as Literal).value
              : JSON.parse(recast.print(right).code);

          data[name] = {
            defaultValue,
          };
          lastProperty = name;
        } else {
          lastProperty = undefined;
        }
      }

      // return false to stop at this depth
      return false;
    },
    visitComment: ({ value }: { value: Comment }) => {
      if (lastProperty) {
        data[lastProperty].comment = value.value;
      }

      // return false to stop at this depth
      return false;
    },
  });

  return data;
};

export const getPropertyType = (
  component: Component,
  property: string
): SBType['name'] | undefined => {
  const metadata = Reflect.getMetadata('design:type', component.prototype, property);

  let type: SBType['name'];
  switch (metadata) {
    case String:
    case Boolean:
    case Number:
    case Object:
    case Function:
    case Array:
      type = metadata.name.toLowerCase();
      break;
    default:
  }

  return type;
};

export const getTypeFromValue = (value: any): SBType['name'] => {
  if (Array.isArray(value)) {
    return 'array';
  }

  return typeof value as SBType['name'];
};
