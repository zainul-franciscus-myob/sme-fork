import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmountPaid,
  getInvoiceLinesTableData,
  getIsCreating,
  getTotals,
} from '../invoiceItemSelectors';
import InvoiceItemTableRow from './InvoiceItemTableRow';
import LineItemTableTotalsInput
  from '../../../../components/LineItemTable/LineItemTableTotalsInput';

const columnLabels = ['Units', 'Item', 'Description', 'Unit price', 'Discount', 'Amount ($)', 'Tax code'];

const renderRow = onLineInputBlur => (index, data, onChange) => (
  <InvoiceItemTableRow
    index={index}
    key={index}
    onChange={onChange}
    onLineInputBlur={onLineInputBlur}
  />
);

const onAmountInputChange = handler => e => handler(e.target.value);

const InvoiceItemTable = ({
  invoiceLines,
  totals,
  onAddTableLine,
  onChangeTableRow,
  onRemoveTableRow,
  onLineInputBlur,
  isCreating,
  createAmountToPay,
  onChangeAmountToPay,
}) => {
  const {
    displaySubTotal,
    displayTotalTax,
    displayTotalAmount,
    displayAmountDue,
    displayAmountPaid,
  } = totals;

  const amountPaidInputLine = () => (isCreating ? (
    <LineItemTableTotalsInput
      label="Amount paid"
      value={createAmountToPay}
      handler={onAmountInputChange(onChangeAmountToPay)}
    />
  ) : (
    <LineItemTable.Totals title="Amount paid" amount={displayAmountPaid} />
  ));

  return (
    <LineItemTable
      labels={columnLabels}
      renderRow={renderRow(onLineInputBlur)}
      data={invoiceLines}
      onAddRow={onAddTableLine}
      onRowChange={onChangeTableRow}
      onRemoveRow={onRemoveTableRow}
    >
      <LineItemTable.Total>

        <LineItemTable.Totals title="Subtotal" amount={displaySubTotal} />

        <LineItemTable.Totals title="Tax" amount={displayTotalTax} />

        <LineItemTable.Totals title="Invoice total" amount={displayTotalAmount} />

        {amountPaidInputLine()}

        <LineItemTable.Totals title="Balance due" amount={displayAmountDue} />

      </LineItemTable.Total>
    </LineItemTable>
  );
};

const mapStateToProps = state => ({
  invoiceLines: getInvoiceLinesTableData(state),
  isCreating: getIsCreating(state),
  totals: getTotals(state),
  createAmountToPay: getAmountPaid(state),
});

export default connect(mapStateToProps)(InvoiceItemTable);
