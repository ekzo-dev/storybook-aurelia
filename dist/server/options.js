"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_pkg_up_1 = require("read-pkg-up");
exports.default = {
    packageJson: read_pkg_up_1.sync({ cwd: __dirname }).packageJson,
    framework: 'aurelia',
    frameworkPresets: [require.resolve('./preset')],
};
