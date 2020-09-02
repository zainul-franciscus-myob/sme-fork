import React, { useEffect, useRef } from 'react';

const HotkeyWrapper = ({ children, ...props }) => {
  const ref = useRef(null);
  useEffect(() => {
    /*
      We use .addEventListener as we want to directly listen to the browser events and not
      Synthentic events populated by React. This is to allow us to add information
      to the browser event as `hotkeys-js` is listening for browser events.
    */
    const node = ref.current;
    const onKeyDown = (event) => {
      // eslint-disable-next-line no-param-reassign
      event.hotkeyDetails = props;
    };
    node.addEventListener('keydown', onKeyDown);

    return () => node.removeEventListener('keydown', onKeyDown);
  }, [props]);

  return <div ref={ref}>{children}</div>;
};

export default HotkeyWrapper;
