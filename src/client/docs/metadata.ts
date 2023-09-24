import type { SBType } from '@storybook/csf';
import type { Component } from '@storybook/docs-tools';
import * as recast from 'recast';
import { AssignmentExpression, MemberExpression, Literal, Identifier, Comment } from 'estree';
import { Metadata, PartialBindableDefinition } from 'aurelia';

export type ComponentAstData = Record<string, { defaultValue: any; comment?: string }>;

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
          let defaultValue;
          if (right.type === 'Literal') {
            defaultValue = (right as Literal).value;
          } else {
            const { code } = recast.prettyPrint(right, { quote: 'double' });
            try {
              defaultValue = JSON.parse(code);
            } catch (e) {
              console.warn('[Storybook Aurelia] Cannot parse default value from code', code);
            }
          }

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

export const getBindableType = (
  component: Component,
  bindable: PartialBindableDefinition
): SBType['name'] | undefined => {
  const metadata =
    bindable.type ?? Metadata.get('design:type', component.prototype, bindable.property);

  let type: SBType['name'];
  switch (metadata) {
    // remove eslint-disable when migrate to SB7
    // eslint-disable-next-line no-undef
    case BigInt:
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
