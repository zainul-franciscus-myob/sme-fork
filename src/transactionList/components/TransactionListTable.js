import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading, getOrder,
} from '../transactionListSelectors';
import TableView from '../../components/TableView/TableView';
import TransactionListTableBody from './TransactionListTableBody';

const tableConfig = {
  date: { width: '11rem', valign: 'top' },
  referenceId: { width: '13rem', valign: 'top' },
  description: { width: 'flex-1', valign: 'top' },
  sourceJournal: { width: '15.5rem', valign: 'top' },
  displayAmount: { width: '12.4rem', valign: 'top', align: 'right' },
};

const TransactionListTable = ({
  isTableEmpty,
  isTableLoading,
  businessId,
  onSort,
  order,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort title="Date" sortName="Date" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.referenceId}>
        <HeaderSort title="Reference no" sortName="Reference" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        <HeaderSort title="Description" sortName="Description" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.sourceJournal}>
        <HeaderSort title="Source journal" sortName="SourceJournal" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.displayAmount}>
        <HeaderSort title="Amount ($)" sortName="Amount" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyMessage="There are no transactions for the selected filter options."
    >
      <TransactionListTableBody
        businessId={businessId}
        tableConfig={tableConfig}
      />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(TransactionListTable);
