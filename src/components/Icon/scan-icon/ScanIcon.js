import { InvoiceLgIcon } from '@myob/myob-widgets';
import React from 'react';

import styles from './ScanIcon.module.css';

const ScanIcon = ({ className }) => (
  <div className={styles.icon || className}>
    <div className={styles.bar} />
    <InvoiceLgIcon />
  </div>
);

export default ScanIcon;
