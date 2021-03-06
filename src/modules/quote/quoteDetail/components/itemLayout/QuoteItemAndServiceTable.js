import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsShowIsTaxInclusiveAndTaxCodeColumn,
  getTableData,
  getTaxCodeLabel,
} from '../../selectors/QuoteDetailSelectors';
import LineItemTableHeader from '../../../../../components/LineItemTable/LineItemTableHeader';
import QuoteItemAndServiceTableRow from './QuoteItemAndServiceTableRow';

const itemIdLabel = 'Item ID';
const descriptionLabel = 'Description';
const accountLabel = 'Account';
const unitLabel = 'No of units';
const unitPriceLabel = 'Unit price';
const discountLabel = 'Discount (%)';
const amountLabel = 'Amount ($)';
const unitOfMeasureLabel = 'Unit';
const jobLabel = 'Job';
const requiredLabel = 'This is required';

const QuoteItemAndServiceTable = ({
  renderItemCombobox,
  footer,
  emptyQuoteLines,
  listeners: {
    onAddRow,
    onRemoveRow,
    onUpdateRow,
    onRowInputBlur,
    onAddAccountButtonClick,
    onAddJob,
    onViewedAccountToolTip,
  },
  taxCodeLabel,
  renderJobCombobox,
  isShowIsTaxInclusiveAndTaxCodeColumn,
}) => {
  const headerItems = [
    <LineItemTable.HeaderItem>{itemIdLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{descriptionLabel}</LineItemTable.HeaderItem>,
    <LineItemTableHeader
      label={accountLabel}
      required={requiredLabel}
      toolTipContent="Use accounts to categorise transactions"
      toolTipMouseEnter={onViewedAccountToolTip}
    />,
    <LineItemTable.HeaderItem>{unitOfMeasureLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{unitLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{unitPriceLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{discountLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {amountLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{jobLabel}</LineItemTable.HeaderItem>,
    isShowIsTaxInclusiveAndTaxCodeColumn && (
      <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
        {taxCodeLabel}
      </LineItemTable.HeaderItem>
    ),
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
    jobLabel,
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
          styles: { width: '12.4rem', align: 'right' },
        },
        {
          columnName: discountLabel,
          styles: { width: '12.4rem', align: 'right' },
        },
        {
          columnName: amountLabel,
          styles: { width: '12.4rem', align: 'right' },
        },
        {
          columnName: jobLabel,
          styles: { width: '8.4rem' },
        },
        {
          columnName: taxCodeLabel,
          styles: { width: '8.4rem' },
        },
      ],
    },
  ];

  const renderRow = (index, _, onChange) => (
    <QuoteItemAndServiceTableRow
      index={index}
      key={index}
      onChange={onChange}
      onTableRowAmountInputBlur={onRowInputBlur}
      onAddAccountButtonClick={onAddAccountButtonClick}
      onAddJob={onAddJob}
      labels={labels}
      renderItemCombobox={renderItemCombobox}
      renderJobCombobox={renderJobCombobox}
    />
  );

  return (
    <LineItemTable
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      data={emptyQuoteLines}
      renderRow={renderRow}
      onAddRow={onAddRow}
      onRowChange={onUpdateRow}
      onRemoveRow={onRemoveRow}
      onTableRowAmountInputBlur={onRowInputBlur}
    >
      {footer}
    </LineItemTable>
  );
};

const mapStateToProps = (state) => ({
  emptyQuoteLines: getTableData(state),
  taxCodeLabel: getTaxCodeLabel(state),
  isShowIsTaxInclusiveAndTaxCodeColumn: getIsShowIsTaxInclusiveAndTaxCodeColumn(
    state
  ),
});

export default connect(mapStateToProps)(QuoteItemAndServiceTable);
