import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIndexOfLastLine,
  getTableData,
  getTaxCodeLabel,
  getTaxLabel,
  getTotals,
} from '../receiveMoneyDetailSelectors';
import ReceiveMoneyDetailRow from './ReceiveMoneyDetailRow';

const ReceiveMoneyDetailTable = ({
  amountTotals: {
    subTotal,
    totalTax,
    totalAmount,
  },
  indexOfLastLine,
  tableData,
  taxLabel,
  taxCodeLabel,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
}) => {
  const renderRow = (index, data, onChange, labels) => {
    const isNewLineRow = indexOfLastLine < index;

    return (
      <ReceiveMoneyDetailRow
        index={index}
        key={index}
        labels={labels}
        onChange={onChange}
        isNewLineRow={isNewLineRow}
        onRowInputBlur={onRowInputBlur}
      />
    );
  };

  const columns = [
    {
      label: 'Account',
      requiredLabel: 'required',
      styles: { width: '35.2rem', align: 'left' },
    },
    {
      label: 'Amount ($)',
      requiredLabel: 'required',
      styles: { width: '12.5rem', align: 'right' },
    },
    {
      label: 'Quantity',
      styles: { width: '9rem' },
    },
    {
      label: 'Description',
      styles: {},
    },
    {
      label: taxCodeLabel,
      requiredLabel: 'required',
      styles: { width: '8.4rem', align: 'left' },
    },
  ];

  const labels = columns.map(({ label }) => label);

  const headerItems = columns.map(({ label, requiredLabel }) => (
    <LineItemTable.HeaderItem
      key={label}
      columnName={label}
      requiredLabel={requiredLabel}
    >
      {label}
    </LineItemTable.HeaderItem>
  ));

  const columnConfig = [
    {
      config: columns.map(({ label, styles }) => ({
        styles,
        columnName: label,
      })),
    },
  ];

  return (
    <LineItemTable
      onAddRow={onAddRow}
      onRowChange={onUpdateRow}
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      renderRow={renderRow}
      data={tableData}
      onRemoveRow={onRemoveRow}
    >
      <LineItemTable.Total>
        <LineItemTable.Totals title="Subtotal" amount={subTotal} />
        <LineItemTable.Totals title={taxLabel} amount={totalTax} />
        <LineItemTable.Totals totalAmount title="Total" amount={totalAmount} />
      </LineItemTable.Total>
    </LineItemTable>
  );
};

const mapStateToProps = state => ({
  amountTotals: getTotals(state),
  indexOfLastLine: getIndexOfLastLine(state),
  tableData: getTableData(state),
  taxLabel: getTaxLabel(state),
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(ReceiveMoneyDetailTable);
