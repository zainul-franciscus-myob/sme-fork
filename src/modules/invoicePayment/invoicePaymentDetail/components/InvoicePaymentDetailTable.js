import { Label, PageState, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEntries,
  getIsCreating,
  getIsCustomerEmpty,
  getIsTableEmpty,
  getIsTableLoading,
  getTotalReceived,
} from '../invoicePaymentDetailSelectors';
import { getResponsiveConfig } from './getResponsiveConfig';
import Calculator from '../../../../components/Calculator/Calculator';
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

const OverPaidInfoMessage = ({ overAmount }) => (
  <>
    <div>
      This payment will create a&nbsp;
      <b>{overAmount}</b>
      &nbsp;credit.
    </div>
    <br />
    <div>
      Go to <b>Customer returns</b> to apply the credit to an open invoice or record a refund.
    </div>
  </>
);

const InvoicePaymentDetailTable = ({
  entries,
  isCreating,
  onUpdateInvoicePaymentEntries,
  totalReceived,
  isTableLoading,
  isTableEmpty,
  isCustomerEmpty,
}) => {
  const emptyView = isCustomerEmpty
    ? <PageState title="Select the customer who paid you" description="You'll see their invoices here" />
    : <PageState title="There are no invoices" />;

  const tableBody = (
    <React.Fragment>
      <Table.Body>
        {entries.map((entry, index) => (
          <Table.Row>
            <Table.RowItem {...tableConfig.date} valign="middle">{entry.date}</Table.RowItem>
            <Table.RowItem {...tableConfig.invoiceNumber} valign="middle">
              <a href={entry.link} target="_blank" rel="noopener noreferrer">{entry.invoiceNumber}</a>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.status} valign="middle">
              <Label type="boxed" color={entry.statusColor}>{entry.status}</Label>
            </Table.RowItem>
            <Table.RowItem {...tableConfig.balanceDue} valign="middle" align="right">{entry.balanceDue}</Table.RowItem>
            <Table.RowItem {...tableConfig.discountGiven}>
              <Calculator
                name="discountAmount"
                value={entry.discountAmount}
                textAlign="right"
                disabled={!isCreating}
                onChange={onAmountChange(onUpdateInvoicePaymentEntries, index)}
                onBlur={onAmountChange(onUpdateInvoicePaymentEntries, index)}
                numeralDecimalScaleMin={2}
                numeralDecimalScaleMax={2}
              />
            </Table.RowItem>
            <Table.RowItem {...tableConfig.discountedBalance} valign="middle" align="right">{entry.discountedBalance}</Table.RowItem>
            <Table.RowItem {...tableConfig.amountReceived}>
              <Calculator
                name="paidAmount"
                value={entry.paidAmount}
                infoBody={
                  isCreating
                  && entry.overAmount
                  && <OverPaidInfoMessage overAmount={entry.overAmount} />
                }
                textAlign="right"
                disabled={!isCreating}
                onChange={onAmountChange(onUpdateInvoicePaymentEntries, index)}
                onBlur={onAmountChange(onUpdateInvoicePaymentEntries, index)}
                numeralDecimalScaleMin={2}
                numeralDecimalScaleMax={2}
              />
            </Table.RowItem>
          </Table.Row>
        ))}
      </Table.Body>
      <div className={styles.totalReceived}>
        <span>Total amount received</span>
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
      emptyView={emptyView}
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
  isCustomerEmpty: getIsCustomerEmpty(state),
});

export default connect(mapStateToProps)(InvoicePaymentDetailTable);
