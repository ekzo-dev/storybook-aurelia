import * as recast from 'recast';
import { CustomElement } from 'aurelia'; // eslint-disable-next-line @typescript-eslint/no-namespace

export const getComponentBindables = component => {
  const def = CustomElement.getDefinition(component);
  return Object.values(def.bindables);
};
export const getComponentAstData = (component, properties) => {
  const source = component.prototype.constructor.toString();
  const data = {};
  let lastProperty;
  recast.visit(recast.parse(source), {
    visitAssignmentExpression: ({
      value
    }) => {
      const {
        left,
        right
      } = value;

      if (left.type === 'MemberExpression' && left.object.type === 'ThisExpression' && ['Literal', 'ObjectExpression', 'ArrayExpression'].includes(right.type)) {
        const {
          name
        } = left.property;

        if (properties.includes(name)) {
          const defaultValue = right.type === 'Literal' ? right.value : JSON.parse(recast.print(right).code);
          data[name] = {
            defaultValue
          };
          lastProperty = name;
        } else {
          lastProperty = undefined;
        }
      } // return false to stop at this depth


      return false;
    },
    visitComment: ({
      value
    }) => {
      if (lastProperty) {
        data[lastProperty].comment = value.value;
      } // return false to stop at this depth


      return false;
    }
  });
  return data;
};
export const getPropertyType = (component, property) => {
  const metadata = Reflect.getMetadata('design:type', component.prototype, property);
  let type;

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
export const getTypeFromValue = value => {
  if (Array.isArray(value)) {
    return 'array';
  }

  return typeof value;
};