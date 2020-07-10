import { Button, HeaderSort, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getExpensesOrder,
  getIsExpensesTableEmpty,
  getIsTableLoading,
} from '../PayItemListSelectors';
import ExpensesTableBody from './PayItemExpensesTableBody';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import TableView from '../../../../components/TableView/TableView';

const PayItemExpensesTable = ({
  order,
  listeners: { onSortExpensesList, onCreatePayItemButtonClick },
  isTableLoading,
  isExpensesTableEmpty,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem>
        <HeaderSort
          title="Pay item name"
          sortName="Name"
          activeSort={order}
          onSort={onSortExpensesList}
        />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort
          title="Calculation basis"
          sortName="DisplayType"
          activeSort={order}
          onSort={onSortExpensesList}
        />
      </Table.HeaderItem>
    </Table.Header>
  );

  const emptyViewActions = [
    <Button
      key={1}
      type="link"
      icon={<Icons.Add />}
      onClick={onCreatePayItemButtonClick}
    >
      Create a pay item
    </Button>,
  ];

  const emptyView = (
    <NoResultPageState
      title="You have no expense pay items"
      description="To track benefits (other than superannuation) you pay on behalf of your employees."
      actions={emptyViewActions}
    />
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isExpensesTableEmpty}
      emptyView={emptyView}
    >
      <ExpensesTableBody />
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  order: getExpensesOrder(state),
  isTableLoading: getIsTableLoading(state),
  isExpensesTableEmpty: getIsExpensesTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemExpensesTable);
