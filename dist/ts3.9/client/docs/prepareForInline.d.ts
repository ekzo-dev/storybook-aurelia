import React from 'react';
import type { StoryContext, PartialStoryFn } from '@storybook/csf';
import { AureliaFramework } from '../preview';
export declare const prepareForInline: (storyFn: PartialStoryFn<AureliaFramework>, { args, component }: StoryContext<AureliaFramework>) => React.DetailedReactHTMLElement<React.HTMLAttributes<undefined>, undefined>;
