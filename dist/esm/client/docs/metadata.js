function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.object.values.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import * as recast from 'recast';
import { CustomElement } from 'aurelia'; // eslint-disable-next-line @typescript-eslint/no-namespace

export var getComponentBindables = function getComponentBindables(component) {
  var def = CustomElement.getDefinition(component);
  return Object.values(def.bindables);
};
export var getComponentAstData = function getComponentAstData(component, properties) {
  var source = component.prototype.constructor.toString();
  var data = {};
  var lastProperty;
  recast.visit(recast.parse(source), {
    visitAssignmentExpression: function visitAssignmentExpression(_ref) {
      var value = _ref.value;
      var left = value.left,
          right = value.right;

      if (left.type === 'MemberExpression' && (left.object.type === 'ThisExpression' || left.object.name === '_this') && ['Literal', 'ObjectExpression', 'ArrayExpression'].includes(right.type)) {
        var _ref2 = left.property,
            name = _ref2.name;

        if (properties.includes(name)) {
          var defaultValue = right.type === 'Literal' ? right.value : JSON.parse(recast.print(right).code);
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
export var getPropertyType = function getPropertyType(component, property) {
  var metadata = Reflect.getMetadata('design:type', component.prototype, property);
  var type;

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
export var getTypeFromValue = function getTypeFromValue(value) {
  if (Array.isArray(value)) {
    return 'array';
  }

  return _typeof(value);
};