import type { RenderContext } from '@storybook/store';
import { AureliaFramework } from './types';
/**
 * If props are retrieved from address bar, they are strings. Need to convert to actual types (Boolean/Number)
 * @param component
 * @param props
 */
export declare function renderToDOM({ storyFn, kind, name, showMain, showError, forceRemount, storyContext: { parameters, component }, }: RenderContext<AureliaFramework>, domElement: HTMLElement): Promise<void>;
