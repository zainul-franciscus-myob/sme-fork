import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailTotals } from '../selectors/invoiceDetailSelectors';
import LineItemTableTotalsInput from '../../../components/LineItemTable/LineItemTableTotalsInput';

const onAmountInputChange = handler => e => handler(e.target.rawValue);

const InvoiceDetailTotals = ({
  subTotal,
  totalTax,
  totalAmount,
  amountPaid,
  amountDue,
  isCreating,
  onChange,
}) => {
  const amountPaidInputLine = isCreating ? (
    <LineItemTableTotalsInput
      label="Amount paid"
      value={amountPaid}
      handler={onAmountInputChange(onChange)}
    />
  ) : (
    <LineItemTable.Totals title="Amount paid" amount={amountPaid} />
  );

  return (
    <LineItemTable.Total>
      <LineItemTable.Totals title="Subtotal" amount={subTotal} />
      <LineItemTable.Totals title="Tax" amount={totalTax} />
      <LineItemTable.Totals title="Invoice total" amount={totalAmount} />
      {amountPaidInputLine}
      <LineItemTable.Totals title="Balance due" amount={amountDue} />
    </LineItemTable.Total>
  );
};

const mapStateToProps = state => getInvoiceDetailTotals(state);

export default connect(mapStateToProps)(InvoiceDetailTotals);
