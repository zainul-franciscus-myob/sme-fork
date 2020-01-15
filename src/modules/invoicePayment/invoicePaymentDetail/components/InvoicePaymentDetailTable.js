import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEntries,
  getIsCreating,
  getIsTableEmpty,
  getIsTableLoading,
  getTableEmptyMessage,
  getTotalReceived,
} from '../invoicePaymentDetailSelectors';
import { getResponsiveConfig } from './getResponsiveConfig';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import TableView from '../../../../components/TableView/TableView';
import styles from './InvoicePaymentDetailTable.module.css';

const tableConfig = {
  date: { columnName: 'Issue date' },
  invoiceNumber: { columnName: 'Invoice number' },
  status: { columnName: 'Status' },
  balanceDue: { columnName: 'Balance due ($)', align: 'right' },
  discountGiven: {
    columnName: 'Discount ($)', align: 'right',
  },
  discountedBalance: {
    columnName: 'Discounted balance ($)', align: 'right',
  },
  amountReceived: {
    columnName: 'Amount received ($)', align: 'right',
  },
};

const onAmountChange = (handler, index) => (e) => {
  const { name, rawValue } = e.target;
  handler({ name, value: rawValue, index });
};

const InvoicePaymentDetailTable = ({
  entries,
  isCreating,
  onUpdateInvoicePaymentEntries,
  totalReceived,
  isTableLoading,
  isTableEmpty,
  tableEmptyMessage,
  onAmountInputBlur,
}) => {
  const tableBody = (
    <React.Fragment>
      <Table.Body>
        {entries.map((entry, index) => (
          <Table.Row>
            <Table.RowItem {...tableConfig.date} valign="middle">{entry.date}</Table.RowItem>
            <Table.RowItem {...tableConfig.invoiceNumber} valign="middle">
              <a href={entry.link}>{entry.invoiceNumber}</a>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.status} valign="middle">
              <Label type="boxed" color={entry.statusColor}>{entry.status}</Label>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.balanceDue} valign="middle" align="right">{entry.balanceDue}</Table.RowItem>
            <Table.RowItem {...tableConfig.discountGiven}>
              <AmountInput
                name="discountAmount"
                value={entry.discountAmount}
                textAlign="right"
                disabled={!isCreating}
                onChange={onAmountChange(onUpdateInvoicePaymentEntries, index)}
                onBlur={onAmountChange(onAmountInputBlur, index)}
              />
            </Table.RowItem>
            <Table.RowItem {...tableConfig.discountedBalance} valign="middle" align="right">{entry.discountedBalance}</Table.RowItem>
            <Table.RowItem {...tableConfig.amountReceived}>
              <AmountInput
                name="paidAmount"
                value={entry.paidAmount}
                textAlign="right"
                disabled={!isCreating}
                onChange={onAmountChange(onUpdateInvoicePaymentEntries, index)}
                onBlur={onAmountChange(onAmountInputBlur, index)}
              />
            </Table.RowItem>
          </Table.Row>
        ))}
      </Table.Body>
      <div className={styles.totalReceived}>
        Total amount received
        <span>{totalReceived}</span>
      </div>
    </React.Fragment>
  );

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.date}>Issue date</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.invoiceNumber}>Invoice number</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>Status</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.balanceDue}>Balance due ($)</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.discountGiven}>Discount ($)</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.discountedBalance}>Discounted balance ($)</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amountReceived}>Amount received ($)</Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyMessage={tableEmptyMessage}
      responsiveWidths={getResponsiveConfig(tableConfig)}
    >
      {tableBody}
    </TableView>
  );
};

const mapStateToProps = state => ({
  entries: getEntries(state),
  isCreating: getIsCreating(state),
  totalReceived: getTotalReceived(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  tableEmptyMessage: getTableEmptyMessage(state),
});

export default connect(mapStateToProps)(InvoicePaymentDetailTable);
