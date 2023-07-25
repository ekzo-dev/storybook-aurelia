"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.regexp.exec.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAureliaApp = createAureliaApp;
exports.createComponentTemplate = createComponentTemplate;
exports.getComponentDefinition = void 0;

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.assign.js");

var _aurelia = require("aurelia");

var _runtimeHtml = require("@aurelia/runtime-html");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getComponentDefinition = function getComponentDefinition(component) {
  try {
    return _aurelia.CustomElement.getDefinition(component);
  } catch (_unused) {
    return _aurelia.CustomAttribute.getDefinition(component);
  }
};

exports.getComponentDefinition = getComponentDefinition;

function createComponentTemplate(component, innerHtml) {
  var def = getComponentDefinition(component);
  var bindables = Object.entries(def.bindables); // @ts-ignore

  if (def.type === _runtimeHtml.DefinitionType.Element) {
    return "<".concat(def.name, " ").concat(bindables.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          n = _ref2[0],
          b = _ref2[1];

      return "".concat(b.attribute, ".bind=\"").concat(n, "\"");
    }).join(' '), ">").concat(innerHtml !== null && innerHtml !== void 0 ? innerHtml : '', "</").concat(def.name, ">");
  }

  return "".concat(def.name, "=\"").concat(bindables.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        n = _ref4[0],
        b = _ref4[1];

    return "".concat(b.attribute, ".bind: ").concat(n);
  }).join('; '), "\"");
}

function createAureliaApp(story, component, args, domElement) {
  var _story$items, _story$components;

  var aurelia = new _aurelia.Aurelia(story.container);

  if ((_story$items = story.items) !== null && _story$items !== void 0 && _story$items.length) {
    aurelia.register.apply(aurelia, _toConsumableArray(story.items));
  }

  if ((_story$components = story.components) !== null && _story$components !== void 0 && _story$components.length) {
    aurelia.register.apply(aurelia, _toConsumableArray(story.components));
  }

  var template = story.template;

  if (component) {
    var _template;

    template = (_template = template) !== null && _template !== void 0 ? _template : createComponentTemplate(component, story.innerHtml);
    aurelia.register(component);
  }

  var App = _aurelia.CustomElement.define({
    name: 'sb-app',
    template: template,
    containerless: true
  }, /*#__PURE__*/function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    return _createClass(_class);
  }());

  var app = Object.assign(new App(), args);
  return aurelia.app({
    host: domElement,
    component: app
  });
}