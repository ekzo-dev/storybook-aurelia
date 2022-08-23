"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argTypesEnhancers = exports.parameters = void 0;
const docs_tools_1 = require("@storybook/docs-tools");
const extractArgTypes_1 = require("./extractArgTypes");
const prepareForInline_1 = require("./prepareForInline");
exports.parameters = {
    docs: {
        inlineStories: true,
        prepareForInline: prepareForInline_1.prepareForInline,
        extractArgTypes: extractArgTypes_1.extractArgTypes,
        extractComponentDescription: docs_tools_1.extractComponentDescription,
    },
};
exports.argTypesEnhancers = [docs_tools_1.enhanceArgTypes];
