"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceDecorator = void 0;

var _addons = require("@storybook/addons");

var _docsTools = require("@storybook/docs-tools");

var _aurelia = require("../preview/aurelia");

/**
 * Check if the sourcecode should be generated.
 *
 * @param context StoryContext
 */
var skipSourceRender = function skipSourceRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source;
  var isArgsStory = context === null || context === void 0 ? void 0 : context.parameters.__isArgsStory; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _docsTools.SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.


  return !isArgsStory || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _docsTools.SourceType.CODE;
};
/**
 * Svelte source decorator.
 * @param storyFn Fn
 * @param context StoryContext
 */


var sourceDecorator = function sourceDecorator(storyFn, context) {
  var channel = _addons.addons.getChannel();

  var skip = skipSourceRender(context);
  var story = storyFn();
  var source;
  (0, _addons.useEffect)(function () {
    if (!skip && source) {
      channel.emit(_docsTools.SNIPPET_RENDERED, (context || {}).id, source);
    }
  });

  if (skip) {
    return story;
  }

  var template = story.template;

  var _ref = context || {},
      component = _ref.component;

  if (template) {
    source = template;
  } else if (component) {
    source = (0, _aurelia.createComponentTemplate)(component, story.innerHtml);
  }

  return story;
};

exports.sourceDecorator = sourceDecorator;