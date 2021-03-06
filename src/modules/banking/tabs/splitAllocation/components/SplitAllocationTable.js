import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIndexOfLastLine,
  getIsLoading,
  getTableData,
  getTaxAmountLabel,
  getTaxLabel,
  getTotals,
} from '../splitAllocationSelectors';
import { getIsLoadingAccount } from '../../../selectors';
import LineItemTableHeader from '../../../../../components/LineItemTable/LineItemTableHeader';
import SplitAllocationRow from './SplitAllocationRow';
import TotalsContainer from '../../../components/TotalsContainer';
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
  onBlur,
  renderJobCombobox,
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
      onBlur={onBlur}
      renderJobCombobox={renderJobCombobox}
      isNewLineRow={isNewLineRow}
    />
  );
};

const SplitAllocationTable = (props) => {
  const {
    taxLabel,
    taxAmountLabel,
    tableData,
    indexOfLastLine,
    totals: { totalAllocated, totalUnallocated },
    onAddSplitAllocationLine,
    onUpdateSplitAllocationLine,
    onDeleteSplitAllocationLine,
    onAddAccount,
    onBlur,
    renderJobCombobox,
    isLoading,
    isLoadingAccount,
    onViewedAccountToolTip,
  } = props;

  const labels = [
    accountLabel,
    amountLabelDollar,
    amountLabelPercent,
    quantityLabel,
    lineDescription,
    jobLabel,
    taxLabel,
    taxAmountLabel,
  ];

  const columns = [
    {
      columnName: accountLabel,
      requiredLabel: requiredText,
      styles: { width: '35.2rem' },
      toolTipContent: 'Use accounts to categorise transactions',
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
    {
      columnName: jobLabel,
      styles: { width: '8.4rem' },
    },
    {
      columnName: taxLabel,
      requiredLabel: requiredText,
      styles: { width: '8.4rem' },
    },
    {
      columnName: taxAmountLabel,
      styles: { width: '10rem', align: 'right' },
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

  const headerItems = columns.map(
    ({ columnName, requiredLabel, toolTipContent }) => (
      <LineItemTableHeader
        label={columnName}
        required={requiredLabel}
        toolTipContent={toolTipContent}
        toolTipMouseEnter={onViewedAccountToolTip}
      />
    )
  );

  return (
    <LineItemTable
      labels={labels}
      data={tableData}
      className={styles.lineItemTable}
      renderRow={renderRow(
        indexOfLastLine,
        onAddAccount,
        onBlur,
        renderJobCombobox,
        isLoading || isLoadingAccount
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
  taxAmountLabel: getTaxAmountLabel(state),
  isLoading: getIsLoading(state),
  isLoadingAccount: getIsLoadingAccount(state),
});

export default connect(mapStateToProps)(SplitAllocationTable);
