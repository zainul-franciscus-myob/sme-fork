import React from 'react';
import classNames from 'classnames';

import styles from './QuoteTableReadOnlyRowItem.module.css';

const QuoteTableReadOnlyRowItem = ({ value, className }) => (
  <div className={classNames(styles.readonly, className)}>{value}</div>
);

export default QuoteTableReadOnlyRowItem;
