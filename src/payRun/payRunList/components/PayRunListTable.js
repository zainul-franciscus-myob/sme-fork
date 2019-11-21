import {
  Dropdown,
  HeaderSort,
  Icons,
  Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmptyState,
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
  getTableEntries,
} from '../payRunListSelectors';
import PayRunListEmptyView from './PayRunListEmptyView';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  date: { width: '22rem', valign: 'top', columnName: 'Date of payment' },
  payPeriod: { width: 'flex-1', valign: 'top', columnName: 'Pay period' },
  employees: {
    width: 'flex-1',
    valign: 'top',
    align: 'right',
    columnName: 'Employees',
  },
  actions: {
    width: '22rem',
    align: 'right',
    cellRole: 'actions',
    valign: 'middle',
  },
};

const PayRunListTable = ({
  isTableLoading,
  onSort,
  sortOrder,
  entries,
  isTableEmpty,
  emptyState,
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
      <Table.HeaderItem {...tableConfig.actions} />
    </Table.Header>
  );

  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.date}>
        <a href={entry.link}>{entry.paymentDate}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.payPeriod}>{entry.payPeriod}</Table.RowItem>
      <Table.RowItem {...tableConfig.employees}>{entry.employeeCount}</Table.RowItem>
      <Table.RowItem {...tableConfig.actions}>
        <Dropdown
          right
          items={[
            <Dropdown.Item
              key="summary-report"
              label="Download summary report"
              value="summary-report"
            />,
            <Dropdown.Item
              key="pay-via-bank-file"
              label="Pay via bank file"
              value="pay-via-bank-file"
            />,
          ]}
          onSelect={() => {}}
          toggle={(
            <Dropdown.Toggle type="clear" aria-label="more options" size="xs">
              <Icons.More size="16px" />
            </Dropdown.Toggle>
          )}
        />
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={<PayRunListEmptyView emptyState={emptyState} />}
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
  isTableEmpty: getIsTableEmpty(state),
  emptyState: getEmptyState(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(PayRunListTable);
