import { Aurelia, CustomElement } from 'aurelia';
let aurelia;
export async function renderToDOM({
  storyFn,
  kind,
  name,
  showMain,
  showError,
  forceRemount,
  storyContext: {
    parameters,
    component
  }
}, domElement) {
  const story = storyFn();

  if (!story) {
    showError({
      title: `Expecting an Aurelia component from the story: "${name}" of "${kind}".`,
      description: `
        Did you forget to return the Aurelia component from the story?
        Use "() => ({ template: '<custom-component></custom-component>' })" when defining the story.
      `
    });
  }

  showMain();

  if (!aurelia || forceRemount) {
    var _story$items, _story$components;

    if (aurelia) {
      await aurelia.stop();
    }

    aurelia = new Aurelia(story.container);

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
      var _story$props$innerHtm, _template;

      const def = CustomElement.getDefinition(component);
      const innerHtml = (_story$props$innerHtm = story.props.innerHtml) !== null && _story$props$innerHtm !== void 0 ? _story$props$innerHtm : '';
      template = (_template = template) !== null && _template !== void 0 ? _template : `<${def.name} ${Object.values(def.bindables).map(bindable => `${bindable.attribute}.bind="${bindable.property}"`).join(' ')}>${innerHtml}</${def.name}>`;
      aurelia.register(component);
    }

    const App = CustomElement.define({
      name: 'sb-app',
      template
    }, class {});
    const app = Object.assign(new App(), Object.assign({}, parameters.args, story.props));
    await aurelia.app({
      host: domElement,
      component: app
    }).start();
  } else {
    Object.assign(aurelia.root.controller.viewModel, story.props);
  }
}