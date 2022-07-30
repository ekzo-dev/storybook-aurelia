import { extractComponentDescription, enhanceArgTypes } from '@storybook/docs-tools';
import { extractArgTypes } from './extractArgTypes';
export var parameters = {
  docs: {
    inlineStories: false,
    extractArgTypes: extractArgTypes,
    extractComponentDescription: extractComponentDescription
  }
};
export var argTypesEnhancers = [enhanceArgTypes];