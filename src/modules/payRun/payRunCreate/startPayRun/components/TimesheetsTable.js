import {
  Checkbox, Separator, Table,
} from '@myob/myob-widgets';
import React from 'react';

import TableView from '../../../../../components/TableView/TableView';

const tableColumns = {
  checkbox: { width: '5rem' },
  date: { columnName: 'Timesheet date' },
  employee: { columnName: 'Employee timesheet' },
  payBasis: { columnName: 'Pay basis' },
  weeklyHours: { columnName: 'Weekly hours' },
  timesheetHours: { columnName: 'Timesheet hours' },
};

const TimesheetsTable = ({
  timesheets,
  selectAll,
  selectItem,
}) => {
  const selectedCount = timesheets.filter(e => e.isSelected).length;

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableColumns.checkbox}>
        <Checkbox
          name="bulk-select"
          label="Bulk select"
          hideLabel
          onChange={e => selectAll(e.target.checked)}
          checked={
              timesheets.length !== 0 && selectedCount === timesheets.length
            }
          indeterminate={
              selectedCount > 0 && selectedCount !== timesheets.length
            }
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableColumns.date}>
        {tableColumns.date.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableColumns.employee}>
        {tableColumns.employee.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableColumns.payBasis}>
        {tableColumns.payBasis.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableColumns.weeklyHours}>
        {tableColumns.weeklyHours.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableColumns.timesheetHours}>
        {tableColumns.timesheetHours.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const rows = timesheets && Array.isArray(timesheets) && timesheets.map(row => (
    <Table.Row key={row.employeeId}>
      <Table.RowItem {...tableColumns.checkbox}>
        <Checkbox
          name={`${row.employeeId}-select`}
          label={`Select row ${row.employeeId}`}
          hideLabel
          onChange={e => selectItem(row, e.target.checked)}
          checked={row.isSelected}
        />
      </Table.RowItem>
      <Table.RowItem columnName={tableColumns.date.columnName}>
        {row.timesheetDate}
      </Table.RowItem>
      <Table.RowItem columnName={tableColumns.employee.columnName}>
        {row.employeeName}
      </Table.RowItem>
      <Table.RowItem columnName={tableColumns.payBasis.columnName}>{row.wageType}</Table.RowItem>
      <Table.RowItem columnName={tableColumns.weeklyHours.columnName}>
        {row.weeklyHours}
      </Table.RowItem>
      <Table.RowItem columnName={tableColumns.timesheetHours.columnName}>
        {row.timesheetHours}
      </Table.RowItem>
    </Table.Row>
  ));

  return (<>
    <Separator />
    <h3>Deselect timesheets to remove from pay run</h3>
    <TableView
      header={header}
      isEmpty={timesheets.length === 0}
      emptyMessage="No timesheets found."
      // isLoading={isTableLoading}
    >
      <Table.Body>
        {rows}
      </Table.Body>
    </TableView>
  </>);
};

export default TimesheetsTable;
