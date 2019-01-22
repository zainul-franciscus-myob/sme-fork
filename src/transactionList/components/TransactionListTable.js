import { HeaderSort, Spinner, Table } from '@myob/myob-widgets';
import React from 'react';

import TransactionListTableBody from './TransactionListTableBody';
import style from './TransactionListView.css';

const emptyView = (
  <div className={style.empty}>
    There are no transactions for the selected filter options.
  </div>
);

const TableBody = ({
  isTableEmpty,
  isTableLoading,
  businessId,
  tableConfig,
}) => {
  let view;
  if (isTableLoading) {
    view = (
      <div className={style.spinner}>
        <Spinner size="medium" />
      </div>
    );
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
  return view;
};

const TransactionListTable = (props) => {
  const {
    isTableEmpty,
    isTableLoading,
    businessId,
    tableConfig,
    onSort,
    order,
  } = props;

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
      <TableBody
        isTableEmpty={isTableEmpty}
        isTableLoading={isTableLoading}
        businessId={businessId}
        tableConfig={tableConfig}
      />
    </Table>
  );
};

export default TransactionListTable;
