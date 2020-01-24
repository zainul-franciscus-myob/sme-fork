import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTaxCodeLabel } from '../selectors/billSelectors';
import BillLineItemTable from './BillLineItemTable';
import BillServiceTableRow from './BillServiceTableRow';

const renderRow = (onRowInputBlur, onAddAccount) => (index, _, onChange, labels) => (
  <BillServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onRowInputBlur={onRowInputBlur}
    onAddAccount={onAddAccount}
    labels={labels}
  />
);

const BillServiceTable = ({
  listeners: {
    onAddRow,
    onRowChange,
    onRowInputBlur,
    onRemoveRow,
    onAddAccount,
    onUpdateBillOption,
    onAmountPaidBlur,
  },
  taxCodeLabel,
}) => {
  const descriptionLabel = 'Description';
  const accountLabel = 'Account';
  const amountLabel = 'Amount ($)';
  const requiredLabel = 'This is required';

  const labels = [descriptionLabel, accountLabel, amountLabel, taxCodeLabel];

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
      renderRow={renderRow(onRowInputBlur, onAddAccount)}
      columnConfig={columnConfig}
      onAddRow={onAddRow}
      onRowChange={onRowChange}
      onRemoveRow={onRemoveRow}
      headerItems={headerItems}
      onUpdateBillOption={onUpdateBillOption}
      onAmountPaidBlur={onAmountPaidBlur}
    />
  );
};

const mapStateToProps = state => ({
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(BillServiceTable);
