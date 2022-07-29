import type { DecoratorFunction } from '@storybook/csf';
import { IContainer, ICustomElementViewModel, IRegistry } from 'aurelia';
import { AureliaFramework } from './types';
export declare const addRegistries: <TArgs = any>(...items: IRegistry[]) => DecoratorFunction<AureliaFramework, TArgs>;
export declare const addComponents: <TArgs = any>(...components: ICustomElementViewModel[]) => DecoratorFunction<AureliaFramework, TArgs>;
export declare const addContainer: <TArgs = any>(container: IContainer) => DecoratorFunction<AureliaFramework, TArgs>;
