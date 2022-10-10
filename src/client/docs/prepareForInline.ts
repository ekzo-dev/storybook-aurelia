import React, { useRef, useEffect } from 'react';
import type { StoryContext, PartialStoryFn } from '@storybook/csf';
import { AureliaFramework } from '../preview';
import { createAureliaApp } from '../preview/aurelia';

export const prepareForInline = (
  storyFn: PartialStoryFn<AureliaFramework>,
  { args, component }: StoryContext<AureliaFramework>
) => {
  const story = storyFn();
  const el = useRef();

  useEffect(() => {
    const au = createAureliaApp(story, component, args, el.current);
    (async () => {
      await au.start();
    })();

    return () => {
      (async () => {
        await au.stop();
      })();
    };
  });

  return React.createElement('div', { ref: el });
};
