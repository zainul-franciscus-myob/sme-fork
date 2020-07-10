import { Table } from '@myob/myob-widgets';
import React from 'react';

import PayDetailsTableRow from './PayDetailsTableRow';

const PayDetailsTableRows = ({
  name,
  title,
  tableConfig,
  entries,
  employeeId,
  employeeName,
  onChange,
  onBlur,
  shouldShowTableRows,
}) => {
  const headerRow = (
    <Table.Row key={name}>
      <Table.RowItem cellRole="heading">{title}</Table.RowItem>
    </Table.Row>
  );

  const rows = entries.map((entry) => (
    <PayDetailsTableRow
      key={entry.payItemId}
      tableConfig={tableConfig}
      employeeId={employeeId}
      employeeName={employeeName}
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

export default PayDetailsTableRows;
