import {
  HeaderSort,
  Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmptyState,
  getIsTableLoading,
  getOrder,
  getTableEntries,
  shouldShowEmptyState,
} from '../payRunListSelectors';
import PayRunListEmptyView from './PayRunListEmptyView';
import TableView from '../../../../components/TableView/TableView';

const tableConfig = {
  date: {
    valign: 'top', columnName: 'Date of payment',
  },
  payPeriod: {
    valign: 'top', columnName: 'Pay period',
  },
  employees: {
    valign: 'top', align: 'left', columnName: 'Employees',
  },
};

const PayRunListTable = ({
  isTableLoading,
  onSort,
  sortOrder,
  entries,
  isTableEmpty,
  emptyState,
  onStpSignUpClick,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort title={tableConfig.date.columnName} sortName="date" activeSort={sortOrder} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.payPeriod}>
        {tableConfig.payPeriod.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employees}>
        {tableConfig.employees.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.date}>
        <a href={entry.link}>{entry.paymentDate}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.payPeriod}>{entry.payPeriod}</Table.RowItem>
      <Table.RowItem {...tableConfig.employees}>{entry.employeeCount}</Table.RowItem>
    </Table.Row>
  ));

  const emptyView = (
    <PayRunListEmptyView emptyState={emptyState} onStpSignUpClick={onStpSignUpClick} />
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
      emptyMessage="Empty table"
    >
      <Table.Body>
        {rows}
      </Table.Body>
    </TableView>
  );
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
  sortOrder: getOrder(state),
  isTableEmpty: shouldShowEmptyState(state),
  emptyState: getEmptyState(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(PayRunListTable);
