import React, { useRef, useEffect } from 'react';
import { createAureliaApp } from '../helpers';
export const prepareForInline = (storyFn, {
  args,
  component
}) => {
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
  return /*#__PURE__*/React.createElement('div', {
    ref: el
  });
};