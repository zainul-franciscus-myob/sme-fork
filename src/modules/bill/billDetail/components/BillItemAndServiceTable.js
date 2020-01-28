import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTaxCodeLabel } from '../selectors/billSelectors';
import BillItemAndServiceTableRow from './BillItemAndServiceTableRow';
import BillLineItemTable from './BillLineItemTable';

const renderRow = ({
  onRowInputBlur,
  onAddItemButtonClick,
  onAddAccount,
}) => (index, _, onChange, labels) => (
  <BillItemAndServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onRowInputBlur={onRowInputBlur}
    labels={labels}
    onAddItemButtonClick={onAddItemButtonClick}
    onAddAccount={onAddAccount}
  />
);

const BillItemAndServiceTable = ({
  listeners: {
    onAddRow,
    onRowChange,
    onRowInputBlur,
    onRemoveRow,
    onAddAccount,
    onAddItemButtonClick,
    onUpdateBillOption,
    onAmountPaidBlur,
  },
  taxCodeLabel,
}) => {
  const itemIdLabel = 'Item ID';
  const descriptionLabel = 'Description';
  const accountLabel = 'Account';
  const unitCountLabel = 'No of units';
  const unitPriceLabel = 'Unit price';
  const discountLabel = 'Discount (%)';
  const amountLabel = 'Amount ($)';
  const requiredLabel = 'This is required';

  const headerItems = [
    <LineItemTable.HeaderItem>{itemIdLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{descriptionLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {accountLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{unitCountLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{unitPriceLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{discountLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
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
    descriptionLabel,
    accountLabel,
    unitCountLabel,
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
          columnName: unitCountLabel,
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
      renderRow={renderRow({ onRowInputBlur, onAddItemButtonClick, onAddAccount })}
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

export default connect(mapStateToProps)(BillItemAndServiceTable);
