/**
 * @author
 * Tony.Tang
 * @description
 * Feelix 5.12 removed border around the left onMove icon
 * This makes it look like padding, so things are not aligned
 * To fix this, this component hides icon
 */
import React from 'react';

import styles from './NoMoveWrapper.module.css';

const NoMoveWrapper = ({ children }) => (
  <div className={styles.noMoveWrapper}>
    {children}
  </div>
);

export default NoMoveWrapper;
