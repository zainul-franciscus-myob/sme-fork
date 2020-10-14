import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIndexOfLastLine,
  getTableData,
  getTaxCodeLabel,
  getTaxLabel,
  getTotals,
} from '../spendMoneyDetailSelectors';
import SpendMoneyDetailRow from './SpendMoneyDetailRow';

const SpendMoneyDetailTable = ({
  tableData,
  amountTotals: { subTotal, totalTax, totalAmount },
  onRemoveRow,
  taxLabel,
  taxCodeLabel,
  indexOfLastLine,
  onAddRow,
  onRowInputBlur,
  onUpdateRow,
  onAddAccount,
  onAddJob,
}) => {
  const renderRow = (index, data, onChange, labels) => {
    const isNewLineRow = indexOfLastLine < index;

    return (
      <SpendMoneyDetailRow
        index={index}
        key={index}
        labels={labels}
        onChange={onChange}
        isNewLineRow={isNewLineRow}
        onRowInputBlur={onRowInputBlur}
        onAddAccount={onAddAccount}
        onAddJob={onAddJob}
      />
    );
  };

  const columns = [
    {
      label: 'Account',
      requiredLabel: 'Required',
      styles: { width: '35.2rem', align: 'left' },
    },
    {
      label: 'Amount ($)',
      requiredLabel: 'Required',
      styles: { width: '12.5rem', align: 'right' },
    },
    {
      label: 'Quantity',
      styles: { width: '9rem', align: 'left' },
    },
    {
      label: 'Description',
      styles: {},
    },
    {
      label: 'Job',
      styles: { width: '10rem' },
    },
    {
      label: taxCodeLabel,
      requiredLabel: 'Required',
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

const mapStateToProps = (state) => ({
  amountTotals: getTotals(state),
  indexOfLastLine: getIndexOfLastLine(state),
  tableData: getTableData(state),
  taxLabel: getTaxLabel(state),
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailTable);
