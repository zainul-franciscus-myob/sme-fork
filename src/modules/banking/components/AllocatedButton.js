import React from 'react';

import FocusWrapper from './FocusWrapper';
import styles from './AllocatedButton.module.css';

const AllocatedButton = ({ children, isFocused, ...props }) => {
  return (
    <FocusWrapper isFocused={isFocused}>
      {(ref) => (
        <button
          ref={ref}
          type="button"
          className={styles.allocateButton}
          {...props}
        >
          {children}
        </button>
      )}
    </FocusWrapper>
  );
};

export default AllocatedButton;
