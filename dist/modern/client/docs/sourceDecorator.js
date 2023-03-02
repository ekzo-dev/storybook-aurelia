import { addons, useEffect } from '@storybook/addons';
import { SourceType, SNIPPET_RENDERED } from '@storybook/docs-tools';
import { createComponentTemplate } from '../helpers';
/**
 * Check if the sourcecode should be generated.
 *
 * @param context StoryContext
 */

const skipSourceRender = context => {
  var _context$parameters$d;

  const sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source;
  const isArgsStory = context === null || context === void 0 ? void 0 : context.parameters.__isArgsStory; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.


  return !isArgsStory || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.CODE;
};
/**
 * Svelte source decorator.
 * @param storyFn Fn
 * @param context StoryContext
 */


export const sourceDecorator = (storyFn, context) => {
  const channel = addons.getChannel();
  const skip = skipSourceRender(context);
  const story = storyFn();
  let source;
  useEffect(() => {
    if (!skip && source) {
      channel.emit(SNIPPET_RENDERED, (context || {}).id, source);
    }
  });

  if (skip) {
    return story;
  }

  const {
    template
  } = story;
  const {
    component
  } = context || {};

  if (template) {
    source = template;
  } else if (component) {
    source = createComponentTemplate(component, story.innerHtml);
  }

  return story;
};