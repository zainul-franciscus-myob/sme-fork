import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmountDue,
  getAmountPaid,
  getIsBlocking,
  getIsCreating,
  getSubTotal,
  getTotalAmount,
  getTotalTax,
  getTotalTaxLabel,
} from '../selectors/billSelectors';
import LineItemTableTotalsFormattedCurrency from '../../../../components/LineItemTable/LineItemTableTotalsFormattedCurrency';
import LineItemTableTotalsInput from '../../../../components/LineItemTable/LineItemTableTotalsInput';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';

const BillTableTotals = ({
  isCreating,
  isBlocking,
  amountPaid,
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
      value={amountPaid}
      onChange={handleAmountInputChange(onUpdateBillOption)}
      onBlur={onAmountPaidBlur}
      disabled={isBlocking}
    />
  ) : (
    <LineItemTableTotalsFormattedCurrency title="Amount paid" amount={amountPaid} />
  ));

  return (
    <LineItemTable.Total>
      <LineItemTableTotalsFormattedCurrency title="Subtotal" amount={subTotal} />
      <LineItemTableTotalsFormattedCurrency title={totalTaxLabel} amount={totalTax} />
      <LineItemTableTotalsFormattedCurrency totalAmount title="Total" amount={totalAmount} />
      {amountPaidInputLine}
      <LineItemTableTotalsFormattedCurrency totalAmount title="Balance due" amount={amountDue} />
    </LineItemTable.Total>
  );
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isBlocking: getIsBlocking(state),
  amountPaid: getAmountPaid(state),
  totalAmount: getTotalAmount(state),
  amountDue: getAmountDue(state),
  subTotal: getSubTotal(state),
  totalTax: getTotalTax(state),
  totalTaxLabel: getTotalTaxLabel(state),
});


export default connect(mapStateToProps)(BillTableTotals);
