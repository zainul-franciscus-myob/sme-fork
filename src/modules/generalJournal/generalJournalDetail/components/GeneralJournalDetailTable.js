import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIndexOfLastLine,
  getIsOutOfBalanced,
  getIsSystem,
  getShouldShowTaxOptions,
  getTableData,
  getTaxCodeLabel,
  getTaxLabel,
  getTotals,
} from '../generalJournalDetailSelectors';
import GeneralJournalDetailRow from './GeneralJournalDetailRow';

const GeneralJournalDetailTable = ({
  tableData,
  amountTotals: { totalDebit, totalCredit, totalTax, totalOutOfBalance },
  indexOfLastLine,
  isOutOfBalance,
  taxLabel,
  taxCodeLabel,
  onAddRow,
  onUpdateRow,
  onRowInputBlur,
  onRemoveRow,
  onCreateAccountButtonClick,
  renderJobCombobox,
  isSystem,
  shouldShowTaxOptions,
}) => {
  const renderRow = (index, _, onChange, labels) => {
    const isNewLineRow = indexOfLastLine < index;

    return (
      <GeneralJournalDetailRow
        index={index}
        key={index}
        labels={labels}
        isNewLineRow={isNewLineRow}
        onChange={onChange}
        onRowInputBlur={onRowInputBlur}
        onCreateAccountButtonClick={onCreateAccountButtonClick}
        renderJobCombobox={renderJobCombobox}
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
      label: 'Debit ($)',
      styles: { width: '12.5rem', align: 'right' },
    },
    {
      label: 'Credit ($)',
      styles: { width: '12.5rem', align: 'right' },
    },
    {
      label: 'Quantity',
      styles: { width: '9.0rem', align: 'left' },
    },
    {
      label: 'Description',
      styles: {},
    },
    { label: 'Job', styles: { width: '8.4rem', align: 'left' } },
  ];

  if (shouldShowTaxOptions) {
    columns.push({
      label: taxCodeLabel,
      requiredLabel: 'Required',
      styles: { width: '8.4rem', align: 'left' },
    });
  }

  const columnConfig = [
    {
      config: columns.map(({ label, styles }) => ({
        styles,
        columnName: label,
      })),
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

  return (
    <LineItemTable
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      data={tableData}
      renderRow={renderRow}
      onRowChange={onUpdateRow}
      onAddRow={onAddRow}
      onRemoveRow={isSystem ? () => {} : onRemoveRow}
    >
      <LineItemTable.Total>
        <LineItemTable.Totals title="Total debit" amount={totalDebit} />
        <LineItemTable.Totals title="Total credit" amount={totalCredit} />
        <LineItemTable.Totals title={taxLabel} amount={totalTax} />
        <LineItemTable.Totals
          totalAmount
          type={isOutOfBalance && 'danger'}
          title="Out of balance"
          amount={totalOutOfBalance}
        />
      </LineItemTable.Total>
    </LineItemTable>
  );
};

const mapStateToProps = (state) => ({
  amountTotals: getTotals(state),
  indexOfLastLine: getIndexOfLastLine(state),
  tableData: getTableData(state),
  isOutOfBalance: getIsOutOfBalanced(state),
  taxLabel: getTaxLabel(state),
  taxCodeLabel: getTaxCodeLabel(state),
  isSystem: getIsSystem(state),
  shouldShowTaxOptions: getShouldShowTaxOptions(state),
});

export default connect(mapStateToProps)(GeneralJournalDetailTable);
