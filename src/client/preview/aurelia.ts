import { Aurelia, CustomElement } from 'aurelia';
import { StoryFnAureliaReturnType, AureliaFramework } from './types';

export function createComponentTemplate(
  component: AureliaFramework['component'],
  innerHtml: string
): string {
  const def = CustomElement.getDefinition(component);

  return `<${def.name} ${Object.values(def.bindables)
    .map((bindable) => `${bindable.attribute}.bind="${bindable.property}"`)
    .join(' ')}>${innerHtml ?? ''}</${def.name}>`;
}

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
    template = template ?? createComponentTemplate(component, story.innerHtml);
    aurelia.register(component);
  }

  const App = CustomElement.define(
    {
      name: 'sb-app',
      template,
      containerless: true,
    },
    class {}
  );
  const app = Object.assign(new App(), args);

  return aurelia.app({
    host: domElement,
    component: app,
  });
}
