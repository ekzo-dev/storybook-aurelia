"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewAnnotations = void 0;
const path_1 = __importDefault(require("path"));
const docs_tools_1 = require("@storybook/docs-tools");
exports.previewAnnotations = (entry = [], options) => {
    if (!docs_tools_1.hasDocsOrControls(options))
        return entry;
    return [...entry, path_1.default.join(__dirname, '../../../dist/cjs/client/docs/config')];
};
