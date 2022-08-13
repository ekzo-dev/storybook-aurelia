import "regenerator-runtime/runtime.js";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.regexp.exec.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { Aurelia, CustomElement } from 'aurelia';
var aurelia;
export function renderToDOM(_x, _x2) {
  return _renderToDOM.apply(this, arguments);
}

function _renderToDOM() {
  _renderToDOM = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref, domElement) {
    var storyFn, kind, name, showMain, showError, forceRemount, _ref$storyContext, parameters, component, story, _story$items, _story$components, _aurelia, _aurelia2, template, _story$props$innerHtm, _template, def, innerHtml, App, app;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            storyFn = _ref.storyFn, kind = _ref.kind, name = _ref.name, showMain = _ref.showMain, showError = _ref.showError, forceRemount = _ref.forceRemount, _ref$storyContext = _ref.storyContext, parameters = _ref$storyContext.parameters, component = _ref$storyContext.component;
            story = storyFn();

            if (!story) {
              showError({
                title: "Expecting an Aurelia component from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
                description: "\n        Did you forget to return the Aurelia component from the story?\n        Use \"() => ({ template: '<custom-component></custom-component>' })\" when defining the story.\n      "
              });
            }

            showMain();

            if (!(!aurelia || forceRemount)) {
              _context.next = 19;
              break;
            }

            if (!aurelia) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return aurelia.stop();

          case 8:
            aurelia = new Aurelia(story.container);

            if ((_story$items = story.items) !== null && _story$items !== void 0 && _story$items.length) {
              (_aurelia = aurelia).register.apply(_aurelia, _toConsumableArray(story.items));
            }

            if ((_story$components = story.components) !== null && _story$components !== void 0 && _story$components.length) {
              (_aurelia2 = aurelia).register.apply(_aurelia2, _toConsumableArray(story.components));
            }

            template = story.template;

            if (component) {
              def = CustomElement.getDefinition(component);
              innerHtml = (_story$props$innerHtm = story.props.innerHtml) !== null && _story$props$innerHtm !== void 0 ? _story$props$innerHtm : '';
              template = (_template = template) !== null && _template !== void 0 ? _template : "<".concat(def.name, " ").concat(Object.values(def.bindables).map(function (bindable) {
                return "".concat(bindable.attribute, ".bind=\"").concat(bindable.property, "\"");
              }).join(' '), ">").concat(innerHtml, "</").concat(def.name, ">");
              aurelia.register(component);
            }

            App = CustomElement.define({
              name: 'sb-app',
              template: template
            }, /*#__PURE__*/function () {
              function _class() {
                _classCallCheck(this, _class);
              }

              return _createClass(_class);
            }());
            app = Object.assign(new App(), Object.assign({}, parameters.args, story.props));
            _context.next = 17;
            return aurelia.app({
              host: domElement,
              component: app
            }).start();

          case 17:
            _context.next = 20;
            break;

          case 19:
            Object.assign(aurelia.root.controller.viewModel, story.props);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _renderToDOM.apply(this, arguments);
}