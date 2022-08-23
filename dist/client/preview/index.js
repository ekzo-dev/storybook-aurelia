"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.raw = exports.getStorybook = exports.forceReRender = exports.setAddon = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.configure = exports.storiesOf = void 0;
const core_1 = require("@storybook/core");
require("./globals");
const render_1 = require("./render");
const framework = 'Aurelia';
const api = core_1.start(render_1.renderToDOM);
exports.storiesOf = (kind, m) => {
    return api.clientApi.storiesOf(kind, m).addParameters({
        framework,
    });
};
exports.configure = (...args) => api.configure(framework, ...args);
exports.addDecorator = api.clientApi
    .addDecorator;
exports.addParameters = api.clientApi
    .addParameters;
exports.clearDecorators = api.clientApi.clearDecorators;
exports.setAddon = api.clientApi.setAddon;
exports.forceReRender = api.forceReRender;
exports.getStorybook = api.clientApi.getStorybook;
exports.raw = api.clientApi.raw;
__exportStar(require("./decorators"), exports);
__exportStar(require("./types"), exports);
