export var previewAnnotations = function (entries = []) {
  return [...entries // Not sure if we need this for Aurelia? I've otherwise copied the rest of this file from the angular stuff
  // require.resolve('../client/preview/config'),
  ];
};
export var addons = [require.resolve('./framework-preset-aurelia')];