function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.regexp.exec.js";
import { Aurelia, CustomElement } from 'aurelia';
export function createComponentTemplate(component, innerHtml) {
  var def = CustomElement.getDefinition(component);
  return "<".concat(def.name, " ").concat(Object.values(def.bindables).map(function (bindable) {
    return "".concat(bindable.attribute, ".bind=\"").concat(bindable.property, "\"");
  }).join(' '), ">").concat(innerHtml !== null && innerHtml !== void 0 ? innerHtml : '', "</").concat(def.name, ">");
}
export function createAureliaApp(story, component, args, domElement) {
  var _story$items, _story$components;

  var aurelia = new Aurelia(story.container);

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

  var App = CustomElement.define({
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