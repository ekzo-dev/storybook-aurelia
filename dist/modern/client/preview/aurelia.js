import { Aurelia, CustomElement } from 'aurelia';
export function createComponentTemplate(component, innerHtml) {
  const def = CustomElement.getDefinition(component);
  return `<${def.name} ${Object.values(def.bindables).map(bindable => `${bindable.attribute}.bind="${bindable.property}"`).join(' ')}>${innerHtml !== null && innerHtml !== void 0 ? innerHtml : ''}</${def.name}>`;
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