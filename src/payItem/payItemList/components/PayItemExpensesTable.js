import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getExpensesOrder, getIsExpensesTableEmpty, getIsTableLoading } from '../PayItemListSelectors';
import EmptyView from './EmptyView';
import ExpensesTableBody from './PayItemExpensesTableBody';
import TableSpinner from './TableSpinner';

const PayItemExpensesTable = ({
  order,
  listeners: { onSortExpensesList },
  isTableLoading,
  isExpensesTableEmpty,
}) => {
  let view;
  if (isTableLoading) {
    view = <TableSpinner />;
  } else if (isExpensesTableEmpty) {
    view = <EmptyView payItem="expenses" />;
  } else {
    view = <ExpensesTableBody />;
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem>
          <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSortExpensesList} />
        </Table.HeaderItem>
        <Table.HeaderItem>
          <HeaderSort title="Type" sortName="Type" activeSort={order} onSort={onSortExpensesList} />
        </Table.HeaderItem>
      </Table.Header>
      { view }
    </Table>
  );
};

const mapStateToProps = state => ({
  order: getExpensesOrder(state),
  isTableLoading: getIsTableLoading(state),
  isExpensesTableEmpty: getIsExpensesTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemExpensesTable);
