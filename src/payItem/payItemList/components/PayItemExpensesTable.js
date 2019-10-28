import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getExpensesOrder, getIsExpensesTableEmpty, getIsTableLoading } from '../PayItemListSelectors';
import EmptyView from './EmptyView';
import ExpensesTableBody from './PayItemExpensesTableBody';
import TableView from '../../../components/TableView/TableView';

const PayItemExpensesTable = ({
  order,
  listeners: { onSortExpensesList },
  isTableLoading,
  isExpensesTableEmpty,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem>
        <HeaderSort title="Pay item name" sortName="Name" activeSort={order} onSort={onSortExpensesList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="Calculation basis" sortName="DisplayType" activeSort={order} onSort={onSortExpensesList} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isExpensesTableEmpty}
      emptyView={<EmptyView payItem="expenses" />}
    >
      <ExpensesTableBody />
    </TableView>
  );
};

const mapStateToProps = state => ({
  order: getExpensesOrder(state),
  isTableLoading: getIsTableLoading(state),
  isExpensesTableEmpty: getIsExpensesTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemExpensesTable);
