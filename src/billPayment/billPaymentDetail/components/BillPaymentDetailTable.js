import { Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Table from '@myob/myob-widgets/lib/components/Table/Table';

import {
  getBillEntries, getShouldDisableFields, getTableViewType, getTotalAmount,
} from '../BillPaymentDetailSelectors';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import styles from './BillPaymentDetailTable.css';
import tableViewTypes from '../tableViewTypes';

const onInputFieldChange = (handler, index) => ({ target: { name: key, rawValue: value } }) => (
  handler({ key, value, index })
);

const emptyTableView = (
  <div className={styles.empty}>
    There are no bills.
  </div>
);

const emptySupplierView = (
  <div className={styles.empty}>
    Please select a supplier.
  </div>
);

const spinnerView = (
  <div className={styles.table}>
    <div className={styles.spinner}>
      <Spinner size="medium" />
    </div>
  </div>
);

const BillPaymentDetailTable = (props) => {
  const {
    entries,
    totalAmount,
    viewType,
    onUpdateTableInputField,
    shouldDisableFields,
    onAmountInputBlur,
  } = props;

  const tableView = (
    <React.Fragment>
      <Table.Body>
        {entries.map((row, index) => (
          <Table.Row key={row.id}>
            <Table.RowItem columnName="Bill Number" valign="middle">{row.billNumber}</Table.RowItem>
            <Table.RowItem columnName="Status" valign="middle">{row.status}</Table.RowItem>
            <Table.RowItem columnName="Date" valign="middle">{row.date}</Table.RowItem>
            <Table.RowItem columnName="Bill amount ($)" valign="middle" align="right">{row.billAmount}</Table.RowItem>
            <Table.RowItem columnName="Discount given ($)">
              <AmountInput
                disabled={shouldDisableFields}
                align="right"
                name="discountAmount"
                value={row.discountAmount}
                onChange={onInputFieldChange(onUpdateTableInputField, index)}
                onBlur={onInputFieldChange(onAmountInputBlur, index)}
                label="discountAmount"
                hideLabel
                numeralPositiveOnly
              />
            </Table.RowItem>
            <Table.RowItem
              columnName="Balance due ($)"
              align="right"
              valign="middle"
            >
              {row.balanceOwed}
            </Table.RowItem>
            <Table.RowItem columnName="Paid Amount ($)">
              <AmountInput
                disabled={shouldDisableFields}
                align="right"
                name="paidAmount"
                value={row.paidAmount}
                onChange={onInputFieldChange(onUpdateTableInputField, index)}
                onBlur={onInputFieldChange(onAmountInputBlur, index)}
                label="paidAmount"
                hideLabel
              />
            </Table.RowItem>
          </Table.Row>
        ))}
      </Table.Body>
      <div className={styles.totalPaid}>
        {`Total paid: ${totalAmount}`}
      </div>
    </React.Fragment>
  );

  const view = {
    [tableViewTypes.spinner]: spinnerView,
    [tableViewTypes.emptyTable]: emptyTableView,
    [tableViewTypes.emptySupplier]: emptySupplierView,
    [tableViewTypes.default]: tableView,
  }[viewType] || tableView;

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem columnName="billNumber">Bill number</Table.HeaderItem>
        <Table.HeaderItem columnName="status">Status</Table.HeaderItem>
        <Table.HeaderItem columnName="date">Date</Table.HeaderItem>
        <Table.HeaderItem columnName="billAmount">Bill amount ($)</Table.HeaderItem>
        <Table.HeaderItem columnName="discountAmount">Discount given ($)</Table.HeaderItem>
        <Table.HeaderItem columnName="balanceOwed">Balance due ($)</Table.HeaderItem>
        <Table.HeaderItem columnName="paidAmount">Amount paid ($)</Table.HeaderItem>
      </Table.Header>
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  entries: getBillEntries(state),
  viewType: getTableViewType(state),
  shouldDisableFields: getShouldDisableFields(state),
  totalAmount: getTotalAmount(state),
});

BillPaymentDetailTable.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  shouldDisableFields: PropTypes.bool.isRequired,
  onUpdateTableInputField: PropTypes.func.isRequired,
  onAmountInputBlur: PropTypes.func.isRequired,
  viewType: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(BillPaymentDetailTable);
