import { HeaderSort, Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading, getOrder,
} from '../transactionListSelectors';
import TransactionListTableBody from './TransactionListTableBody';
import style from './TransactionListView.css';

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

const TransactionListTable = ({
  isTableEmpty,
  isTableLoading,
  businessId,
  tableConfig,
  onSort,
  order,
}) => {
  let view;
  if (isTableLoading) {
    view = spinnerView;
  } else if (isTableEmpty) {
    view = emptyView;
  } else {
    view = (
      <TransactionListTableBody
        businessId={businessId}
        tableConfig={tableConfig}
      />
    );
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.date}>
          <HeaderSort title="Date" sortName="date" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.referenceId}>Reference </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.description}>Description </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.sourceJournal}>Source Journal </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.displayAmount}>Amount ($)</Table.HeaderItem>
      </Table.Header>
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(TransactionListTable);
