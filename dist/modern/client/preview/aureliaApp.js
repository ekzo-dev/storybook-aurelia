import { Aurelia, CustomElement } from 'aurelia';
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
    var _template, _story$innerHtml;

    const def = CustomElement.getDefinition(component);
    template = (_template = template) !== null && _template !== void 0 ? _template : `<${def.name} ${Object.values(def.bindables).map(bindable => `${bindable.attribute}.bind="${bindable.property}"`).join(' ')}>${(_story$innerHtml = story.innerHtml) !== null && _story$innerHtml !== void 0 ? _story$innerHtml : ''}</${def.name}>`;
    aurelia.register(component);
  }

  const App = CustomElement.define({
    name: 'sb-app',
    template
  }, class {});
  const app = Object.assign(new App(), args);
  return aurelia.app({
    host: domElement,
    component: app
  });
}