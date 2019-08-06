import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getInvoiceLinesTableData,
  getTotals,
} from '../invoiceItemSelectors';
import InvoiceItemTableRow from './InvoiceItemTableRow';

const columnLabels = ['Units', 'Item', 'Description', 'Unit price', 'Discount', 'Amount ($)', 'Tax code'];

const renderRow = onLineInputBlur => (index, data, onChange) => (
  <InvoiceItemTableRow
    index={index}
    key={index}
    onChange={onChange}
    onLineInputBlur={onLineInputBlur}
  />
);

const InvoiceItemTable = ({
  invoiceLines,
  totals,
  onAddTableLine,
  onChangeTableRow,
  onRemoveTableRow,
  onLineInputBlur,
}) => (
  <LineItemTable
    labels={columnLabels}
    renderRow={renderRow(onLineInputBlur)}
    data={invoiceLines}
    onAddRow={onAddTableLine}
    onRowChange={onChangeTableRow}
    onRemoveRow={onRemoveTableRow}
  >
    <LineItemTable.Total>

      <LineItemTable.Totals title="Subtotal" amount={totals.displaySubTotal} />

      <LineItemTable.Totals title="Tax" amount={totals.displayTotalTax} />

      <LineItemTable.Totals title="Invoice total" amount={totals.displayTotalAmount} />

      <LineItemTable.Totals title="Amount paid" amount={totals.displayAmountPaid} />

      <LineItemTable.Totals title="Balance due" amount={totals.displayAmountDue} />

    </LineItemTable.Total>
  </LineItemTable>
);

const mapStateToProps = state => ({
  invoiceLines: getInvoiceLinesTableData(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(InvoiceItemTable);
