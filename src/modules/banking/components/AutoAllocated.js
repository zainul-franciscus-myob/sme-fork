import { Icons, Tooltip } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './AutoAllocated.module.css';

const AutoAllocated = ({ className = '' }) => (
  <Tooltip
    className={classNames(styles.wand, className)}
    triggerContent={<Icons.AutoAllocation />}
  >
    This transaction has been automatically allocated based on your bank feed rules
  </Tooltip>
);

export default AutoAllocated;
