import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmountDue,
  getAmountPaid,
  getDisplayAmountPaid,
  getIsBlocking,
  getIsCreating,
  getSubTotal,
  getTotalAmount,
  getTotalTax,
  getTotalTaxLabel,
} from '../selectors/billSelectors';
import LineItemTableTotalsInput from '../../../../components/LineItemTable/LineItemTableTotalsInput';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';

const BillTableTotals = ({
  isCreating,
  isBlocking,
  displayAmountPaid,
  totalAmount,
  amountDue,
  subTotal,
  totalTax,
  totalTaxLabel,
  onUpdateBillOption,
  onAmountPaidBlur,
}) => {
  const amountPaidInputLine = (isCreating ? (
    <LineItemTableTotalsInput
      label="Amount paid ($)"
      name="amountPaid"
      value={displayAmountPaid}
      onChange={handleAmountInputChange(onUpdateBillOption)}
      onBlur={onAmountPaidBlur}
      disabled={isBlocking}
    />
  ) : (
    <LineItemTable.Totals title="Amount paid" amount={displayAmountPaid} />
  ));

  return (
    <LineItemTable.Total>
      <LineItemTable.Totals title="Subtotal" amount={subTotal} />
      <LineItemTable.Totals title={totalTaxLabel} amount={totalTax} />
      <LineItemTable.Totals totalAmount title="Total" amount={totalAmount} />
      {amountPaidInputLine}
      <LineItemTable.Totals totalAmount title="Balance due" amount={amountDue} />
    </LineItemTable.Total>
  );
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isBlocking: getIsBlocking(state),
  displayAmountPaid: getDisplayAmountPaid(state),
  amountPaid: getAmountPaid(state),
  totalAmount: getTotalAmount(state),
  amountDue: getAmountDue(state),
  subTotal: getSubTotal(state),
  totalTax: getTotalTax(state),
  totalTaxLabel: getTotalTaxLabel(state),
});


export default connect(mapStateToProps)(BillTableTotals);
