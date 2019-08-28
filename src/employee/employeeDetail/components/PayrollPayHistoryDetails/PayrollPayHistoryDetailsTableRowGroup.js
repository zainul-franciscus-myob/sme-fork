import { Table } from '@myob/myob-widgets';
import React from 'react';

import PayrollPayHistoryDetailsTableRow from './PayrollPayHistoryDetailsTableRow';

const PayrollPayHistoryDetailsTableRowGroup = ({
  name, title, tableConfig, entries, showTableRows, disabled, onChange, onBlur, onClick,
}) => {
  const headerRow = (
    <Table.Row key={name}>
      <Table.RowItem cellRole="heading">{title}</Table.RowItem>
    </Table.Row>
  );

  const rows = entries.map(entry => (
    <PayrollPayHistoryDetailsTableRow
      key={`${name}-${entry.payItemId}`}
      tableConfig={tableConfig}
      entry={entry}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      onClick={onClick}
    />
  ));

  const view = (
    <>
      {headerRow}
      {rows}
    </>
  );

  return showTableRows && view;
};

export default PayrollPayHistoryDetailsTableRowGroup;
