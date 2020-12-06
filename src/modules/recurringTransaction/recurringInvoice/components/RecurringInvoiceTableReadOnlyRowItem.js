import React from 'react';
import classNames from 'classnames';

import styles from './RecurringInvoiceTableReadOnlyRowItem.module.css';

const RecurringInvoiceTableReadOnlyRowItem = ({ value, className }) => (
  <div className={classNames(styles.readonly, className)}>{value}</div>
);

export default RecurringInvoiceTableReadOnlyRowItem;
