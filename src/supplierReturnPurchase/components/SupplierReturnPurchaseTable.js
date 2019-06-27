import { Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import Table from '@myob/myob-widgets/lib/components/Table/Table';

import {
  getIsCreating, getPurchases, getTableViewType, getTotalAmountApplied,
} from '../SupplierReturnPurchaseSelector';
import AmountInput from '../../components/autoFormatter/AmountInput/AmountInput';
import styles from './SupplierReturnPurchaseTable.css';

const onAmountChange = (handler, index) => ({ target }) => {
  const { name, rawValue } = target;
  handler({ key: name, value: rawValue, index });
};

const tableViewTypes = {
  spinner: 'spinner',
  emptyTable: 'emptyTable',
  default: '',
};

const tableConfig = {
  date: { columnName: 'Date', valign: 'middle' },
  purchaseNumber: { columnName: 'Purchase No.', valign: 'middle' },
  status: { columnName: 'Status', valign: 'middle' },
  amount: { columnName: 'Amount ($)', valign: 'middle' },
  discount: { columnName: 'Discount ($)', valign: 'middle', textAlign: 'right' },
  owed: { columnName: 'Owed ($)', valign: 'middle', textAlign: 'right' },
  amountApplied: { columnName: 'Amount applied ($)', valign: 'middle' },
};

const emptyTableView = (
  <div className={styles.empty}>
    There are no purchases.
  </div>
);

const spinnerView = (
  <div className={styles.table}>
    <div className={styles.spinner}>
      <Spinner size="medium" />
    </div>
  </div>
);

const SupplierReturnPurchaseTable = (props) => {
  const {
    purchases,
    totalAmountApplied,
    tableViewType,
    isCreating,
    onUpdateTableAmountFields,
    onFormatAmountInput,
  } = props;
  const tableView = (
    <React.Fragment>
      <Table.Body>
        {
          purchases.map((row, index) => (
            <Table.Row key={row.id}>
              <Table.RowItem {...tableConfig.date}>{row.date}</Table.RowItem>
              <Table.RowItem {...tableConfig.purchaseNumber}>
                <a href={row.link}>{row.purchaseNumber}</a>
              </Table.RowItem>
              <Table.RowItem {...tableConfig.status}>{row.status}</Table.RowItem>
              <Table.RowItem {...tableConfig.amount}>{row.amount}</Table.RowItem>
              <Table.RowItem {...tableConfig.discount}>
                <AmountInput
                  textAlign="right"
                  name="discount"
                  value={row.discount}
                  onChange={onAmountChange(onUpdateTableAmountFields, index)}
                  onBlur={onAmountChange(onFormatAmountInput, index)}
                  label="discount"
                  disabled={!isCreating}
                  hideLabel
                />
              </Table.RowItem>
              <Table.RowItem {...tableConfig.owed}>{row.owed}</Table.RowItem>
              <Table.RowItem {...tableConfig.amountApplied}>
                <AmountInput
                  textAlign="right"
                  name="amountApplied"
                  value={row.amountApplied}
                  onChange={onAmountChange(onUpdateTableAmountFields, index)}
                  onBlur={onAmountChange(onFormatAmountInput, index)}
                  label="amountApplied"
                  disabled={!isCreating}
                  hideLabel
                />
              </Table.RowItem>
            </Table.Row>
          ))
        }
      </Table.Body>
      <div className={styles.totalPaid}>
        {`Total Applied: ${totalAmountApplied}`}
      </div>
    </React.Fragment>
  );

  const view = {
    [tableViewTypes.spinner]: spinnerView,
    [tableViewTypes.emptyTable]: emptyTableView,
    [tableViewTypes.default]: tableView,
  }[tableViewType] || tableView;

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem columnName="date">Date</Table.HeaderItem>
        <Table.HeaderItem columnName="purchaseNumber">Purchase No.</Table.HeaderItem>
        <Table.HeaderItem columnName="status">Status</Table.HeaderItem>
        <Table.HeaderItem columnName="amount">Amount ($)</Table.HeaderItem>
        <Table.HeaderItem columnName="discount">Discount ($)</Table.HeaderItem>
        <Table.HeaderItem columnName="owed">Owed ($)</Table.HeaderItem>
        <Table.HeaderItem columnName="amountApplied">Amount Applied ($)</Table.HeaderItem>
      </Table.Header>
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  purchases: getPurchases(state),
  totalAmountApplied: getTotalAmountApplied(state),
  isCreating: getIsCreating(state),
  tableViewType: getTableViewType(state),
});

export default connect(mapStateToProps)(SupplierReturnPurchaseTable);
