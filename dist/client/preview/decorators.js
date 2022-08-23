"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addContainer = exports.addComponents = exports.addRegistries = void 0;
exports.addRegistries = (...items) => (storyFn) => {
    const story = storyFn();
    story.items = story.items || [];
    story.items.push(...items);
    return Object.assign(Object.assign({}, story), { items });
};
exports.addComponents = (...components) => (storyFn) => {
    const story = storyFn();
    story.components = story.components || [];
    story.components.push(...components);
    return Object.assign(Object.assign({}, story), { components });
};
exports.addContainer = (container) => (storyFn) => {
    const story = storyFn();
    return Object.assign(Object.assign({}, story), { container });
};
