import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsShowIsTaxInclusiveAndTaxCodeColumn,
  getTableData,
  getTaxCodeLabel,
} from '../../selectors/invoiceDetailSelectors';
import InvoiceItemTableRow from './InvoiceItemTableRow';
import LineItemTableHeader from '../../../../../components/LineItemTable/LineItemTableHeader';

const InvoiceItemTable = ({
  tableData,
  footer,
  listeners: {
    onAddRow,
    onUpdateRow,
    onRemoveRow,
    onUpdateAmount,
    onAddAccount,
    onLoadAccounts,
    onViewedAccountToolTip,
  },
  taxCodeLabel,
  renderItemCombobox,
  renderJobCombobox,
  isShowIsTaxInclusiveAndTaxCodeColumn,
}) => {
  const itemIdLabel = 'Item ID';
  const itemNameLabel = 'Description';
  const accountLabel = 'Account';
  const unitOfMeasureLabel = 'Unit';
  const unitLabel = 'No of units';
  const unitPriceLabel = 'Unit price';
  const discountLabel = 'Discount (%)';
  const amountLabel = 'Amount ($)';
  const jobLabel = 'Job';
  const requiredLabel = 'This is required';

  const headerItems = [
    <LineItemTable.HeaderItem>{itemIdLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{itemNameLabel}</LineItemTable.HeaderItem>,
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
    itemNameLabel,
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
          columnName: unitOfMeasureLabel,
          styles: { width: '6rem' },
        },
        {
          columnName: unitLabel,
          styles: { width: '8.4rem' },
        },
        {
          columnName: accountLabel,
          styles: { width: '16.8rem' },
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
          columnName: jobLabel,
          styles: { width: '8.4rem' },
        },
        {
          columnName: amountLabel,
          styles: { width: '12.4rem', align: 'right' },
        },
        {
          columnName: taxCodeLabel,
          styles: { width: '8.4rem' },
        },
      ],
    },
  ];

  const renderRow = (index, _, onChange) => (
    <InvoiceItemTableRow
      index={index}
      key={index}
      labels={labels}
      onChange={onChange}
      onUpdateAmount={onUpdateAmount}
      onAddAccount={onAddAccount}
      onLoadAccounts={onLoadAccounts}
      renderItemCombobox={renderItemCombobox}
      renderJobCombobox={renderJobCombobox}
    />
  );

  return (
    <LineItemTable
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      renderRow={renderRow}
      data={tableData}
      onAddRow={onAddRow}
      onRowChange={onUpdateRow}
      onRemoveRow={onRemoveRow}
    >
      {footer}
    </LineItemTable>
  );
};

const mapStateToProps = (state) => ({
  tableData: getTableData(state),
  taxCodeLabel: getTaxCodeLabel(state),
  isShowIsTaxInclusiveAndTaxCodeColumn: getIsShowIsTaxInclusiveAndTaxCodeColumn(
    state
  ),
});

export default connect(mapStateToProps)(InvoiceItemTable);
