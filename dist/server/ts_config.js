"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable func-names */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const node_logger_1 = require("@storybook/node-logger");
function resolveTsConfig(tsConfigPath) {
    if (fs_1.default.existsSync(tsConfigPath)) {
        node_logger_1.logger.info('=> Found custom tsconfig.json');
        return tsConfigPath;
    }
    return undefined;
}
function default_1(configDir) {
    const configFilePath = resolveTsConfig(path_1.default.resolve(configDir, 'tsconfig.json'));
    return {
        transpileOnly: true,
        configFile: configFilePath || undefined,
    };
}
exports.default = default_1;
