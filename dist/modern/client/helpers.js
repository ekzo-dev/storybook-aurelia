import { Aurelia, CustomAttribute, CustomElement } from 'aurelia'; // eslint-disable-next-line import/no-extraneous-dependencies

import { DefinitionType } from '@aurelia/runtime-html';
export const getComponentDefinition = component => {
  try {
    return CustomElement.getDefinition(component);
  } catch {
    return CustomAttribute.getDefinition(component);
  }
};
export function createComponentTemplate(component, innerHtml) {
  const def = getComponentDefinition(component);
  const bindables = Object.values(def.bindables); // @ts-ignore

  if (def.type === DefinitionType.Element) {
    return `<${def.name} ${bindables.map(b => `${b.attribute}.bind="${b.property}"`).join(' ')}>${innerHtml !== null && innerHtml !== void 0 ? innerHtml : ''}</${def.name}>`;
  }

  return `${def.name}="${bindables.map(b => `${b.attribute}.bind: ${b.property}`).join('; ')}"`;
}
export function createAureliaApp(story, component, args, domElement) {
  var _story$items, _story$components;

  const aurelia = new Aurelia(story.container);

  if ((_story$items = story.items) !== null && _story$items !== void 0 && _story$items.length) {
    aurelia.register(...story.items);
  }

  if ((_story$components = story.components) !== null && _story$components !== void 0 && _story$components.length) {
    aurelia.register(...story.components);
  }

  let {
    template
  } = story;

  if (component) {
    var _template;

    template = (_template = template) !== null && _template !== void 0 ? _template : createComponentTemplate(component, story.innerHtml);
    aurelia.register(component);
  }

  const App = CustomElement.define({
    name: 'sb-app',
    template,
    containerless: true
  }, class {});
  const app = Object.assign(new App(), args);
  return aurelia.app({
    host: domElement,
    component: app
  });
}