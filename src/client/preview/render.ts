import type { RenderContext } from '@storybook/store';
import { Aurelia, CustomElement, Constructable, ICustomElementViewModel } from 'aurelia';
import { AureliaFramework } from './types';

let previousAurelia: Aurelia;
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
  const element = storyFn();

  if (!element) {
    showError({
      title: `Expecting an Aurelia component from the story: "${name}" of "${kind}".`,
      description: `
        Did you forget to return the Aurelia component from the story?
        Use "() => ({ template: '<custom-component></custom-component>' })" when defining the story.
      `,
    });
  }
  showMain();

  if (previousAurelia) {
    await previousAurelia.stop();
  }

  previousAurelia = new Aurelia(element.container);
  if (element.items && element.items.length > 0) {
    previousAurelia.register(...element.items);
  }

  if (element.components && element.components.length > 0) {
    previousAurelia.container.register(...element.components);
  }

  let { template } = element;
  if (component) {
    const def = CustomElement.getDefinition(component);
    template =
      template ??
      `<${def.name} ${Object.keys(def.bindables)
        .map((key) => `${def.bindables[key].attribute}.bind="${def.bindables[key].property}" `)
        .join(' ')}  ></${def.name}>`;
    previousAurelia.register(component);
  }

  const App = CustomElement.define({ name: 'app', template }, class {});

  const app = Object.assign(new App(), { ...parameters.args, ...element.props });

  await previousAurelia
    .app({
      host: domElement,
      component: app,
    })
    .start();
}
