import { Label, Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoices, getIsCreating, getTableViewType } from '../applyToSaleSelectors';
import AmountInput from '../../components/autoFormatter/AmountInput/AmountInput';
import ApplyToSaleTotals from './ApplyToSaleTotals';
import TableViewType from '../TableViewType';
import styles from './ApplyToSaleTable.module.css';

const onAmountChange = (handler, index) => ({ target }) => {
  const { name, rawValue } = target;
  handler({ key: name, value: rawValue, index });
};

const emptyTableView = (
  <div className={styles.empty}>
    There are no invoices.
  </div>
);

const spinnerView = (
  <div className={styles.table}>
    <div className={styles.spinner}>
      <Spinner size="medium" />
    </div>
  </div>
);

const ApplyToSaleTable = ({
  invoices,
  tableViewType,
  isCreating,
  onUpdateTableAmountInput,
  onBlurTableAmountInput,
}) => {
  const tableView = (
    <React.Fragment>
      <Table.Body>
        {
          invoices.map((invoice, index) => (
            <Table.Row key={invoice.invoiceId}>
              <Table.RowItem columnName="Issue date" valign="middle">{invoice.issueDate}</Table.RowItem>
              <Table.RowItem columnName="Invoice number" valign="middle">
                <a href={invoice.link}>{invoice.invoiceNumber}</a>
              </Table.RowItem>
              <Table.RowItem columnName="Status" valign="middle">
                <Label color={invoice.labelColour} type="boxed">
                  {invoice.status}
                </Label>
              </Table.RowItem>
              <Table.RowItem columnName="Total amount ($)" valign="middle" align="right">{invoice.totalAmount}</Table.RowItem>
              <Table.RowItem columnName="Discount ($)" valign="middle">
                <AmountInput
                  textAlign="right"
                  name="discount"
                  value={invoice.displayDiscount}
                  onChange={onAmountChange(onUpdateTableAmountInput, index)}
                  onBlur={onAmountChange(onBlurTableAmountInput, index)}
                  label="discount"
                  disabled={!isCreating}
                  numeralPositiveOnly
                  hideLabel
                />
              </Table.RowItem>
              <Table.RowItem columnName="Balance due ($)" valign="middle" align="right">{invoice.balanceDue}</Table.RowItem>
              <Table.RowItem columnName="Amount applied ($)" valign="middle">
                <AmountInput
                  textAlign="right"
                  name="amountApplied"
                  value={invoice.displayAmountApplied}
                  onChange={onAmountChange(onUpdateTableAmountInput, index)}
                  onBlur={onAmountChange(onBlurTableAmountInput, index)}
                  label="amountApplied"
                  disabled={!isCreating}
                  hideLabel
                />
              </Table.RowItem>
            </Table.Row>
          ))
        }
      </Table.Body>
      <ApplyToSaleTotals />
    </React.Fragment>
  );

  const view = {
    [TableViewType.SPINNER]: spinnerView,
    [TableViewType.EMPTY]: emptyTableView,
    [TableViewType.TABLE]: tableView,
  }[tableViewType];

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem columnName="issueDate">Issue date</Table.HeaderItem>
        <Table.HeaderItem columnName="invoiceNumber">Invoice number</Table.HeaderItem>
        <Table.HeaderItem columnName="status">Status</Table.HeaderItem>
        <Table.HeaderItem columnName="totalAmount">Total amount ($)</Table.HeaderItem>
        <Table.HeaderItem columnName="discount">Discount ($)</Table.HeaderItem>
        <Table.HeaderItem columnName="balanceDue">Balance due ($)</Table.HeaderItem>
        <Table.HeaderItem columnName="amountApplied">Amount applied ($)</Table.HeaderItem>
      </Table.Header>
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  invoices: getInvoices(state),
  isCreating: getIsCreating(state),
  tableViewType: getTableViewType(state),
});

export default connect(mapStateToProps)(ApplyToSaleTable);
