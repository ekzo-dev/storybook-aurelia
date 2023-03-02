import { Aurelia } from 'aurelia';
import { CustomAttributeDefinition, CustomElementDefinition } from '@aurelia/runtime-html';
import { AureliaFramework, StoryFnAureliaReturnType } from './preview';
export declare const getComponentDefinition: (component: AureliaFramework['component']) => CustomElementDefinition | CustomAttributeDefinition;
export declare function createComponentTemplate(component: AureliaFramework['component'], innerHtml?: string): string;
export declare function createAureliaApp(story: StoryFnAureliaReturnType, component: AureliaFramework['component'], args: Record<string, any>, domElement: HTMLElement): Partial<Aurelia>;
