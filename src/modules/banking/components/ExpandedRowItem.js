import React from 'react';

import styles from './ExpandedRowItem.module.css';

const ExpandedRowItem = ({ entry }) => (
  <div title={entry.allocateOrMatch} className={styles.expanded}>
    {entry.allocateOrMatch}
  </div>
);

export default ExpandedRowItem;
