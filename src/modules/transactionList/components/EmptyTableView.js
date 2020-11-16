import { PageState } from '@myob/myob-widgets';
import React from 'react';

import TransactionEmptyStateIcon from './TransactionEmptyStateIcon';
import styles from './EmptyTableView.module.css';

const EmptyTableView = () => (
  <PageState
    title="Record your first transaction"
    description="Create transactions to record sales, invoices, or general journal entries."
    image={
      <TransactionEmptyStateIcon
        className={styles.icon}
        alt="Record your first transaction."
      />
    }
  />
);

export default EmptyTableView;
