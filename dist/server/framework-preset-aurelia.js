"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpack = void 0;
const create_fork_ts_checker_plugin_1 = __importDefault(require("./create-fork-ts-checker-plugin"));
const ts_config_1 = __importDefault(require("./ts_config"));
function webpack(config, { configDir }) {
    const tsLoaderOptions = ts_config_1.default(configDir);
    return Object.assign(Object.assign({}, config), { resolve: Object.assign(Object.assign({}, config.resolve), { extensions: [...config.resolve.extensions, '.ts', '.js'], modules: [...config.resolve.modules, 'src', 'node_modules'], fallback: Object.assign(Object.assign({}, (config.resolve.fallback || {})), { os: require.resolve('os-browserify/browser') }) }), module: Object.assign(Object.assign({}, config.module), { rules: [
                ...config.module.rules,
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset',
                },
                {
                    test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                    type: 'asset',
                },
                {
                    test: /\.css$/i,
                    use: [require.resolve('style-loader'), require.resolve('css-loader')],
                },
                {
                    test: /\.scss$/i,
                    use: [
                        require.resolve('style-loader'),
                        require.resolve('css-loader'),
                        require.resolve('sass-loader'),
                    ],
                },
                {
                    test: /\.ts$/i,
                    use: [require.resolve('ts-loader'), require.resolve('@aurelia/webpack-loader')],
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/i,
                    use: require.resolve('@aurelia/webpack-loader'),
                    exclude: /node_modules/,
                },
            ] }), plugins: [...config.plugins, create_fork_ts_checker_plugin_1.default(tsLoaderOptions)] });
}
exports.webpack = webpack;
