import { HeaderSort, Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading, getOrder } from '../bankingSelectors/matchTransactionSelectors';
import MatchTransactionTableBody from './MatchTransactionTableBody';
import styles from './BankingView.module.css';

const tableConfig = {
  radioButton: { width: '4rem', valign: 'top' },
  date: { width: '11rem', valign: 'top' },
  referenceId: { width: '12.4rem', valign: 'top' },
  description: { width: 'flex-1', valign: 'top' },
  amount: { width: '15rem', valign: 'top', align: 'right' },
};

const emptyView = (
  <div className={styles.openEntryEmpty}>
    No results.
  </div>
);

const spinnerView = (
  <div className={styles.bankingTableSpinner}>
    <Spinner size="medium" />
  </div>
);

const MatchTransactionTable = (props) => {
  const {
    isTableEmpty,
    isTableLoading,
    order,
    onSortMatchTransactions,
    onUpdateMatchTransactionSelection,
  } = props;

  let view;
  if (isTableLoading) {
    view = spinnerView;
  } else if (isTableEmpty) {
    view = emptyView;
  } else {
    view = (
      <MatchTransactionTableBody
        tableConfig={tableConfig}
        onUpdateMatchTransactionSelection={onUpdateMatchTransactionSelection}
      />
    );
  }

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.radioButton} />
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort title="Date" sortName="DateOccurred" activeSort={order} onSort={onSortMatchTransactions} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.referenceId}>
        <HeaderSort title="Reference" sortName="DisplayId" activeSort={order} onSort={onSortMatchTransactions} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        <HeaderSort title="Description" sortName="Description" activeSort={order} onSort={onSortMatchTransactions} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        <HeaderSort title="Amount ($)" sortName="Amount" activeSort={order} onSort={onSortMatchTransactions} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <Table>
      {header}
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(MatchTransactionTable);
