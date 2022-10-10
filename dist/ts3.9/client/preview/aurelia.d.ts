import { Aurelia } from 'aurelia';
import { StoryFnAureliaReturnType, AureliaFramework } from './types';
export declare function createComponentTemplate(component: AureliaFramework['component'], innerHtml: string): string;
export declare function createAureliaApp(story: StoryFnAureliaReturnType, component: AureliaFramework['component'], args: Record<string, any>, domElement: HTMLElement): Partial<Aurelia>;
