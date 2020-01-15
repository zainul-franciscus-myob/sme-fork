import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailTotals } from '../selectors/invoiceDetailSelectors';
import LineItemTableTotalsInput from '../../../../components/LineItemTable/LineItemTableTotalsInput';

const onAmountInputChange = handler => e => handler(e.target.rawValue);

const InvoiceDetailTotals = ({
  subTotal,
  totalTax,
  totalAmount,
  amountPaid,
  amountDue,
  isCreating,
  onChange,
  taxLabel,
}) => {
  const amountPaidInputLine = isCreating ? (
    <LineItemTableTotalsInput
      label="Amount paid ($)"
      value={amountPaid}
      onChange={onAmountInputChange(onChange)}
    />
  ) : (
    <LineItemTable.Totals title="Amount paid" amount={amountPaid} />
  );

  return (
    <LineItemTable.Total>
      <LineItemTable.Totals title="Subtotal" amount={subTotal} />
      <LineItemTable.Totals title={taxLabel} amount={totalTax} />
      <LineItemTable.Totals title="Total amount" totalAmount amount={totalAmount} />
      {amountPaidInputLine}
      <LineItemTable.Totals title="Balance due" totalAmount amount={amountDue} />
    </LineItemTable.Total>
  );
};

const mapStateToProps = state => getInvoiceDetailTotals(state);

export default connect(mapStateToProps)(InvoiceDetailTotals);
