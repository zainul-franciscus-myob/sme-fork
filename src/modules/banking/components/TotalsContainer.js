import { LineItemTable } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './TotalsContainer.module.css';

const TotalsContainer = ({ children, className }) => (
  <LineItemTable.Total className={classNames(styles.totals, className)}>
    {children}
  </LineItemTable.Total>
);

export default TotalsContainer;
