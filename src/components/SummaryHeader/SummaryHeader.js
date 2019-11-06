import React from 'react';
import classnames from 'classnames';

import styles from './SummaryHeader.module.css';

const SummaryHeader = ({
  left, right, children, className,
}) => {
  if (children) {
    return (
      <div className={classnames(styles.container, className)}>
        <div className={styles.left}>{children}</div>
      </div>
    );
  }
  return (
    <div className={classnames(styles.container, className)}>
      {left && <div className={styles.left}>{left}</div>}
      {right && <div className={styles.right}>{right}</div>}
    </div>
  );
};

export default SummaryHeader;
