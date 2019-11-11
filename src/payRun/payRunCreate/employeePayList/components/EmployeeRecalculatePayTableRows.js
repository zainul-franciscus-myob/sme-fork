import { Table } from '@myob/myob-widgets';
import React from 'react';

import EmployeeRecalculatePayTableRow from './EmployeeRecalculatePayTableRow';

const EmployeeRecalculatePayTableRows = ({
  name,
  title,
  tableConfig,
  entries,
  employeeId,
  onChange,
  onBlur,
  shouldShowTableRows,
}) => {
  const headerRow = (
    <Table.Row key={name}>
      <Table.RowItem cellRole="heading">{title}</Table.RowItem>
    </Table.Row>
  );

  const rows = entries.map(entry => (
    <EmployeeRecalculatePayTableRow
      key={entry.payItemId}
      tableConfig={tableConfig}
      employeeId={employeeId}
      entry={entry}
      onChange={onChange}
      onBlur={onBlur}
    />
  ));

  const tableRows = (
    <>
      {headerRow}
      {rows}
    </>
  );

  return shouldShowTableRows && tableRows;
};

export default EmployeeRecalculatePayTableRows;
