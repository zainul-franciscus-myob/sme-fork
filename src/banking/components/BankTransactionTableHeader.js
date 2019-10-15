import {
  Card, Checkbox, HeaderSort,
} from '@myob/myob-widgets';
import React from 'react';

import styles from './BankTransactionTable.module.css';

const BankTransactionTableHeaderColumn = ({
  title,
  sortName,
  activeSort,
  onSort,
  className,
}) => (
  <div className={className}>
    <HeaderSort
      title={title}
      sortName={sortName}
      activeSort={activeSort}
      onSort={onSort}
    />
  </div>
);

const BankTransactionTableHeader = ({
  onSelectAllTransactions,
  bulkSelectStatus,
  isBulkLoading,
  onSort,
  order,
}) => (
  <Card classes={[styles.header]}>
    <div className={styles.columns}>
      <div className={styles.selectionColumn}>
        <Checkbox
          name="bulkSelect"
          label="Bulk select"
          hideLabel
          onChange={onSelectAllTransactions}
          checked={bulkSelectStatus === 'checked'}
          indeterminate={bulkSelectStatus === 'indeterminate'}
          disabled={isBulkLoading}
        />
      </div>
      <div className={styles.infoColumn}>
        <BankTransactionTableHeaderColumn
          title="Date"
          className={styles.date}
          sortName="Date"
          activeSort={order}
          onSort={onSort}
        />
        <div className={styles.description}>
          <BankTransactionTableHeaderColumn
            title="Bank statement description"
            sortName="Description"
            activeSort={order}
            onSort={onSort}
          />
          <BankTransactionTableHeaderColumn
            title="Withdrawal ($)"
            sortName="Withdrawal"
            className={styles.withdrawalOrDeposit}
            activeSort={order}
            onSort={onSort}
          />
          <BankTransactionTableHeaderColumn
            title="Deposit ($)"
            sortName="Deposit"
            className={styles.withdrawalOrDeposit}
            activeSort={order}
            onSort={onSort}
          />
        </div>
      </div>
      <div className={styles.allocationColumn}>
        <BankTransactionTableHeaderColumn
          title="Match or allocate"
          className={styles.matchOrAllocate}
          sortName="AllocateOrMatch"
          activeSort={order}
          onSort={onSort}
        />
        <BankTransactionTableHeaderColumn
          title="Tax"
          className={styles.taxCode}
          sortName="TaxCode"
          activeSort={order}
          onSort={onSort}
        />
      </div>
    </div>
  </Card>
);

export default BankTransactionTableHeader;
