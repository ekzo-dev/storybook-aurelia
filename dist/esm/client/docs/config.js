import { extractComponentDescription, enhanceArgTypes } from '@storybook/docs-tools';
import { extractArgTypes } from './extractArgTypes';
import { prepareForInline } from './prepareForInline';
import { sourceDecorator } from './sourceDecorator';
export var parameters = {
  docs: {
    inlineStories: false,
    prepareForInline: prepareForInline,
    extractArgTypes: extractArgTypes,
    extractComponentDescription: extractComponentDescription
  }
};
export var decorators = [sourceDecorator];
export var argTypesEnhancers = [enhanceArgTypes];