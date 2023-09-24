import * as recast from 'recast';
import { Metadata } from 'aurelia';
export const getComponentAstData = (component, properties) => {
  const parent = Object.getPrototypeOf(component);
  const source = component.constructor.toString();
  let data;
  let lastProperty; // TODO: better detection that component is inherited

  if (parent.constructor.toString().startsWith('function Object()')) {
    // component is not inherited
    data = {};
  } else {
    // component is inherited, so get its data first
    data = getComponentAstData(parent, properties);
  }

  recast.visit(recast.parse(source), {
    visitAssignmentExpression: ({
      value
    }) => {
      const {
        left,
        right
      } = value;

      if (left.type === 'MemberExpression' && (left.object.type === 'ThisExpression' || left.object.name === '_this') && ['Literal', 'ObjectExpression', 'ArrayExpression'].includes(right.type)) {
        const {
          name
        } = left.property;

        if (properties.includes(name)) {
          let defaultValue;

          if (right.type === 'Literal') {
            defaultValue = right.value;
          } else {
            const {
              code
            } = recast.prettyPrint(right, {
              quote: 'double'
            });

            try {
              defaultValue = JSON.parse(code);
            } catch (e) {
              console.warn('[Storybook Aurelia] Cannot parse default value from code', code);
            }
          }

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
export const getBindableType = (component, bindable) => {
  var _bindable$type;

  const metadata = (_bindable$type = bindable.type) !== null && _bindable$type !== void 0 ? _bindable$type : Metadata.get('design:type', component.prototype, bindable.property);
  let type;

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