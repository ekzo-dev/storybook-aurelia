import type { RenderContext } from '@storybook/store';
import { Aurelia } from 'aurelia';
import { AureliaFramework } from './types';
import { createAureliaApp } from './aurelia';

let aurelia: Partial<Aurelia>;

export async function renderToDOM(
  {
    storyFn,
    kind,
    name,
    showMain,
    showError,
    forceRemount,
    storyContext: { parameters, component },
  }: RenderContext<AureliaFramework>,
  domElement: HTMLElement
) {
  const story = storyFn();

  if (!story) {
    showError({
      title: `Expecting an Aurelia component from the story: "${name}" of "${kind}".`,
      description: `
        Did you forget to return the Aurelia component from the story?
        Use "() => ({ template: '<custom-component></custom-component>' })" when defining the story.
      `,
    });
  }
  showMain();

  if (!aurelia || forceRemount) {
    if (aurelia) {
      await aurelia.stop();
    }

    aurelia = createAureliaApp(
      story,
      component,
      { ...parameters.args, ...story.props },
      domElement
    );
    await aurelia.start();
  } else {
    Object.assign(aurelia.root.controller.viewModel, story.props);
  }
}
