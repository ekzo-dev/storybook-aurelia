import type { RenderContext } from '@storybook/store';
import { Aurelia, CustomElement } from 'aurelia';
import { AureliaFramework } from './types';

let aurelia: Aurelia;

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

    aurelia = new Aurelia(story.container);
    if (story.items?.length) {
      aurelia.register(...story.items);
    }
    if (story.components?.length) {
      aurelia.register(...story.components);
    }

    let { template } = story;
    if (component) {
      const def = CustomElement.getDefinition(component);
      const innerHtml = story.props.innerHtml ?? '';
      template =
        template ??
        `<${def.name} ${Object.values(def.bindables)
          .map((bindable) => `${bindable.attribute}.bind="${bindable.property}"`)
          .join(' ')}>${innerHtml}</${def.name}>`;
      aurelia.register(component);
    }

    const App = CustomElement.define({ name: 'sb-app', template }, class {});
    const app = Object.assign(new App(), { ...parameters.args, ...story.props });

    await aurelia
      .app({
        host: domElement,
        component: app,
      })
      .start();
  } else {
    Object.assign(aurelia.root.controller.viewModel, story.props);
  }
}
