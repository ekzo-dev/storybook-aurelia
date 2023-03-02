import { Aurelia, CustomAttribute, CustomElement } from 'aurelia';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  CustomAttributeDefinition,
  CustomElementDefinition,
  DefinitionType,
} from '@aurelia/runtime-html';
import { AureliaFramework, StoryFnAureliaReturnType } from './preview';

export const getComponentDefinition = (
  component: AureliaFramework['component']
): CustomElementDefinition | CustomAttributeDefinition => {
  try {
    return CustomElement.getDefinition(component);
  } catch {
    return CustomAttribute.getDefinition(component);
  }
};

export function createComponentTemplate(
  component: AureliaFramework['component'],
  innerHtml?: string
): string {
  const def = getComponentDefinition(component);
  const bindables = Object.values(def.bindables);

  // @ts-ignore
  if (def.type === DefinitionType.Element) {
    return `<${def.name} ${bindables.map((b) => `${b.attribute}.bind="${b.property}"`).join(' ')}>${
      innerHtml ?? ''
    }</${def.name}>`;
  }

  return `${def.name}="${bindables.map((b) => `${b.attribute}.bind: ${b.property}`).join('; ')}"`;
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
