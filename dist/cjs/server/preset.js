"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.previewAnnotations = exports.addons = void 0;

var previewAnnotations = function (entries = []) {
  return [...entries // Not sure if we need this for Aurelia? I've otherwise copied the rest of this file from the angular stuff
  // require.resolve('../client/preview/config'),
  ];
};

exports.previewAnnotations = previewAnnotations;
var addons = [require.resolve('./framework-preset-aurelia')];
exports.addons = addons;