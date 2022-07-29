import type { RenderContext } from '@storybook/store';
import { AureliaFramework } from './types';
export declare function renderToDOM({ storyFn, kind, name, showMain, showError, forceRemount, storyContext: { parameters, component }, }: RenderContext<AureliaFramework>, domElement: HTMLElement): Promise<void>;
