import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTaxCodeLabel } from '../selectors/RecurringBillSelectors';
import LineItemTableHeader from '../../../../components/LineItemTable/LineItemTableHeader';
import RecurringBillItemAndServiceTableRow from './RecurringBillItemAndServiceTableRow';
import RecurringBillLineItemTable from './RecurringBillLineItemTable';

const renderRow = ({
  onRowInputBlur,
  onAddAccount,
  onAddJob,
  renderItemCombobox,
  renderJobCombobox,
}) => (index, _, onChange, labels) => (
  <RecurringBillItemAndServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onRowInputBlur={onRowInputBlur}
    renderItemCombobox={renderItemCombobox}
    renderJobCombobox={renderJobCombobox}
    labels={labels}
    onAddAccount={onAddAccount}
    onAddJob={onAddJob}
  />
);

const RecurringBillItemAndServiceTable = ({
  listeners: {
    onAddRow,
    onRowChange,
    onRowInputBlur,
    onRemoveRow,
    onAddAccount,
    onAddJob,
    onUpdateBillHeaderOption,
    onViewedAccountToolTip,
  },
  renderItemCombobox,
  renderJobCombobox,
  taxCodeLabel,
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

  const headerItems = [
    <LineItemTable.HeaderItem>{itemIdLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{descriptionLabel}</LineItemTable.HeaderItem>,
    <LineItemTableHeader
      label={accountLabel}
      required={requiredLabel}
      toolTipContent="Use accounts to categorise transactions"
      toolTipMouseEnter={onViewedAccountToolTip}
    />,
    <LineItemTable.HeaderItem>{unitCountLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{unitPriceLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{discountLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {amountLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{jobLabel}</LineItemTable.HeaderItem>,
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
          styles: { width: '8rem', align: 'right' },
        },
        {
          columnName: unitPriceLabel,
          styles: { width: '12rem', align: 'right' },
        },
        {
          columnName: discountLabel,
          styles: { width: '10rem', align: 'right' },
        },
        {
          columnName: amountLabel,
          styles: { width: '12rem', align: 'right' },
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
    <RecurringBillLineItemTable
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      renderRow={renderRow({
        onRowInputBlur,
        onAddAccount,
        onAddJob,
        renderItemCombobox,
        renderJobCombobox,
      })}
      onAddRow={onAddRow}
      onRowChange={onRowChange}
      onRemoveRow={onRemoveRow}
      onUpdateBillHeaderOption={onUpdateBillHeaderOption}
    />
  );
};

const mapStateToProps = (state) => ({
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(RecurringBillItemAndServiceTable);
