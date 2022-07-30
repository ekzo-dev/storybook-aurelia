import type { StorybookConfig } from '@storybook/core-common';

export const previewAnnotations: StorybookConfig['previewAnnotations'] = (entries = []) => [
  ...entries,
  // Not sure if we need this for Aurelia? I've otherwise copied the rest of this file from the angular stuff
  // require.resolve('../client/preview/config'),
];

export const addons: StorybookConfig['addons'] = [
  require.resolve('./framework-preset-aurelia'),
  require.resolve('./framework-preset-aurelia-docs'),
];
