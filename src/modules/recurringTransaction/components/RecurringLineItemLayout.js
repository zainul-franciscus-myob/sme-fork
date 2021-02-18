import { Separator } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import styles from './RecurringLineItemLayout.module.css';

const RecurringLineItemLayout = ({
  options,
  tableLayoutOption,
  table,
  isReadOnly,
}) => (
  <>
    {options}
    <div className={styles.separator}>
      <Separator />
      {tableLayoutOption}
    </div>
    <div className={classNames(isReadOnly && styles.disabledTable)}>
      {table}
    </div>
  </>
);

export default RecurringLineItemLayout;
