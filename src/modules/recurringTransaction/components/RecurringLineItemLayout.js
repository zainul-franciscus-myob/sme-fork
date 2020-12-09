import { Separator } from '@myob/myob-widgets';
import React from 'react';

import styles from './RecurringLineItemLayout.module.css';

const RecurringLineItemLayout = ({ options, tableLayoutOption, table }) => (
  <>
    {options}
    <div className={styles.separator}>
      <Separator />
      {tableLayoutOption}
    </div>
    {table}
  </>
);

export default RecurringLineItemLayout;
