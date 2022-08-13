"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypeFromValue = exports.getPropertyType = exports.getComponentBindables = exports.getComponentAstData = void 0;

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.number.constructor.js");

var recast = _interopRequireWildcard(require("recast"));

var _aurelia = require("aurelia");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var getComponentBindables = function getComponentBindables(component) {
  var def = _aurelia.CustomElement.getDefinition(component);

  return Object.values(def.bindables);
};

exports.getComponentBindables = getComponentBindables;

var getComponentAstData = function getComponentAstData(component, properties) {
  var source = component.prototype.constructor.toString();
  var data = {};
  var lastProperty;
  recast.visit(recast.parse(source), {
    visitAssignmentExpression: function visitAssignmentExpression(_ref) {
      var value = _ref.value;
      var left = value.left,
          right = value.right;

      if (left.type === 'MemberExpression' && left.object.type === 'ThisExpression' && ['Literal', 'ObjectExpression', 'ArrayExpression'].includes(right.type)) {
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

exports.getComponentAstData = getComponentAstData;

var getPropertyType = function getPropertyType(component, property) {
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

exports.getPropertyType = getPropertyType;

var getTypeFromValue = function getTypeFromValue(value) {
  if (Array.isArray(value)) {
    return 'array';
  }

  return _typeof(value);
};

exports.getTypeFromValue = getTypeFromValue;