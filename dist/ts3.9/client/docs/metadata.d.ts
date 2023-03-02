import type { SBType } from '@storybook/csf';
import type { Component } from '@storybook/docs-tools';
import { PartialBindableDefinition } from 'aurelia';
export declare type ComponentAstData = Record<string, {
    defaultValue: any;
    comment?: string;
}>;
export declare const getComponentAstData: (component: Component, properties: string[]) => ComponentAstData;
export declare const getBindableType: (component: Component, bindable: PartialBindableDefinition) => SBType['name'] | undefined;
