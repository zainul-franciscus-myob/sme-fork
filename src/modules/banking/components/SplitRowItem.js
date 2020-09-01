import React from 'react';

import AllocatedButton from './AllocatedButton';
import AutoAllocated from './AutoAllocated';
import styles from './SplitRowItem.module.css';

const SplitRowItem = ({ entry, onClick }) => (
  <div className={styles.splitAllocation}>
    <div className={styles.splitInfo}>
      {entry.isRuleApplied && <AutoAllocated />}
      <AllocatedButton onClick={onClick}>
        {entry.allocateOrMatch}
      </AllocatedButton>
    </div>
  </div>
);

export default SplitRowItem;
