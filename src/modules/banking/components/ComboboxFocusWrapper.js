import React, { useEffect, useRef } from 'react';

const ComboboxFocusWrapper = ({ children, isFocused }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (isFocused && ref.current && ref.current.getElementsByTagName) {
      const input = ref.current.getElementsByTagName('input')[0];

      if (input) {
        input.focus();
      }
    }
  }, [isFocused]);

  return <div ref={ref}>{children}</div>;
};

export default ComboboxFocusWrapper;
