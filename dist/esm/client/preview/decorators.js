import "core-js/modules/es.object.assign.js";
export var addRegistries = function addRegistries() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return function (storyFn) {
    var _story$items;

    var story = storyFn();
    story.items = story.items || [];

    (_story$items = story.items).push.apply(_story$items, items);

    return Object.assign({}, story, {
      items: items
    });
  };
};
export var addComponents = function addComponents() {
  for (var _len2 = arguments.length, components = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    components[_key2] = arguments[_key2];
  }

  return function (storyFn) {
    var _story$components;

    var story = storyFn();
    story.components = story.components || [];

    (_story$components = story.components).push.apply(_story$components, components);

    return Object.assign({}, story, {
      components: components
    });
  };
};
export var addContainer = function addContainer(container) {
  return function (storyFn) {
    var story = storyFn();
    return Object.assign({}, story, {
      container: container
    });
  };
};