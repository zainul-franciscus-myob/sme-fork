import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableData, getTaxCodeLabel } from '../../selectors/invoiceDetailSelectors';
import InvoiceDetailTotals from '../InvoiceDetailTotals';
import InvoiceItemTableRow from './InvoiceItemTableRow';

const InvoiceItemTable = ({
  tableData,
  listeners: {
    onAddRow,
    onUpdateRow,
    onRemoveRow,
    onUpdateAmount,
    onChangeAmountToPay,
    onAddItemButtonClick,
    onAddAccount,
  },
  taxCodeLabel,
}) => {
  const itemIdLabel = 'Item ID';
  const itemNameLabel = 'Description';
  const accountLabel = 'Account';
  const unitOfMeasureLabel = 'Unit';
  const unitLabel = 'No. of units';
  const unitPriceLabel = 'Unit price';
  const discountLabel = 'Discount (%)';
  const amountLabel = 'Amount ($)';
  const requiredLabel = 'This is required';

  const headerItems = [
    <LineItemTable.HeaderItem>{itemIdLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{itemNameLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {accountLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{unitOfMeasureLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{unitLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{unitPriceLabel}</LineItemTable.HeaderItem>,
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
    itemNameLabel,
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
          columnName: unitOfMeasureLabel,
          styles: { width: '6rem' },
        },
        {
          columnName: unitLabel,
          styles: { width: '10rem' },
        },
        {
          columnName: accountLabel,
          styles: { width: '16.8rem' },
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
          styles: { width: '9rem' },
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
      onAddItemButtonClick={onAddItemButtonClick}
      onAddAccount={onAddAccount}
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
      <InvoiceDetailTotals onChange={onChangeAmountToPay} />
    </LineItemTable>
  );
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(InvoiceItemTable);
