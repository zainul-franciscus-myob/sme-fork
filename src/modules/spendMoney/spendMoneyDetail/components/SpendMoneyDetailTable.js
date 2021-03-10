import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIndexOfLastLine,
  getShouldShowIsTaxInclusiveAndTaxCodeColumn,
  getTableData,
  getTaxCodeLabel,
  getTaxLabel,
  getTotals,
} from '../spendMoneyDetailSelectors';
import LineItemTableHeader from '../../../../components/LineItemTable/LineItemTableHeader';
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
  onViewedAccountToolTip,
  renderJobCombobox,
  shouldShowIsTaxInclusiveAndTaxCodeColumn,
}) => {
  const renderRow = (index, data, onChange, labels) => {
    const isNewLineRow = indexOfLastLine < index;

    return (
      <SpendMoneyDetailRow
        index={index}
        renderJobCombobox={renderJobCombobox}
        key={index}
        labels={labels}
        onChange={onChange}
        isNewLineRow={isNewLineRow}
        onRowInputBlur={onRowInputBlur}
        onAddAccount={onAddAccount}
      />
    );
  };

  const columns = [
    {
      label: 'Account',
      requiredLabel: 'This is required',
      styles: { width: '35.2rem', align: 'left' },
      toolTipContent: 'Use accounts to categorise transactions',
    },
    {
      label: 'Amount ($)',
      requiredLabel: 'This is required',
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
  ];
  if (shouldShowIsTaxInclusiveAndTaxCodeColumn) {
    columns.push({
      label: taxCodeLabel,
      requiredLabel: 'This is required',
      styles: { width: '8.4rem', align: 'left' },
    });
  }

  const labels = columns.map(({ label }) => label);

  const headerItems = columns.map(
    ({ label, requiredLabel, toolTipContent }) => (
      <LineItemTableHeader
        label={label}
        required={requiredLabel}
        toolTipContent={toolTipContent}
        toolTipMouseEnter={onViewedAccountToolTip}
      />
    )
  );

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
  shouldShowIsTaxInclusiveAndTaxCodeColumn: getShouldShowIsTaxInclusiveAndTaxCodeColumn(
    state
  ),
});

export default connect(mapStateToProps)(SpendMoneyDetailTable);
