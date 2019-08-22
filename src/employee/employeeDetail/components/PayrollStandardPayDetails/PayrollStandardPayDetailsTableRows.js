import { Table } from '@myob/myob-widgets';
import React from 'react';

import PayrollStandardPayDetailsTableRow from './PayrollStandardPayDetailsTableRow';

const PayrollStandardPayDetailsTableRows = ({
  name, title, tableConfig, entries, showTableRows, onChange, onBlur, onClick,
}) => {
  const headerRow = (
    <Table.Row key={name}>
      <Table.RowItem cellRole="heading">{title}</Table.RowItem>
    </Table.Row>
  );

  const rows = entries.map(entry => (
    <PayrollStandardPayDetailsTableRow
      key={`${name}-${entry.payItemId}`}
      tableConfig={tableConfig}
      entry={entry}
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

export default PayrollStandardPayDetailsTableRows;
