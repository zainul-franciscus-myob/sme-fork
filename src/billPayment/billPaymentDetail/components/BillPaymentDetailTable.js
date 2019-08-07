import { connect } from 'react-redux';
import React from 'react';
import Table from '@myob/myob-widgets/lib/components/Table/Table';

import {
  getBillEntries,
  getIsTableEmpty,
  getIsTableLoading,
  getShouldDisableFields,
  getTableEmptyMessage,
  getTotalAmount,
} from '../BillPaymentDetailSelectors';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import TableView from '../../../components/TableView/TableView';
import styles from './BillPaymentDetailTable.module.css';

const onInputFieldChange = (handler, index) => ({ target: { name: key, rawValue: value } }) => (
  handler({ key, value, index })
);

const BillPaymentDetailTable = (props) => {
  const {
    entries,
    totalAmount,
    onUpdateTableInputField,
    shouldDisableFields,
    onAmountInputBlur,
    isTableEmpty,
    isTableLoading,
    emptyMessage,
  } = props;

  const tableBody = (
    <React.Fragment>
      <Table.Body>
        {entries.map((row, index) => (
          <Table.Row key={row.id}>
            <Table.RowItem columnName="Bill Number" valign="middle">{row.billNumber}</Table.RowItem>
            <Table.RowItem columnName="Status" valign="middle">{row.status}</Table.RowItem>
            <Table.RowItem columnName="Date" valign="middle">{row.date}</Table.RowItem>
            <Table.RowItem columnName="Bill amount ($)" valign="middle" textAlign="right">{row.billAmount}</Table.RowItem>
            <Table.RowItem columnName="Discount given ($)">
              <AmountInput
                disabled={shouldDisableFields}
                textAlign="right"
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
                textAlign="right"
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

  const header = (
    <Table.Header>
      <Table.HeaderItem columnName="billNumber">Bill number</Table.HeaderItem>
      <Table.HeaderItem columnName="status">Status</Table.HeaderItem>
      <Table.HeaderItem columnName="date">Date</Table.HeaderItem>
      <Table.HeaderItem columnName="billAmount">Bill amount ($)</Table.HeaderItem>
      <Table.HeaderItem columnName="discountAmount">Discount given ($)</Table.HeaderItem>
      <Table.HeaderItem columnName="balanceOwed">Balance due ($)</Table.HeaderItem>
      <Table.HeaderItem columnName="paidAmount">Amount paid ($)</Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyMessage={emptyMessage}
    >
      {tableBody}
    </TableView>
  );
};

const mapStateToProps = state => ({
  entries: getBillEntries(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  emptyMessage: getTableEmptyMessage(state),
  shouldDisableFields: getShouldDisableFields(state),
  totalAmount: getTotalAmount(state),
});

export default connect(mapStateToProps)(BillPaymentDetailTable);
