import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableData, getTotals } from '../../selectors/QuoteDetailSelectors';
import QuoteServiceTableRow from './QuoteServiceTableRow';

const descriptionLabel = 'Description';
const accountLabel = 'Account';
const amountLabel = 'Amount ($)';
const taxCodeLabel = 'Tax code';
const requiredLabel = 'This is required';

const headerItems = [
  <LineItemTable.HeaderItem>{descriptionLabel}</LineItemTable.HeaderItem>,
  <LineItemTable.HeaderItem
    requiredLabel={requiredLabel}
  >
    {accountLabel}
  </LineItemTable.HeaderItem>,
  <LineItemTable.HeaderItem
    requiredLabel={requiredLabel}
  >
    {amountLabel}
  </LineItemTable.HeaderItem>,
  <LineItemTable.HeaderItem
    requiredLabel={requiredLabel}
  >
    {taxCodeLabel}
  </LineItemTable.HeaderItem>,
];

const columnConfig = [
  {
    config: [
      {
        columnName: accountLabel,
        styles: { width: '35.2rem' },
      },
      {
        columnName: amountLabel,
        styles: { width: '12.4rem' },
      },
      {
        columnName: taxCodeLabel,
        styles: { width: '8.4rem' },
      },
    ],
  },
];

const labels = [descriptionLabel, accountLabel, amountLabel, taxCodeLabel];

const renderRow = (onRowInputBlurHandler, onAddAccount) => (index, data, onChange) => (
  <QuoteServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onAddAccount={onAddAccount}
    onRowInputBlur={onRowInputBlurHandler}
    labels={labels}
  />
);

const onTableAddRow = handler => ({ id, ...partialLine }) => handler(partialLine);

const onTableRemoveRow = handler => index => handler(index);

const QuoteServiceTable = ({
  tableData,
  totals,
  listeners: {
    onUpdateRow,
    onAddRow,
    onRemoveRow,
    onRowInputBlur,
    onAddAccountButtonClick,
  },
}) => {
  const {
    subTotal,
    totalTax,
    totalAmount,
  } = totals;

  return (
    <LineItemTable
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      renderRow={renderRow(onRowInputBlur, onAddAccountButtonClick)}
      data={tableData}
      onAddRow={onTableAddRow(onAddRow)}
      onRowChange={onUpdateRow}
      onRemoveRow={onTableRemoveRow(onRemoveRow)}
    >
      <LineItemTable.Total>
        <LineItemTable.Totals title="Net amount" amount={subTotal} />
        <LineItemTable.Totals title="Tax" amount={totalTax} />
        <LineItemTable.Totals totalAmount title="Total amount" amount={totalAmount} />
      </LineItemTable.Total>
    </LineItemTable>
  );
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(QuoteServiceTable);
