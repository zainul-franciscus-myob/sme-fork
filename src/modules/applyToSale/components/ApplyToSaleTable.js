import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoices, getIsCreating, getIsTableEmpty } from '../applyToSaleSelectors';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import ApplyToSaleTotals from './ApplyToSaleTotals';
import TableView from '../../../components/TableView/TableView';
import getApplyToSaleTableResponsiveConfig from './getApplyToSaleTableResponsiveConfig';

const onAmountChange = (handler, index) => ({ target }) => {
  const { name, rawValue } = target;
  handler({ key: name, value: rawValue, index });
};

const ApplyToSaleTable = ({
  invoices,
  isCreating,
  isTableEmpty,
  onUpdateTableAmountInput,
  onBlurTableAmountInput,
}) => {
  const tableConfig = {
    issueDate: { columnName: 'Issue date', valign: 'middle' },
    invoiceNumber: { columnName: 'Invoice number', valign: 'middle' },
    status: { columnName: 'Status', valign: 'middle' },
    totalAmount: { columnName: 'Balance due ($)', valign: 'middle', align: 'right' },
    discount: { columnName: 'Discount ($)', valign: 'middle', align: 'right' },
    discountBalance: { columnName: 'Discounted balance ($)', valign: 'middle', align: 'right' },
    amountApplied: { columnName: 'Amount applied ($)', valign: 'middle', align: 'right' },
  };


  const tableBody = (
    <React.Fragment>
      <Table.Body>
        {
          invoices.map((invoice, index) => (
            <Table.Row key={invoice.invoiceId}>
              <Table.RowItem {...tableConfig.issueDate}>{invoice.issueDate}</Table.RowItem>
              <Table.RowItem {...tableConfig.invoiceNumber}>
                <a href={invoice.link}>{invoice.invoiceNumber}</a>
              </Table.RowItem>
              <Table.RowItem {...tableConfig.status}>
                <Label color={invoice.labelColour} type="boxed">
                  {invoice.status}
                </Label>
              </Table.RowItem>
              <Table.RowItem {...tableConfig.totalAmount}>{invoice.totalAmount}</Table.RowItem>
              <Table.RowItem {...tableConfig.discount}>
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
              <Table.RowItem {...tableConfig.discountBalance}>{invoice.balanceDue}</Table.RowItem>
              <Table.RowItem {...tableConfig.amountApplied}>
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
      <Table.HeaderItem {...tableConfig.issueDate}>
        {tableConfig.issueDate.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.invoiceNumber}>
        {tableConfig.invoiceNumber.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        {tableConfig.status.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.totalAmount}>
        {tableConfig.totalAmount.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.discount}>
        {tableConfig.discount.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.discountBalance}>
        {tableConfig.discountBalance.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amountApplied}>
        {tableConfig.amountApplied.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      isEmpty={isTableEmpty}
      header={header}
      responsiveWidths={getApplyToSaleTableResponsiveConfig(tableConfig)}
    >
      {tableBody}
    </TableView>
  );
};

const mapStateToProps = state => ({
  invoices: getInvoices(state),
  isCreating: getIsCreating(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(ApplyToSaleTable);
