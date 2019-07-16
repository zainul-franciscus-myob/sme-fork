import { Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  DEFAULT_TABLE,
  EMPTY_CUSTOMER_TABLE,
  EMPTY_TABLE,
  LOADING_TABLE,
} from '../../InvoicePaymentTableViewTypes';
import {
  getEntries,
  getIsCreating,
  getTableViewType,
  getTotalReceived,
} from '../invoicePaymentDetailSelectors';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import styles from './InvoicePaymentDetailTable.module.css';

const spinnerView = (
  <div className={styles.container}>
    <Spinner size="medium" />
  </div>
);

const emptyTableView = (
  <div className={styles.container}>
    There are no invoices.
  </div>
);

const emptyCustomerView = (
  <div className={styles.container}>
    Please select a customer.
  </div>
);

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
  tableViewType,
  onAmountInputBlur,
}) => {
  const tableView = (
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

  const view = {
    [EMPTY_CUSTOMER_TABLE]: emptyCustomerView,
    [EMPTY_TABLE]: emptyTableView,
    [LOADING_TABLE]: spinnerView,
    [DEFAULT_TABLE]: tableView,
  }[tableViewType];

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.invoiceNumber}>Invoice Number</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.status}>Status</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.date}>Date</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.invoiceAmount}>Invoice amount ($)</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.discountGiven}>Discount given ($)</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.balanceDue}>Balance due ($)</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.amountReceived}>Amount received ($)</Table.HeaderItem>
      </Table.Header>
      {view}
    </Table>
  );
};

const entryPropType = {
  id: PropTypes.string.isRequired,
  invoiceNumber: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  invoiceAmount: PropTypes.string.isRequired,
  paidAmount: PropTypes.string.isRequired,
  discountAmount: PropTypes.string.isRequired,
};

InvoicePaymentDetailTable.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape(entryPropType)).isRequired,
  isCreating: PropTypes.bool.isRequired,
  onAmountInputBlur: PropTypes.func.isRequired,
  onUpdateInvoicePaymentEntries: PropTypes.func.isRequired,
  totalReceived: PropTypes.string.isRequired,
  tableViewType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  entries: getEntries(state),
  isCreating: getIsCreating(state),
  totalReceived: getTotalReceived(state),
  tableViewType: getTableViewType(state),
});

export default connect(mapStateToProps)(InvoicePaymentDetailTable);
