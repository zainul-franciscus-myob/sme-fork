import React from 'react';
import classnames from 'classnames';

import styles from './SummaryHeader.module.css';

const SummaryHeaderItem = ({ label, value, right, className }) => (
  <div
    className={classnames(styles.item, className, {
      [styles.itemRight]: right,
    })}
  >
    <strong>{label}</strong>
    <div>{value}</div>
  </div>
);

export default SummaryHeaderItem;
