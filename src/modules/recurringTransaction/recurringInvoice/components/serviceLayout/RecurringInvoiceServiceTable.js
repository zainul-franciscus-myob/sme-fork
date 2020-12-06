import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getTableData,
  getTaxCodeLabel,
} from '../../selectors/RecurringInvoiceSelectors';
import InvoiceServiceTableRow from './RecurringInvoiceServiceTableRow';

const RecurringInvoiceServiceTable = ({
  tableData,
  taxCodeLabel,
  footer,
  listeners: {
    onUpdateRow,
    onAddRow,
    onUpdateAmount,
    onRemoveRow,
    onAddAccount,
    onLoadAccounts,
  },
  renderJobCombobox,
}) => {
  const descriptionLabel = 'Description';
  const accountLabel = 'Account';
  const amountLabel = 'Amount ($)';
  const jobLabel = 'Job';
  const requiredLabel = 'This is required';

  const headerItems = [
    <LineItemTable.HeaderItem>{descriptionLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {accountLabel}
    </LineItemTable.HeaderItem>,
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
          styles: { width: '9rem' },
        },
        {
          columnName: taxCodeLabel,
          styles: { width: '9rem' },
        },
      ],
    },
  ];

  const labels = [
    descriptionLabel,
    accountLabel,
    amountLabel,
    jobLabel,
    taxCodeLabel,
  ];

  const renderRow = (index, _, onChange) => (
    <InvoiceServiceTableRow
      index={index}
      key={index}
      labels={labels}
      onChange={onChange}
      onUpdateAmount={onUpdateAmount}
      onAddAccount={onAddAccount}
      onLoadAccounts={onLoadAccounts}
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
});

export default connect(mapStateToProps)(RecurringInvoiceServiceTable);
