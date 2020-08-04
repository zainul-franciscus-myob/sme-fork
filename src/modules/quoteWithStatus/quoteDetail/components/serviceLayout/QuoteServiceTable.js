import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsQuoteJobColumnEnabled,
  getTableData,
  getTaxCodeLabel,
} from '../../selectors/QuoteDetailSelectors';
import QuoteServiceTableRow from './QuoteServiceTableRow';

const descriptionLabel = 'Description';
const accountLabel = 'Account';
const amountLabel = 'Amount ($)';
const jobLabel = 'Job';
const requiredLabel = 'Required';

const onTableAddRow = (handler) => ({ id, ...partialLine }) =>
  handler(partialLine);

const onTableRemoveRow = (handler) => (index) => handler(index);

const QuoteServiceTable = ({
  footer,
  tableData,
  listeners: {
    onUpdateRow,
    onAddRow,
    onRemoveRow,
    onRowInputBlur,
    onAddAccountButtonClick,
    onAddJob,
  },
  taxCodeLabel,
  isQuoteJobColumnEnabled,
}) => {
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
    isQuoteJobColumnEnabled ? jobColumn : undefined,
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
          styles: { width: '12.4rem', align: 'right' },
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

  const labels = [
    descriptionLabel,
    accountLabel,
    amountLabel,
    jobLabel,
    taxCodeLabel,
  ];

  const renderRow = (index, _, onChange) => (
    <QuoteServiceTableRow
      index={index}
      key={index}
      onChange={onChange}
      onAddAccount={onAddAccountButtonClick}
      onAddJob={onAddJob}
      onRowInputBlur={onRowInputBlur}
      labels={labels}
      isQuoteJobColumnEnabled={isQuoteJobColumnEnabled}
    />
  );

  return (
    <LineItemTable
      labels={labels}
      columnConfig={columnConfig}
      headerItems={headerItems}
      renderRow={renderRow}
      data={tableData}
      onAddRow={onTableAddRow(onAddRow)}
      onRowChange={onUpdateRow}
      onRemoveRow={onTableRemoveRow(onRemoveRow)}
    >
      {footer}
    </LineItemTable>
  );
};

const mapStateToProps = (state) => ({
  tableData: getTableData(state),
  taxCodeLabel: getTaxCodeLabel(state),
  isQuoteJobColumnEnabled: getIsQuoteJobColumnEnabled(state),
});

export default connect(mapStateToProps)(QuoteServiceTable);
