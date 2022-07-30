import { extractComponentDescription } from '@storybook/docs-tools';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        extractArgTypes: import("@storybook/docs-tools").ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
};
export declare const argTypesEnhancers: (<TFramework extends import("@storybook/csf").AnyFramework>(context: import("@storybook/csf").StoryContextForEnhancers<TFramework, import("@storybook/csf").Args>) => import("@storybook/addons").Parameters | import("@storybook/csf").StrictArgTypes<import("@storybook/csf").Args>)[];
