import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getInvoices,
  getIsCreating,
  getIsTableEmpty,
  getIsTableLoading,
} from '../applyToSaleSelectors';
import AmountInput from '../../components/autoFormatter/AmountInput/AmountInput';
import ApplyToSaleTotals from './ApplyToSaleTotals';
import TableView from '../../components/TableView/TableView';

const onAmountChange = (handler, index) => ({ target }) => {
  const { name, rawValue } = target;
  handler({ key: name, value: rawValue, index });
};

const ApplyToSaleTable = ({
  invoices,
  isCreating,
  isTableLoading,
  isTableEmpty,
  onUpdateTableAmountInput,
  onBlurTableAmountInput,
}) => {
  const tableBody = (
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

  const header = (
    <Table.Header>
      <Table.HeaderItem columnName="issueDate">Issue date</Table.HeaderItem>
      <Table.HeaderItem columnName="invoiceNumber">Invoice number</Table.HeaderItem>
      <Table.HeaderItem columnName="status">Status</Table.HeaderItem>
      <Table.HeaderItem columnName="totalAmount">Total amount ($)</Table.HeaderItem>
      <Table.HeaderItem columnName="discount">Discount ($)</Table.HeaderItem>
      <Table.HeaderItem columnName="balanceDue">Balance due ($)</Table.HeaderItem>
      <Table.HeaderItem columnName="amountApplied">Amount applied ($)</Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      header={header}
    >
      {tableBody}
    </TableView>
  );
};

const mapStateToProps = state => ({
  invoices: getInvoices(state),
  isCreating: getIsCreating(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(ApplyToSaleTable);
