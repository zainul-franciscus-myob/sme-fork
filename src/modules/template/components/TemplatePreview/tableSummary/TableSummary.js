import React from 'react';
import classnames from 'classnames';

import styles from './TableSummary.module.css';

const summaryAmountClassMapping = {
  total: styles['summaryAmount--total'],
  normal: styles['summaryAmount--normal'],
  large: styles['summaryAmount--large'],
};

const TableSummaryAmount = ({
  title,
  titleAccessory,
  amount,
  type = 'normal',
}) => (
  <div
    className={classnames(
      styles.summaryAmount,
      summaryAmountClassMapping[type]
    )}
  >
    <div className={styles.summaryAmountTitle}>
      <span>{title}</span>
      {titleAccessory && (
        <span className={styles.summaryAmountTitleAccessory}>
          {titleAccessory}
        </span>
      )}
    </div>
    <div className={styles.summaryAmountAmount}>
      <span>{amount}</span>
    </div>
  </div>
);

const TableSummary = ({ summary, description }) => (
  <div className={styles.summary}>
    <div className={styles.notes}>
      <div className={styles.notesContainer}>
        <h4>Notes</h4>
        <p>{description}</p>
      </div>
    </div>
    <div className={styles.totals}>
      {summary.map(({ title, titleAccessory, amount, type }) => (
        <TableSummaryAmount
          title={title}
          titleAccessory={titleAccessory}
          amount={amount}
          type={type}
        />
      ))}
    </div>
  </div>
);

export default TableSummary;
