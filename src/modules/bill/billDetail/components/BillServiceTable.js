import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsBillJobColumnEnabled, getTaxCodeLabel } from '../selectors/billSelectors';
import BillLineItemTable from './BillLineItemTable';
import BillServiceTableRow from './BillServiceTableRow';

const renderRow = (
  onRowInputBlur,
  onAddAccount,
  onAddJob,
  isBillJobColumnEnabled,
) => (index, _, onChange, labels) => (
  <BillServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onRowInputBlur={onRowInputBlur}
    onAddAccount={onAddAccount}
    onAddJob={onAddJob}
    labels={labels}
    isBillJobColumnEnabled={isBillJobColumnEnabled}
  />
);

const BillServiceTable = ({
  listeners: {
    onAddRow,
    onRowChange,
    onRowInputBlur,
    onRemoveRow,
    onAddAccount,
    onAddJob,
    onUpdateBillOption,
  },
  taxCodeLabel,
  isBillJobColumnEnabled,
}) => {
  const descriptionLabel = 'Description';
  const accountLabel = 'Account';
  const amountLabel = 'Amount ($)';
  const jobLabel = 'Job';
  const requiredLabel = 'This is required';

  const labels = [descriptionLabel, accountLabel, amountLabel, jobLabel, taxCodeLabel];

  const jobColumn = <LineItemTable.HeaderItem>{jobLabel}</LineItemTable.HeaderItem>;

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
    (isBillJobColumnEnabled ? jobColumn : undefined),
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
    <BillLineItemTable
      labels={labels}
      renderRow={renderRow(onRowInputBlur, onAddAccount, onAddJob, isBillJobColumnEnabled)}
      columnConfig={columnConfig}
      onAddRow={onAddRow}
      onRowChange={onRowChange}
      onRemoveRow={onRemoveRow}
      headerItems={headerItems}
      onUpdateBillOption={onUpdateBillOption}
    />
  );
};

const mapStateToProps = state => ({
  taxCodeLabel: getTaxCodeLabel(state),
  isBillJobColumnEnabled: getIsBillJobColumnEnabled(state),
});

export default connect(mapStateToProps)(BillServiceTable);
