import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTaxCodeLabel } from '../selectors/RecurringBillSelectors';
import LineItemTableHeader from '../../../../components/LineItemTable/LineItemTableHeader';
import RecurringBillLineItemTable from './RecurringBillLineItemTable';
import RecurringBillServiceTableRow from './RecurringBillServiceTableRow';

const renderRow = (
  onRowInputBlur,
  onAddAccount,
  onAddJob,
  renderJobCombobox
) => (index, _, onChange, labels) => (
  <RecurringBillServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onRowInputBlur={onRowInputBlur}
    onAddAccount={onAddAccount}
    onAddJob={onAddJob}
    labels={labels}
    renderJobCombobox={renderJobCombobox}
  />
);

const RecurringBillServiceTable = ({
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
  taxCodeLabel,
  renderJobCombobox,
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
    <RecurringBillLineItemTable
      labels={labels}
      renderRow={renderRow(
        onRowInputBlur,
        onAddAccount,
        onAddJob,
        renderJobCombobox
      )}
      columnConfig={columnConfig}
      onAddRow={onAddRow}
      onRowChange={onRowChange}
      onRemoveRow={onRemoveRow}
      headerItems={headerItems}
      onUpdateBillHeaderOption={onUpdateBillHeaderOption}
    />
  );
};

const mapStateToProps = (state) => ({
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(RecurringBillServiceTable);
