"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parameters = exports.argTypesEnhancers = void 0;

var _docsTools = require("@storybook/docs-tools");

var _extractArgTypes = require("./extractArgTypes");

var _prepareForInline = require("./prepareForInline");

var parameters = {
  docs: {
    inlineStories: false,
    prepareForInline: _prepareForInline.prepareForInline,
    extractArgTypes: _extractArgTypes.extractArgTypes,
    extractComponentDescription: _docsTools.extractComponentDescription
  }
};
exports.parameters = parameters;
var argTypesEnhancers = [_docsTools.enhanceArgTypes];
exports.argTypesEnhancers = argTypesEnhancers;