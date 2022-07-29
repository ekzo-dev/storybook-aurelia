"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _forkTsCheckerWebpackPlugin = _interopRequireDefault(require("fork-ts-checker-webpack-plugin"));

var _nodeLogger = require("@storybook/node-logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable func-names */
function _default(tsLoaderOptions) {
  if (tsLoaderOptions && tsLoaderOptions.configFile) {
    return new _forkTsCheckerWebpackPlugin.default({
      tsconfig: tsLoaderOptions.configFile,
      async: false
    });
  }

  _nodeLogger.logger.info('=> Using default options for ForkTsCheckerWebpackPlugin');

  return new _forkTsCheckerWebpackPlugin.default();
}