import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTaxCodeLabel } from '../selectors/purchaseOrderSelectors';
import LineItemTableHeader from '../../../../components/LineItemTable/LineItemTableHeader';
import PurchaseOrderLineItemTable from './PurchaseOrderLineItemTable';
import PurchaseOrderServiceTableRow from './PurchaseOrderServiceTableRow';

const renderRow = (onRowInputBlur, onAddAccount, onAddJob) => (
  index,
  _,
  onChange,
  labels
) => (
  <PurchaseOrderServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onRowInputBlur={onRowInputBlur}
    onAddAccount={onAddAccount}
    onAddJob={onAddJob}
    labels={labels}
  />
);

const PurchaseOrderServiceTable = ({
  listeners: {
    onAddRow,
    onRowChange,
    onRowInputBlur,
    onRemoveRow,
    onAddAccount,
    onAddJob,
    onUpdatePurchaseOrderOption,
    onViewedAccountToolTip,
  },
  taxCodeLabel,
}) => {
  const descriptionLabel = 'Description';
  const accountLabel = 'Account';
  const amountLabel = 'Amount ($)';
  const jobLabel = 'Job';
  const requiredLabel = 'This is required';

  const labels = [
    descriptionLabel,
    accountLabel,
    amountLabel,
    jobLabel,
    taxCodeLabel,
  ];

  const headerItems = [
    <LineItemTable.HeaderItem>{descriptionLabel}</LineItemTable.HeaderItem>,
    <LineItemTableHeader
      label={accountLabel}
      required={requiredLabel}
      toolTipContent="Use accounts to categorise transactions"
      toolTipMouseEnter={onViewedAccountToolTip}
    />,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {amountLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem>{jobLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
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
          styles: { width: '12.8rem', align: 'right' },
        },
        {
          columnName: jobLabel,
          styles: { width: '10rem' },
        },
        {
          columnName: taxCodeLabel,
          styles: { width: '9rem' },
        },
      ],
    },
  ];

  return (
    <PurchaseOrderLineItemTable
      labels={labels}
      renderRow={renderRow(onRowInputBlur, onAddAccount, onAddJob)}
      columnConfig={columnConfig}
      onAddRow={onAddRow}
      onRowChange={onRowChange}
      onRemoveRow={onRemoveRow}
      headerItems={headerItems}
      onUpdatePurchaseOrderOption={onUpdatePurchaseOrderOption}
    />
  );
};

const mapStateToProps = (state) => ({
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(PurchaseOrderServiceTable);
