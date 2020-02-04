import { Icons, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import styles from './AutoAllocated.module.css';

const AutoAllocated = () => (
  <Tooltip
    className={styles.wand}
    triggerContent={<Icons.AutoAllocation />}
  >
    This transaction has been automatically allocated based on your bank feed rules
  </Tooltip>
);

export default AutoAllocated;
