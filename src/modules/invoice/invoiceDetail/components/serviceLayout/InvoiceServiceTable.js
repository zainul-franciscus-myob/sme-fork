import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsInvoiceJobColumnEnabled,
  getIsPreConversion,
  getTableData,
  getTaxCodeLabel,
} from '../../selectors/invoiceDetailSelectors';
import InvoiceServiceTableRow from './InvoiceServiceTableRow';
import styles from './InvoiceServiceTable.module.css';

const InvoiceServiceTable = ({
  tableData,
  taxCodeLabel,
  footer,
  listeners: {
    onUpdateRow,
    onAddRow,
    onUpdateAmount,
    onRemoveRow,
    onAddAccount,
    onAddJob,
    onLoadAccounts,
    onLoadJobs,
  },
  isInvoiceJobColumnEnabled,
  isPreConversion,
}) => {
  const descriptionLabel = 'Description';
  const accountLabel = 'Account';
  const amountLabel = 'Amount ($)';
  const jobLabel = 'Job';
  const requiredLabel = 'This is required';

  const jobColumn = (
    <LineItemTable.HeaderItem>{jobLabel}</LineItemTable.HeaderItem>
  );

  const headerItems = [
    <LineItemTable.HeaderItem>{descriptionLabel}</LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {accountLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
      {amountLabel}
    </LineItemTable.HeaderItem>,
    isInvoiceJobColumnEnabled ? jobColumn : undefined,
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
      onAddJob={onAddJob}
      onLoadAccounts={onLoadAccounts}
      onLoadJobs={onLoadJobs}
      isInvoiceJobColumnEnabled={isInvoiceJobColumnEnabled}
    />
  );

  return (
    <div className={isPreConversion ? styles.table__hideNewRow : ''}>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  tableData: getTableData(state),
  taxCodeLabel: getTaxCodeLabel(state),
  isInvoiceJobColumnEnabled: getIsInvoiceJobColumnEnabled(state),
  isPreConversion: getIsPreConversion(state),
});

export default connect(mapStateToProps)(InvoiceServiceTable);
