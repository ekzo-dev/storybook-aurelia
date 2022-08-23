import { Aurelia } from 'aurelia';
import { StoryFnAureliaReturnType, AureliaFramework } from './types';
export declare function createAureliaApp(story: StoryFnAureliaReturnType, component: AureliaFramework['component'], args: Record<string, any>, domElement: HTMLElement): Partial<Aurelia>;
