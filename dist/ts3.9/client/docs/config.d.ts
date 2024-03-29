import { extractComponentDescription } from '@storybook/docs-tools';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: import("@storybook/csf").PartialStoryFn<import("..").AureliaFramework, import("@storybook/csf").Args>, { args, component }: import("@storybook/csf").StoryContext<import("..").AureliaFramework, import("@storybook/csf").Args>) => import("react").DetailedReactHTMLElement<import("react").HTMLAttributes<undefined>, undefined>;
        extractArgTypes: import("@storybook/docs-tools").ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
};
export declare const decorators: ((storyFn: import("@storybook/csf").PartialStoryFn<import("..").AureliaFramework, import("@storybook/csf").Args>, context: import("..").StoryContext) => import("..").StoryFnAureliaReturnType)[];
export declare const argTypesEnhancers: (<TFramework extends import("@storybook/csf").AnyFramework>(context: import("@storybook/csf").StoryContextForEnhancers<TFramework, import("@storybook/csf").Args>) => import("@storybook/addons").Parameters | import("@storybook/csf").StrictArgTypes<import("@storybook/csf").Args>)[];
