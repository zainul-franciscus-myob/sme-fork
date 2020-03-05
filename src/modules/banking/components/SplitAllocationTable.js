import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIndexOfLastLine,
  getTableData, getTaxLabel, getTotals,
} from '../bankingSelectors/splitAllocationSelectors';
import { getIsLoadingAccount } from '../bankingSelectors';
import SplitAllocationRow from './SplitAllocationRow';

const accountLabel = 'Account';
const amountLabelDollar = 'Amount ($)';
const amountLabelPercent = 'Amount (%)';
const quantityLabel = 'Quantity';
const lineDescription = 'Line description';
const requiredLabel = 'This is required';


const onRowChange = handler => (index, key, value) => handler(index, key, value);

const onAddRow = handler => ({ id, ...partialLine }) => handler(partialLine);

const renderRow = (indexOfLastLine, onAddAccount, disabled) => (index, data, onChange, labels) => {
  const isNewLineRow = indexOfLastLine < index;

  return (
    <SplitAllocationRow
      index={index}
      key={index}
      labels={labels}
      disabled={disabled}
      onChange={onChange}
      onAddAccount={onAddAccount}
      isNewLineRow={isNewLineRow}
    />
  );
};

const SplitAllocationTable = (props) => {
  const {
    taxLabel,
    tableData,
    indexOfLastLine,
    totals: {
      totalAllocated,
      totalUnallocated,
    },
    onAddSplitAllocationLine,
    onUpdateSplitAllocationLine,
    onDeleteSplitAllocationLine,
    onAddAccount,
    isLoadingAccount,
  } = props;

  const labels = [
    accountLabel, amountLabelDollar, amountLabelPercent, quantityLabel, lineDescription, taxLabel,
  ];

  const columnConfig = [
    {
      config: [
        {
          columnName: accountLabel,
          styles: { width: '35.2rem' },
        },
        {
          columnName: amountLabelDollar,
          styles: { width: '12.5rem', align: 'right' },
        },
        {
          columnName: amountLabelPercent,
          styles: { width: '12.5rem', align: 'right' },
        },
        {
          columnName: quantityLabel,
          styles: { width: '9rem' },
        },
        {
          columnName: lineDescription,
          styles: {},
        },
        {
          columnName: taxLabel,
          styles: { width: '8.4rem' },
        },
      ],
    },
  ];

  const headerItems = [
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {accountLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {amountLabelDollar}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {amountLabelPercent}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>
      {quantityLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>
      {lineDescription}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {taxLabel}
    </LineItemTable.HeaderItem>,
  ];

  return (
    <LineItemTable
      labels={labels}
      data={tableData}
      renderRow={renderRow(indexOfLastLine, onAddAccount, isLoadingAccount)}
      onAddRow={onAddRow(onAddSplitAllocationLine)}
      onRowChange={onRowChange(onUpdateSplitAllocationLine)}
      onRemoveRow={onDeleteSplitAllocationLine}
      columnConfig={columnConfig}
      headerItems={headerItems}
    >
      <LineItemTable.Total>
        <LineItemTable.Totals title="Total allocated" amount={totalAllocated} />
        <LineItemTable.Totals totalAmount title="Unallocated" amount={totalUnallocated} />
      </LineItemTable.Total>
    </LineItemTable>
  );
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  indexOfLastLine: getIndexOfLastLine(state),
  totals: getTotals(state),
  taxLabel: getTaxLabel(state),
  isLoadingAccount: getIsLoadingAccount(state),
});

export default connect(mapStateToProps)(SplitAllocationTable);
