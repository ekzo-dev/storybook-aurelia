"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addons = exports.previewAnnotations = void 0;
exports.previewAnnotations = (entries = []) => [
    ...entries,
];
exports.addons = [
    require.resolve('./framework-preset-aurelia'),
    require.resolve('./framework-preset-aurelia-docs'),
];
