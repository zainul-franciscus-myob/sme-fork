import React, { useEffect, useRef } from 'react';

const FocusWrapper = ({ children, isFocused }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (isFocused && ref.current) {
      ref.current.focus();
    }
  }, [isFocused]);

  return <>{children(ref)}</>;
};

export default FocusWrapper;
