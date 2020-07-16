import { LineItemTable } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './TotalsContainer.module.css';

const TotalsContainer = ({ children, className }) => (
  <div className={classNames(styles.totals, className)}>
    <LineItemTable.Total>{children}</LineItemTable.Total>
  </div>
);

export default TotalsContainer;
