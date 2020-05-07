import React from 'react';
import classNames from 'classnames';

import styles from './BillTableReadOnlyRowItem.module.css';

const BillTableReadOnlyRowItem = ({ value, className }) => (
  <div className={classNames(styles.readonly, className)}>{value}</div>
);

export default BillTableReadOnlyRowItem;
