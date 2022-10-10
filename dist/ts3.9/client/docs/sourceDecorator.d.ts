import { PartialStoryFn } from '@storybook/csf';
import { StoryContext, AureliaFramework } from '..';
/**
 * Svelte source decorator.
 * @param storyFn Fn
 * @param context StoryContext
 */
export declare const sourceDecorator: (storyFn: PartialStoryFn<AureliaFramework>, context: StoryContext) => import("..").StoryFnAureliaReturnType;
