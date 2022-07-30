"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.previewAnnotations = void 0;

var _path = _interopRequireDefault(require("path"));

var _docsTools = require("@storybook/docs-tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var previewAnnotations = function (entry = [], options) {
  if (!(0, _docsTools.hasDocsOrControls)(options)) return entry;
  return [...entry, _path.default.join(__dirname, '../../../dist/cjs/client/docs/config')];
};

exports.previewAnnotations = previewAnnotations;