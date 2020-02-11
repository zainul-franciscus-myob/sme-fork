import React from 'react';
import classNames from 'classnames';

import styles from './StickyHeader.module.css';

const StickyHeader = ({ children, className, reference }) => (
  <div ref={reference} className={classNames(styles.stickyHeader, className)}>
    {children}
  </div>
);

export default StickyHeader;
