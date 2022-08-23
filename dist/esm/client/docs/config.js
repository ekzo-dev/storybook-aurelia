import { extractComponentDescription, enhanceArgTypes } from '@storybook/docs-tools';
import { extractArgTypes } from './extractArgTypes';
import { prepareForInline } from './prepareForInline';
export var parameters = {
  docs: {
    inlineStories: false,
    prepareForInline: prepareForInline,
    extractArgTypes: extractArgTypes,
    extractComponentDescription: extractComponentDescription
  }
};
export var argTypesEnhancers = [enhanceArgTypes];