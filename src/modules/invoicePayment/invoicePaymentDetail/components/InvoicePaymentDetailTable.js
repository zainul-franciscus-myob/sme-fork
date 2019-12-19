import { Table } from '@myob/myob-widgets';
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
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import TableView from '../../../../components/TableView/TableView';
import styles from './InvoicePaymentDetailTable.module.css';

const tableConfig = {
  invoiceNumber: { columnName: 'invoiceNumber' },
  status: { columnName: 'status', width: '10rem' },
  date: { columnName: 'date', width: '12.4rem' },
  invoiceAmount: { columnName: 'invoiceAmount', align: 'right' },
  discountGiven: {
    columnName: 'discountGiven', align: 'right',
  },
  balanceDue: {
    columnName: 'balanceDue', align: 'right',
  },
  amountReceived: {
    columnName: 'amountReceived', align: 'right',
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
            <Table.RowItem {...tableConfig.invoiceNumber} valign="middle">{entry.invoiceNumber}</Table.RowItem>
            <Table.RowItem {...tableConfig.status} valign="middle">{entry.status}</Table.RowItem>
            <Table.RowItem {...tableConfig.date} valign="middle">{entry.date}</Table.RowItem>
            <Table.RowItem {...tableConfig.invoiceAmount} valign="middle" align="right">{entry.invoiceAmount}</Table.RowItem>
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
            <Table.RowItem {...tableConfig.balanceDue} valign="middle" align="right">{entry.balanceDue}</Table.RowItem>
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
      <div className={styles.totalReceived}>{`Total received: ${totalReceived}`}</div>
    </React.Fragment>
  );

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.invoiceNumber}>Invoice Number</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>Status</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.date}>Date</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.invoiceAmount}>Invoice amount ($)</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.discountGiven}>Discount given ($)</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.balanceDue}>Balance due ($)</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amountReceived}>Amount received ($)</Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyMessage={tableEmptyMessage}
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
