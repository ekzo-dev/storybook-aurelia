import type { SBType } from '@storybook/csf';
import type { Component } from '@storybook/docs-tools';
export declare type ComponentAstData = Record<string, {
    defaultValue: any;
    comment?: string;
}>;
export declare const getComponentBindables: (component: Component) => import("@aurelia/runtime-html").BindableDefinition[];
export declare const getComponentAstData: (component: Component, properties: string[]) => ComponentAstData;
export declare const getPropertyType: (component: Component, property: string) => SBType['name'] | undefined;
export declare const getTypeFromValue: (value: any) => SBType['name'];
