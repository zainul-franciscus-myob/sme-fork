import React from 'react';
import classNames from 'classnames';

import styles from './PurchaseOrderTableReadOnlyRowItem.module.css';

const PurchaseOrderTableReadOnlyRowItem = ({ value, className }) => (
  <div className={classNames(styles.readonly, className)}>{value}</div>
);

export default PurchaseOrderTableReadOnlyRowItem;
