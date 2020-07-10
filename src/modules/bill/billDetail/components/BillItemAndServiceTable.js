import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsBillJobColumnEnabled,
  getTaxCodeLabel,
} from '../selectors/billSelectors';
import BillItemAndServiceTableRow from './BillItemAndServiceTableRow';
import BillLineItemTable from './BillLineItemTable';

const renderRow = ({
  onRowInputBlur,
  onAddItemButtonClick,
  onAddAccount,
  onAddJob,
  isBillJobColumnEnabled,
}) => (index, _, onChange, labels) => (
  <BillItemAndServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onRowInputBlur={onRowInputBlur}
    labels={labels}
    onAddItemButtonClick={onAddItemButtonClick}
    onAddAccount={onAddAccount}
    onAddJob={onAddJob}
    isBillJobColumnEnabled={isBillJobColumnEnabled}
  />
);

const BillItemAndServiceTable = ({
  listeners: {
    onAddRow,
    onRowChange,
    onRowInputBlur,
    onRemoveRow,
    onAddAccount,
    onAddJob,
    onAddItemButtonClick,
    onUpdateBillOption,
  },
  taxCodeLabel,
  isBillJobColumnEnabled,
}) => {
  const itemIdLabel = 'Item ID';
  const descriptionLabel = 'Description';
  const accountLabel = 'Account';
  const unitCountLabel = 'No of units';
  const unitPriceLabel = 'Unit price';
  const discountLabel = 'Discount (%)';
  const amountLabel = 'Amount ($)';
  const jobLabel = 'Job';
  const requiredLabel = 'This is required';

  const jobColumn = (
    <LineItemTable.HeaderItem>{jobLabel}</LineItemTable.HeaderItem>
  );

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
    isBillJobColumnEnabled ? jobColumn : undefined,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
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
    jobLabel,
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
          styles: { width: '10rem', align: 'right' },
        },
        {
          columnName: unitPriceLabel,
          styles: { width: '12.8rem', align: 'right' },
        },
        {
          columnName: discountLabel,
          styles: { width: '10rem', align: 'right' },
        },
        {
          columnName: amountLabel,
          styles: { width: '12.8rem', align: 'right' },
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

  return (
    <BillLineItemTable
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      renderRow={renderRow({
        onRowInputBlur,
        onAddItemButtonClick,
        onAddAccount,
        onAddJob,
        isBillJobColumnEnabled,
      })}
      onAddRow={onAddRow}
      onRowChange={onRowChange}
      onRemoveRow={onRemoveRow}
      onUpdateBillOption={onUpdateBillOption}
    />
  );
};

const mapStateToProps = (state) => ({
  taxCodeLabel: getTaxCodeLabel(state),
  isBillJobColumnEnabled: getIsBillJobColumnEnabled(state),
});

export default connect(mapStateToProps)(BillItemAndServiceTable);
