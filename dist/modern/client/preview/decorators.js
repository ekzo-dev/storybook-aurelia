export const addRegistries = (...items) => storyFn => {
  const story = storyFn();
  story.items = story.items || [];
  story.items.push(...items);
  return Object.assign({}, story, {
    items
  });
};
export const addComponents = (...components) => storyFn => {
  const story = storyFn();
  story.components = story.components || [];
  story.components.push(...components);
  return Object.assign({}, story, {
    components
  });
};
export const addContainer = container => storyFn => {
  const story = storyFn();
  return Object.assign({}, story, {
    container
  });
};