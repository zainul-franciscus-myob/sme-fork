import { Card, ReadOnly } from '@myob/myob-widgets';
import React from 'react';

import styles from './PayHeader.module.css';

const PayHeader = ({ items }) => {
  const domItems = items.map((item) => (
    <ReadOnly label={item.label} name={item.name} key={item.name}>
      <span className={styles.headerValue}>{item.value}</span>
    </ReadOnly>
  ));
  return (
    <Card>
      <div className={styles.employeesHeader}>{domItems}</div>
    </Card>
  );
};

export default PayHeader;
