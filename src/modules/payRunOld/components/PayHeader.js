import { ReadOnly } from '@myob/myob-widgets';
import React from 'react';

import FormCard from '../../../components/FormCard/FormCard';
import styles from './PayHeader.module.css';

const PayHeader = ({ items }) => {
  const domItems = items.map(item => (
    <ReadOnly label={item.label} name={item.name} key={item.name}>
      <h3>{item.value}</h3>
    </ReadOnly>
  ));
  return (
    <FormCard>
      <div className={styles.employeesHeader}>
        {domItems}
      </div>
    </FormCard>
  );
};

export default PayHeader;
