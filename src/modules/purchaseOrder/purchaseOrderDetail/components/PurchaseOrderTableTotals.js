import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmountDue,
  getAmountPaid,
  getIsBlocking,
  getIsCreating,
  getTotalTaxLabel,
  getTotals,
} from '../selectors/purchaseOrderSelectors';
import LineItemTableTotalsFormattedCurrency from '../../../../components/LineItemTable/LineItemTableTotalsFormattedCurrency';
import LineItemTableTotalsInput from '../../../../components/LineItemTable/LineItemTableTotalsInput';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';

const PurchaseOrderTableTotals = ({
  isCreating,
  isBlocking,
  amountPaid,
  amountDue,
  onUpdatePurchaseOrderOption,
  totals: { totalAmount, totalTax, subTotal },
  totalTaxLabel,
}) => {
  const amountPaidInputLine = isCreating ? (
    <LineItemTableTotalsInput
      label="Amount paid ($)"
      name="amountPaid"
      value={amountPaid}
      onChange={handleAmountInputChange(onUpdatePurchaseOrderOption)}
      disabled={isBlocking}
    />
  ) : (
    <LineItemTableTotalsFormattedCurrency
      title="Amount paid"
      amount={amountPaid}
    />
  );

  return (
    <LineItemTable.Total>
      <LineItemTableTotalsFormattedCurrency
        title="Subtotal"
        amount={subTotal}
      />
      <LineItemTableTotalsFormattedCurrency
        title={totalTaxLabel}
        amount={totalTax}
      />
      <LineItemTableTotalsFormattedCurrency
        totalAmount
        title="Total"
        amount={totalAmount}
      />
      {amountPaidInputLine}
      <LineItemTableTotalsFormattedCurrency
        totalAmount
        title="Balance due"
        amount={amountDue}
      />
    </LineItemTable.Total>
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  isBlocking: getIsBlocking(state),
  amountPaid: getAmountPaid(state),
  amountDue: getAmountDue(state),
  totals: getTotals(state),
  totalTaxLabel: getTotalTaxLabel(state),
});

export default connect(mapStateToProps)(PurchaseOrderTableTotals);
