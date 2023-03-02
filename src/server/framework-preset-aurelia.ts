import { Configuration } from 'webpack';
import type { Options, ManagerWebpackOptions } from '@storybook/core-common';
// eslint-disable-next-line import/no-extraneous-dependencies
import TerserWebpackPlugin from 'terser-webpack-plugin';
import createForkTsCheckerInstance from './create-fork-ts-checker-plugin';
import getTsLoaderOptions from './ts_config';

export function webpack(
  config: Configuration,
  { configDir, configType }: Options & ManagerWebpackOptions
): Configuration {
  const tsLoaderOptions = getTsLoaderOptions(configDir);
  const production = configType === 'PRODUCTION';

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
        // storybook already has loaders for images/fonts/css
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
    optimization: {
      ...config.optimization,
      minimizer: production
        ? [
            new TerserWebpackPlugin({
              parallel: true,
              terserOptions: {
                mangle: false,
                sourceMap: true,
                keep_fnames: true,
                compress: {
                  // don't compress booleans, otherwise default value detection breaks
                  booleans: false,
                },
              },
            }),
          ]
        : [],
    },
  };
}
