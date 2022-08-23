import "regenerator-runtime/runtime.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.assign.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { createAureliaApp } from './aureliaApp';
var aurelia;
export function renderToDOM(_x, _x2) {
  return _renderToDOM.apply(this, arguments);
}

function _renderToDOM() {
  _renderToDOM = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref, domElement) {
    var storyFn, kind, name, showMain, showError, forceRemount, _ref$storyContext, parameters, component, story;

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
              _context.next = 13;
              break;
            }

            if (!aurelia) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return aurelia.stop();

          case 8:
            aurelia = createAureliaApp(story, component, Object.assign({}, parameters.args, story.props), domElement);
            _context.next = 11;
            return aurelia.start();

          case 11:
            _context.next = 14;
            break;

          case 13:
            Object.assign(aurelia.root.controller.viewModel, story.props);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _renderToDOM.apply(this, arguments);
}