import { Configuration } from 'webpack';
import createForkTsCheckerInstance from './create-fork-ts-checker-plugin';
import getTsLoaderOptions from './ts_config';

export function webpack(
  config: Configuration,
  { configDir }: { configDir: string }
): Configuration {
  const tsLoaderOptions = getTsLoaderOptions(configDir);
  return {
    ...config,
    resolve: {
      ...config.resolve,
      extensions: [...config.resolve.extensions, '.ts', '.js'],
      modules: [...config.resolve.modules, 'src', 'node_modules'],
      fallback: {
        ...(config.resolve.fallback || {}),
        os: require.resolve('os-browserify/browser'),
      },
    },
    module: {
      ...config.module,
      rules: [
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
      ],
    },
    plugins: [...config.plugins, createForkTsCheckerInstance(tsLoaderOptions)],
  };
}
