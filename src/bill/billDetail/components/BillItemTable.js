import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTaxCodeLabel } from '../selectors/billSelectors';
import BillItemTableRow from './BillItemTableRow';
import BillLineItemTable from './BillLineItemTable';

const renderRow = ({ onRowInputBlur, onAddItemButtonClick }) => (index, _, onChange, labels) => (
  <BillItemTableRow
    index={index}
    key={index}
    onChange={onChange}
    onRowInputBlur={onRowInputBlur}
    labels={labels}
    onAddItemButtonClick={onAddItemButtonClick}
  />
);

const BillItemTable = ({
  onAddRow,
  onRowChange,
  onRemoveRow,
  onRowInputBlur,
  taxCodeLabel,
  onUpdateBillOption,
  onAmountPaidBlur,
  onAddItemButtonClick,
}) => {
  const itemIdLabel = 'Item ID';
  const itemNameLabel = 'Item name';
  const unitLabel = 'Units';
  const unitPriceLabel = 'Unit Price ($)';
  const discountLabel = 'Discount (%)';
  const amountLabel = 'Amount ($)';
  const requiredLabel = 'This is required';

  const headerItems = [
    <LineItemTable.HeaderItem
      requiredLabel={requiredLabel}
    >
      {itemIdLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{itemNameLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>{unitLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem
      requiredLabel={requiredLabel}
    >
      {unitPriceLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{discountLabel}</LineItemTable.HeaderItem>,
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

  const labels = [
    itemIdLabel,
    itemNameLabel,
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
          styles: { width: '16.8rem' },
        },
        {
          columnName: unitLabel,
          styles: { width: '10rem' },
        },
        {
          columnName: unitPriceLabel,
          styles: { width: '12.8rem' },
        },
        {
          columnName: discountLabel,
          styles: { width: '10rem' },
        },
        {
          columnName: amountLabel,
          styles: { width: '12.8rem' },
        },
        {
          columnName: taxCodeLabel,
          styles: { width: '9rem' },
        },
      ],
    },
  ];

  return (
    <BillLineItemTable
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      renderRow={renderRow({ onRowInputBlur, onAddItemButtonClick })}
      onAddRow={onAddRow}
      onRowChange={onRowChange}
      onRemoveRow={onRemoveRow}
      onUpdateBillOption={onUpdateBillOption}
      onAmountPaidBlur={onAmountPaidBlur}
    />
  );
};

const mapStateToProps = state => ({
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(BillItemTable);
