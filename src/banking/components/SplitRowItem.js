import React from 'react';

import AllocatedButton from './AllocatedButton';
import styles from './SplitRowItem.module.css';

const SplitRowItem = ({ entry, onClick }) => (
  <div className={styles.splitAllocation}>
    <div className={styles.splitInfo}>
      <AllocatedButton onClick={onClick}>
        {entry.allocateOrMatch}
      </AllocatedButton>
    </div>
  </div>
);

export default SplitRowItem;
