"use strict";

var _ts_config = _interopRequireDefault(require("../ts_config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line global-require, jest/no-mocks-import
jest.mock('fs', function () {
  return require('../../../../../__mocks__/fs');
});
jest.mock('path', function () {
  return {
    resolve: function () {
      return 'tsconfig.json';
    }
  };
});
jest.mock('@storybook/node-logger');

var setupFiles = function (files) {
  // eslint-disable-next-line no-underscore-dangle, global-require
  require('fs').__setMockFiles(files);
};

describe('ts_config', function () {
  it('should return the config with the path to the tsconfig.json', function () {
    setupFiles({
      'tsconfig.json': '{}'
    });
    var config = (0, _ts_config.default)('.foo');
    expect(config).toEqual({
      transpileOnly: true,
      configFile: 'tsconfig.json'
    });
  });
  it('should return object with transpileOnly: true when there is no tsconfig.json', function () {
    setupFiles({});
    var config = (0, _ts_config.default)('.foo');
    expect(config).toEqual({
      transpileOnly: true
    });
  });
});