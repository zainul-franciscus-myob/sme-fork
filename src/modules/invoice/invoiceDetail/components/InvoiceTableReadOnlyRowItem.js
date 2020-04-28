import React from 'react';
import classNames from 'classnames';

import styles from './InvoiceTableReadOnlyRowItem.module.css';

const InvoiceTableReadOnlyRowItem = ({ value, className }) => (
  <div className={classNames(styles.readonly, className)}>{value}</div>
);

export default InvoiceTableReadOnlyRowItem;
