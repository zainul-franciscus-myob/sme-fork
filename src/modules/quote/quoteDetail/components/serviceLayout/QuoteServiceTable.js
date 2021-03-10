import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsShowIsTaxInclusiveAndTaxCodeColumn,
  getTableData,
  getTaxCodeLabel,
} from '../../selectors/QuoteDetailSelectors';
import LineItemTableHeader from '../../../../../components/LineItemTable/LineItemTableHeader';
import QuoteServiceTableRow from './QuoteServiceTableRow';

const descriptionLabel = 'Description';
const accountLabel = 'Account';
const amountLabel = 'Amount ($)';
const jobLabel = 'Job';
const requiredLabel = 'This is required';

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
    onViewedAccountToolTip,
  },
  taxCodeLabel,
  renderJobCombobox,
  isShowIsTaxInclusiveAndTaxCodeColumn,
}) => {
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
    isShowIsTaxInclusiveAndTaxCodeColumn && (
      <LineItemTable.HeaderItem requiredLabel={requiredLabel}>
        {taxCodeLabel}
      </LineItemTable.HeaderItem>
    ),
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
  isShowIsTaxInclusiveAndTaxCodeColumn: getIsShowIsTaxInclusiveAndTaxCodeColumn(
    state
  ),
});

export default connect(mapStateToProps)(QuoteServiceTable);
