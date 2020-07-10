import { PageHead } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './DashboardCardHeader.module.css';

const DashboardCardHeader = ({ title, children, isActionStacked = false }) => (
  <div
    className={classNames(styles.header, {
      [styles.isActionStacked]: isActionStacked,
    })}
  >
    <PageHead title={title}>{children}</PageHead>
  </div>
);

export default DashboardCardHeader;
