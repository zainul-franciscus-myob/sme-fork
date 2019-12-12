import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableData, getTotals } from '../../selectors/QuoteDetailSelectors';
import QuoteItemAndServiceTableRow from './QuoteItemAndServiceTableRow';

const itemIdLabel = 'Item ID';
const descriptionLabel = 'Description';
const accountLabel = 'Account';
const unitLabel = 'No of units';
const unitPriceLabel = 'Unit price';
const discountLabel = 'Discount (%)';
const amountLabel = 'Amount ($)';
const unitOfMeasureLabel = 'Unit';
const taxCodeLabel = 'Tax code';
const requiredLabel = 'This is required';

const headerItems = [
  <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
    {itemIdLabel}
  </LineItemTable.HeaderItem>,
  <LineItemTable.HeaderItem>{descriptionLabel}</LineItemTable.HeaderItem>,
  <LineItemTable.HeaderItem
    requiredLabel={requiredLabel}
  >
    {accountLabel}
  </LineItemTable.HeaderItem>,
  <LineItemTable.HeaderItem>{unitOfMeasureLabel}</LineItemTable.HeaderItem>,
  <LineItemTable.HeaderItem requiredLabel={requiredLabel}>{unitLabel}</LineItemTable.HeaderItem>,
  <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
    {unitPriceLabel}
  </LineItemTable.HeaderItem>,
  <LineItemTable.HeaderItem>{discountLabel}</LineItemTable.HeaderItem>,
  <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
    {amountLabel}
  </LineItemTable.HeaderItem>,
  <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
    {taxCodeLabel}
  </LineItemTable.HeaderItem>,
];

const labels = [
  itemIdLabel,
  descriptionLabel,
  accountLabel,
  unitOfMeasureLabel,
  unitLabel,
  unitPriceLabel,
  discountLabel,
  amountLabel,
  taxCodeLabel,
];

const columnConfig = [
  {
    config: [
      {
        columnName: itemIdLabel,
        styles: { width: '10.6rem' },
      },
      {
        columnName: descriptionLabel,
        styles: { width: 'flex-1' },
      },
      {
        columnName: accountLabel,
        styles: { width: '16.8rem' },
      },
      {
        columnName: unitOfMeasureLabel,
        styles: { width: '6rem' },
      },
      {
        columnName: unitLabel,
        styles: { width: '8.4rem' },
      },
      {
        columnName: unitPriceLabel,
        styles: { width: '12.4rem' },
      },
      {
        columnName: discountLabel,
        styles: { width: '12.4rem' },
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

const renderRow = (onTableRowAmountInputBlur, onAddItemButtonClick, onAddAccountButtonClick) => (
  index,
  data,
  onChange,
) => (
  <QuoteItemAndServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onTableRowAmountInputBlur={onTableRowAmountInputBlur}
    onAddItemButtonClick={onAddItemButtonClick}
    onAddAccountButtonClick={onAddAccountButtonClick}
    labels={labels}
  />
);

const QuoteItemAndServiceTable = ({
  totals,
  emptyQuoteLines,
  listeners: {
    onAddRow,
    onRemoveRow,
    onUpdateRow,
    onRowInputBlur,
    onAddItemButtonClick,
    onAddAccountButtonClick,
  },
}) => (
  <LineItemTable
    labels={labels}
    columnConfig={columnConfig}
    headerItems={headerItems}
    data={emptyQuoteLines}
    renderRow={renderRow(onRowInputBlur, onAddItemButtonClick, onAddAccountButtonClick)}
    onAddRow={onAddRow}
    onRowChange={onUpdateRow}
    onRemoveRow={onRemoveRow}
    onTableRowAmountInputBlur={onRowInputBlur}
  >
    <LineItemTable.Total>
      <LineItemTable.Totals title="Net amount" amount={totals.subTotal} />
      <LineItemTable.Totals title="Tax" amount={totals.totalTax} />
      <LineItemTable.Totals totalAmount title="Total amount" amount={totals.totalAmount} />
    </LineItemTable.Total>
  </LineItemTable>
);

const mapStateToProps = state => ({
  emptyQuoteLines: getTableData(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(QuoteItemAndServiceTable);
