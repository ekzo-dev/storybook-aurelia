import { Aurelia, CustomElement } from 'aurelia';
import { StoryFnAureliaReturnType, AureliaFramework } from './types';

export function createAureliaApp(
  story: StoryFnAureliaReturnType,
  component: AureliaFramework['component'],
  args: Record<string, any>,
  domElement: HTMLElement
): Partial<Aurelia> {
  const aurelia = new Aurelia(story.container);
  if (story.items?.length) {
    aurelia.register(...story.items);
  }
  if (story.components?.length) {
    aurelia.register(...story.components);
  }

  let { template } = story;
  if (component) {
    const def = CustomElement.getDefinition(component);
    const innerHtml = args.innerHtml ?? '';
    template =
      template ??
      `<${def.name} ${Object.values(def.bindables)
        .map((bindable) => `${bindable.attribute}.bind="${bindable.property}"`)
        .join(' ')}>${innerHtml}</${def.name}>`;
    aurelia.register(component);
  }

  const App = CustomElement.define({ name: 'sb-app', template }, class {});
  const app = Object.assign(new App(), args);

  return aurelia.app({
    host: domElement,
    component: app,
  });
}
