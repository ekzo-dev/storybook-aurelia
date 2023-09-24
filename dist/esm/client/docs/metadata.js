import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.starts-with.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.number.constructor.js";
import * as recast from 'recast';
import { Metadata } from 'aurelia';
export var getComponentAstData = function getComponentAstData(component, properties) {
  var parent = Object.getPrototypeOf(component);
  var source = component.constructor.toString();
  var data;
  var lastProperty; // TODO: better detection that component is inherited

  if (parent.constructor.toString().startsWith('function Object()')) {
    // component is not inherited
    data = {};
  } else {
    // component is inherited, so get its data first
    data = getComponentAstData(parent, properties);
  }

  recast.visit(recast.parse(source), {
    visitAssignmentExpression: function visitAssignmentExpression(_ref) {
      var value = _ref.value;
      var left = value.left,
          right = value.right;

      if (left.type === 'MemberExpression' && (left.object.type === 'ThisExpression' || left.object.name === '_this') && ['Literal', 'ObjectExpression', 'ArrayExpression'].includes(right.type)) {
        var _ref2 = left.property,
            name = _ref2.name;

        if (properties.includes(name)) {
          var defaultValue;

          if (right.type === 'Literal') {
            defaultValue = right.value;
          } else {
            var _recast$prettyPrint = recast.prettyPrint(right, {
              quote: 'double'
            }),
                code = _recast$prettyPrint.code;

            try {
              defaultValue = JSON.parse(code);
            } catch (e) {
              console.warn('[Storybook Aurelia] Cannot parse default value from code', code);
            }
          }

          data[name] = {
            defaultValue: defaultValue
          };
          lastProperty = name;
        } else {
          lastProperty = undefined;
        }
      } // return false to stop at this depth


      return false;
    },
    visitComment: function visitComment(_ref3) {
      var value = _ref3.value;

      if (lastProperty) {
        data[lastProperty].comment = value.value;
      } // return false to stop at this depth


      return false;
    }
  });
  return data;
};
export var getBindableType = function getBindableType(component, bindable) {
  var _bindable$type;

  var metadata = (_bindable$type = bindable.type) !== null && _bindable$type !== void 0 ? _bindable$type : Metadata.get('design:type', component.prototype, bindable.property);
  var type;

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