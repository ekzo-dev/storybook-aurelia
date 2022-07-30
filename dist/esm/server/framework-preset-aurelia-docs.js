import path from 'path';
import { hasDocsOrControls } from '@storybook/docs-tools';
export var previewAnnotations = function (entry = [], options) {
  if (!hasDocsOrControls(options)) return entry;
  return [...entry, path.join(__dirname, '../../../dist/cjs/client/docs/config')];
};