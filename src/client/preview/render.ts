import type { RenderContext } from '@storybook/store';
import { Aurelia } from 'aurelia';
import { AureliaFramework } from './types';
import { createAureliaApp } from '../helpers';

let aurelia: Partial<Aurelia>;

/**
 * If props are retrieved from address bar, they are strings. Need to convert to actual types (Boolean/Number)
 * @param component
 * @param props
 */
// function castStoryProps(component: AureliaFramework['component'], props: ICollection): void {
//   const bindables = getComponentBindables(component);
//
//   bindables.forEach((bindable: PartialBindableDefinition) => {
//     const prop = props[bindable.property];
//     if (prop === undefined) return;
//
//     const type = bindable.type ?? Metadata.get('design:type', component.prototype, bindable.property);
//     switch (type) {
//       case Boolean:
//
//       case Number:
//
//     }
//     if (bindable.type === Boolean) {
//
//     }
//   });
// }

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
