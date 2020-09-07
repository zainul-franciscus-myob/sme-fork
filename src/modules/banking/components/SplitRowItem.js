import React from 'react';

import AllocatedButton from './AllocatedButton';
import AutoAllocated from './AutoAllocated';
import styles from './SplitRowItem.module.css';

const SplitRowItem = ({ entry, ...props }) => (
  <div className={styles.splitAllocation}>
    <div className={styles.splitInfo}>
      {entry.isRuleApplied && <AutoAllocated />}
      <AllocatedButton {...props}>{entry.allocateOrMatch}</AllocatedButton>
    </div>
  </div>
);

export default SplitRowItem;
