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
  disableAmountInput,
}) => {
  const headerRow = (
    <Table.Row key={name}>
      <Table.RowItem cellRole="heading">{title}</Table.RowItem>
    </Table.Row>
  );

  const rows = entries.map((entry) => (
    <PayDetailsTableRow
      key={entry.payrollCategoryId}
      tableConfig={tableConfig}
      employeeId={employeeId}
      employeeName={employeeName}
      entry={entry}
      onChange={onChange}
      onBlur={onBlur}
      disableAmountInput={disableAmountInput}
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
