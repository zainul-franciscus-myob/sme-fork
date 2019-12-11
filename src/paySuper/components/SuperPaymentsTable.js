import {
  Button,
  Checkbox,
  HeaderSort,
  Separator,
  Table,
} from '@myob/myob-widgets';
import React from 'react';

import TableView from '../../components/TableView/TableView';

const tableConfig = {
  checkbox: { width: '5rem' },
  date: { columnName: 'Date', sortName: 'DateOccurred' },
  payItemName: { columnName: 'Pay item', sortName: 'PayItemName' },
  employee: { columnName: 'Employee', sortName: 'EmployeeName' },
  superannuationFund: { columnName: 'Superannuation fund', sortName: 'SuperannuationFundName' },
  amount: { columnName: 'Amount ($)', sortName: 'Amount', align: 'right' },
};

const SuperPaymentsTable = ({
  isTableLoading,
  onSort,
  order,
  selectAll,
  selectItem,
  superPayments,
  onDateLinkClick,
  renderCheckbox,
}) => {
  const selectedCount = superPayments.filter(e => e.isSelected).length;

  const bulkActions = (
    <>
      <p style={{ margin: '1.6rem' }}>
        {selectedCount > 1
          ? `${selectedCount} items selected`
          : `${selectedCount} item selected`}
      </p>
    </>
  );

  const header = (
    <Table.Header>
      {renderCheckbox && (
        <Table.HeaderItem {...tableConfig.checkbox}>
          <Checkbox
            name="bulk-select"
            label="Bulk select"
            hideLabel
            onChange={e => selectAll(e.target.checked)}
            checked={
              superPayments.length !== 0 && selectedCount === superPayments.length
            }
            indeterminate={
              selectedCount > 0 && selectedCount !== superPayments.length
            }
          />
        </Table.HeaderItem>
      )}
      <Table.HeaderItem {...tableConfig.date}>
        {order ? (<HeaderSort title={tableConfig.date.columnName} sortName={tableConfig.date.sortName} activeSort={order} onSort={onSort} />) : 'Date'}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.payItemName}>
        {order ? (<HeaderSort title={tableConfig.payItemName.columnName} sortName={tableConfig.payItemName.sortName} activeSort={order} onSort={onSort} />) : 'Pay item'}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.employee}>
        {order ? (<HeaderSort title={tableConfig.employee.columnName} sortName={tableConfig.employee.sortName} activeSort={order} onSort={onSort} />) : 'Employee'}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.superannuationFund}>
        {order ? (<HeaderSort title={tableConfig.superannuationFund.columnName} sortName={tableConfig.superannuationFund.sortName} activeSort={order} onSort={onSort} />) : 'Superannuation fund'}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        {order ? (<HeaderSort title={tableConfig.amount.columnName} sortName={tableConfig.amount.sortName} activeSort={order} onSort={onSort} />) : 'Amount ($)'}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = superPayments.map(row => (
    <Table.Row key={row.employeePaymentEventId} testId="paySuperRow">
      {renderCheckbox && (
        <Table.RowItem {...tableConfig.checkbox}>
          <Checkbox
            name={`${row.employeePaymentEventId}-select`}
            label={`Select row ${row.employeePaymentEventId}`}
            hideLabel
            onChange={e => selectItem(row, e.target.checked)}
            checked={row.isSelected}
          />
        </Table.RowItem>
      )}
      <Table.RowItem columnName={tableConfig.date.columnName}>
        <Button
          type="link"
          onClick={() => { onDateLinkClick(row.employeePaymentEventId, row.employeeName); }}
        >
          {row.date}
        </Button>
      </Table.RowItem>
      <Table.RowItem columnName={tableConfig.payItemName.columnName}>
        {row.payItemName}
      </Table.RowItem>
      <Table.RowItem columnName={tableConfig.employee.columnName}>{row.employeeName}</Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.superannuationFund.columnName}
      >
        {row.superannuationFundName}
      </Table.RowItem>
      <Table.RowItem align="right" columnName={tableConfig.amount.columnName}>{row.amount}</Table.RowItem>
    </Table.Row>
  ));

  return (
    <>
      <Separator />
      {(selectedCount !== 0) && bulkActions}
      <TableView
        header={header}
        isEmpty={superPayments.length === 0}
        emptyMessage="No transactions found."
        isLoading={isTableLoading}
      >
        <Table.Body>
          {rows}
        </Table.Body>
      </TableView>
    </>
  );
};

export default SuperPaymentsTable;
