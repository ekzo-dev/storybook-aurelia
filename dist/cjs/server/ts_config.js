"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _nodeLogger = require("@storybook/node-logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable func-names */
function resolveTsConfig(tsConfigPath) {
  if (_fs.default.existsSync(tsConfigPath)) {
    _nodeLogger.logger.info('=> Found custom tsconfig.json');

    return tsConfigPath;
  }

  return undefined;
}

function _default(configDir) {
  var configFilePath = resolveTsConfig(_path.default.resolve(configDir, 'tsconfig.json'));
  return {
    transpileOnly: true,
    configFile: configFilePath || undefined
  };
}