import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import styles from './AllocatedLoadingItem.module.css';

export default ({
  displayName,
}) => (
  <div className={styles.loadingItem}>
    {displayName}
    <Spinner size="small" />
  </div>
);
