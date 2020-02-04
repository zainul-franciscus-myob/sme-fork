import React from 'react';

import styles from './AllocatedButton.module.css';

export default ({ children, ...props }) => (
  <button
    type="button"
    className={styles.allocateButton}
    {...props}
  >
    {children}
  </button>
);
