import React from 'react';
import classNames from 'classnames';

import styles from './RecurringBillTableReadOnlyRowItem.module.css';

const RecurringBillTableReadOnlyRowItem = ({ value, className }) => (
  <div className={classNames(styles.readonly, className)}>{value}</div>
);

export default RecurringBillTableReadOnlyRowItem;
