"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpack = webpack;

var _createForkTsCheckerPlugin = _interopRequireDefault(require("./create-fork-ts-checker-plugin"));

var _ts_config = _interopRequireDefault(require("./ts_config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function webpack(config, {
  configDir: configDir
}) {
  var tsLoaderOptions = (0, _ts_config.default)(configDir);
  return _objectSpread(_objectSpread({}, config), {}, {
    resolve: _objectSpread(_objectSpread({}, config.resolve), {}, {
      extensions: [...config.resolve.extensions, '.ts', '.js'],
      modules: [...config.resolve.modules, 'src', 'node_modules'],
      fallback: _objectSpread(_objectSpread({}, config.resolve.fallback || {}), {}, {
        os: require.resolve('os-browserify/browser')
      })
    }),
    module: _objectSpread(_objectSpread({}, config.module), {}, {
      rules: [...config.module.rules, {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset'
      }, {
        test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        type: 'asset'
      }, // this causes a bug with MiniCssExtractPlugin used by Storybook

      /* {
        test: /\.css$/i,
        use: [require.resolve('style-loader'), require.resolve('css-loader')],
      }, */
      {
        test: /\.scss$/i,
        use: [require.resolve('style-loader'), require.resolve('css-loader'), require.resolve('sass-loader')]
      }, {
        test: /\.ts$/i,
        use: [require.resolve('ts-loader'), require.resolve('@aurelia/webpack-loader')],
        exclude: /node_modules/
      }, {
        test: /\.html$/i,
        use: require.resolve('@aurelia/webpack-loader'),
        exclude: /node_modules/
      }]
    }),
    plugins: [...config.plugins, (0, _createForkTsCheckerPlugin.default)(tsLoaderOptions)]
  });
}