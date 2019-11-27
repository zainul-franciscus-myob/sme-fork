import { PageHead } from '@myob/myob-widgets';
import React from 'react';

import styles from './DashboardCardHeader.module.css';

const DashboardCardHeader = ({ title, children }) => (
  <div className={styles.header}>
    <PageHead title={title}>
      {children}
    </PageHead>
  </div>
);

export default DashboardCardHeader;
