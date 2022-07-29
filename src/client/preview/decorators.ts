import type { DecoratorFunction, StoryContext } from '@storybook/csf';
import { IContainer, ICustomElementViewModel, IRegistry } from 'aurelia';
import { AureliaFramework } from './types';

export const addRegistries =
  <TArgs = any>(...items: IRegistry[]): DecoratorFunction<AureliaFramework, TArgs> =>
  (storyFn) => {
    const story = storyFn();
    story.items = story.items || [];
    story.items.push(...items);

    return {
      ...story,
      items,
    };
  };

export const addComponents =
  <TArgs = any>(
    ...components: ICustomElementViewModel[]
  ): DecoratorFunction<AureliaFramework, TArgs> =>
  (storyFn) => {
    const story = storyFn();
    story.components = story.components || [];
    story.components.push(...components);

    return {
      ...story,
      components,
    };
  };

export const addContainer =
  <TArgs = any>(container: IContainer): DecoratorFunction<AureliaFramework, TArgs> =>
  (storyFn) => {
    const story = storyFn();

    return {
      ...story,
      container,
    };
  };
