import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIndexOfLastLine,
  getTableData,
  getTaxLabel,
  getTotals,
} from '../bankingSelectors/splitAllocationSelectors';
import {
  getIsBankingJobColumnEnabled,
  getIsLoadingAccount,
} from '../bankingSelectors';
import SplitAllocationRow from './SplitAllocationRow';
import TotalsContainer from './TotalsContainer';
import styles from './SplitAllocationTable.module.css';

const accountLabel = 'Account';
const amountLabelDollar = 'Amount ($)';
const amountLabelPercent = 'Amount (%)';
const quantityLabel = 'Quantity';
const lineDescription = 'Line description';
const jobLabel = 'Job';
const requiredText = 'This is required';

const onRowChange = (handler) => (index, key, value) =>
  handler(index, key, value);

const onAddRow = (handler) => ({ id, ...partialLine }) => handler(partialLine);

const renderRow = (
  indexOfLastLine,
  onAddAccount,
  onAddJob,
  onBlur,
  disabled
) => (index, data, onChange, labels) => {
  const isNewLineRow = indexOfLastLine < index;

  return (
    <SplitAllocationRow
      index={index}
      key={index}
      labels={labels}
      disabled={disabled}
      onChange={onChange}
      onAddAccount={onAddAccount}
      onAddJob={onAddJob}
      onBlur={onBlur}
      isNewLineRow={isNewLineRow}
    />
  );
};

const SplitAllocationTable = (props) => {
  const {
    taxLabel,
    tableData,
    indexOfLastLine,
    totals: { totalAllocated, totalUnallocated },
    onAddSplitAllocationLine,
    onUpdateSplitAllocationLine,
    onDeleteSplitAllocationLine,
    onAddAccount,
    onAddJob,
    onBlur,
    isLoadingAccount,
    isBankingJobColumnEnabled,
  } = props;

  const labels = [
    accountLabel,
    amountLabelDollar,
    amountLabelPercent,
    quantityLabel,
    lineDescription,
    jobLabel,
    taxLabel,
  ];

  const columns = [
    {
      columnName: accountLabel,
      requiredLabel: requiredText,
      styles: { width: '35.2rem' },
    },
    {
      columnName: amountLabelDollar,
      requiredLabel: requiredText,
      styles: { width: '12.5rem', align: 'right' },
    },
    {
      columnName: amountLabelPercent,
      requiredLabel: requiredText,
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
    ...(isBankingJobColumnEnabled
      ? [{ columnName: jobLabel, styles: { width: '8.4rem' } }]
      : []),
    {
      columnName: taxLabel,
      requiredLabel: requiredText,
      styles: { width: '8.4rem' },
    },
  ];

  const columnConfig = [
    {
      config: columns.map((column) => ({
        columnName: column.columnName,
        styles: column.styles,
      })),
    },
  ];

  const headerItems = columns.map(({ columnName, requiredLabel }) => (
    <LineItemTable.HeaderItem
      key={columnName}
      columnName={columnName}
      requiredLabel={requiredLabel}
    >
      {columnName}
    </LineItemTable.HeaderItem>
  ));

  return (
    <LineItemTable
      labels={labels}
      data={tableData}
      className={styles.lineItemTable}
      renderRow={renderRow(
        indexOfLastLine,
        onAddAccount,
        onAddJob,
        onBlur,
        isLoadingAccount
      )}
      onAddRow={onAddRow(onAddSplitAllocationLine)}
      onRowChange={onRowChange(onUpdateSplitAllocationLine)}
      onRemoveRow={onDeleteSplitAllocationLine}
      columnConfig={columnConfig}
      headerItems={headerItems}
    >
      <TotalsContainer>
        <LineItemTable.Totals title="Total allocated" amount={totalAllocated} />
        <LineItemTable.Totals
          totalAmount
          title="Unallocated"
          amount={totalUnallocated}
        />
      </TotalsContainer>
    </LineItemTable>
  );
};

const mapStateToProps = (state) => ({
  tableData: getTableData(state),
  indexOfLastLine: getIndexOfLastLine(state),
  totals: getTotals(state),
  taxLabel: getTaxLabel(state),
  isLoadingAccount: getIsLoadingAccount(state),
  isBankingJobColumnEnabled: getIsBankingJobColumnEnabled(state),
});

export default connect(mapStateToProps)(SplitAllocationTable);
