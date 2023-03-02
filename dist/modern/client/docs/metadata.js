import * as recast from 'recast';
import { Metadata } from 'aurelia';
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

      if (left.type === 'MemberExpression' && (left.object.type === 'ThisExpression' || left.object.name === '_this') && ['Literal', 'ObjectExpression', 'ArrayExpression'].includes(right.type)) {
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