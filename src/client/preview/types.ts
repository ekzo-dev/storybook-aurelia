import type {
  Args,
  Parameters as DefaultParameters,
  StoryContext as DefaultStoryContext,
  ComponentAnnotations,
  StoryAnnotations,
  AnnotatedStoryFn,
} from '@storybook/csf';
import { IRegistry, IContainer, Constructable, ICustomElementViewModel } from 'aurelia';

export interface ICollection {
  [p: string]: any;
}

export interface StoryFnAureliaReturnType {
  components?: ICustomElementViewModel[];
  props?: ICollection;
  template?: string;
  items?: IRegistry[];
  container?: IContainer;
  innerHtml?: string;
}

export type AureliaFramework = {
  component: ICustomElementViewModel & Constructable;
  storyResult: StoryFnAureliaReturnType;
};

export interface IStorybookStory {
  name: string;
  render: (context: any) => any;
}

export interface IStorybookSection {
  kind: string;
  stories: IStorybookStory[];
}

export interface ShowErrorArgs {
  title: string;
  description: string;
}

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export declare type Meta<TArgs = Args> = ComponentAnnotations<AureliaFramework, TArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export declare type StoryFn<TArgs = Args> = AnnotatedStoryFn<AureliaFramework, TArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export declare type StoryObj<TArgs = Args> = StoryAnnotations<AureliaFramework, TArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 *
 * NOTE that in Storybook 7.0, this type will be renamed to `StoryFn` and replaced by the current `StoryObj` type.
 *
 */
export declare type Story<TArgs = Args> = StoryFn<TArgs>;
export declare type Parameters = DefaultParameters & {
  /** Uses legacy angular rendering engine that use dynamic component */
  angularLegacyRendering?: boolean;
  bootstrapModuleOptions?: unknown;
};
export declare type StoryContext = DefaultStoryContext<AureliaFramework> & {
  parameters: Parameters;
};
