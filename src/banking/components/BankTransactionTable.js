import { Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading,
} from '../bankingSelectors';
import BankTransactionTableBody from './BankTransactionTableBody';
import style from './BankingView.css';

const tableConfig = {
  date: { width: '11rem', valign: 'middle' },
  description: { width: 'flex-1', valign: 'middle' },
  withdrawal: { width: '13rem', align: 'right', valign: 'middle' },
  deposit: { width: '13rem', align: 'right', valign: 'middle' },
  allocateOrMatch: { width: '28rem', columnName: 'allocateOrMatch' },
};

const emptyView = (
  <div className={style.empty}>
    There are no transactions for the selected filter options.
  </div>
);

const spinnerView = (
  <div className={style.spinner}>
    <Spinner size="medium" />
  </div>
);

const BankTransactionTable = ({
  isTableEmpty,
  isTableLoading,
  onMatchedToBlur,
  onMatchedToFocus,
  onUnmatchedFocus,
  onUnmatchedBlur,
  onAllocate,
  onUnallocate,
}) => {
  let view;
  if (isTableLoading) {
    view = spinnerView;
  } else if (isTableEmpty) {
    view = emptyView;
  } else {
    view = (
      <BankTransactionTableBody
        tableConfig={tableConfig}
        onMatchedToBlur={onMatchedToBlur}
        onMatchedToFocus={onMatchedToFocus}
        onAllocate={onAllocate}
        onUnallocate={onUnallocate}
        onUnmatchedFocus={onUnmatchedFocus}
        onUnmatchedBlur={onUnmatchedBlur}
      />
    );
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.date}>Date</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.description}>Description </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.withdrawal}>Withdrawal ($)</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.deposit}>Deposit ($)</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.allocateOrMatch} columnName="allocateOrMatchHeader">
          Allocate or Match
        </Table.HeaderItem>
      </Table.Header>
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(BankTransactionTable);
