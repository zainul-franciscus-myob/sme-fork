import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmountDue,
  getAmountPaid,
  getFreightAmount,
  getFreightTaxCode,
  getHasFreightAmount,
  getIsBlocking,
  getIsCreating,
  getTotalTaxLabel,
  getTotals,
} from '../selectors/billSelectors';
import LineItemTableTotalsFormattedCurrency from '../../../../components/LineItemTable/LineItemTableTotalsFormattedCurrency';
import LineItemTableTotalsInput from '../../../../components/LineItemTable/LineItemTableTotalsInput';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';

const BillTableTotals = ({
  isCreating,
  isBlocking,
  amountPaid,
  amountDue,
  totals: { totalAmount, totalTax, subTotal },
  totalTaxLabel,
  onUpdateBillOption,
  freightAmount,
  showFreight,
  freightTaxCode,
}) => {
  const amountPaidInputLine = isCreating ? (
    <LineItemTableTotalsInput
      label="Amount paid ($)"
      name="amountPaid"
      value={amountPaid}
      onChange={handleAmountInputChange(onUpdateBillOption)}
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
      {showFreight && (
        <LineItemTableTotalsFormattedCurrency
          title="Freight"
          amount={freightAmount}
          note={freightTaxCode}
        />
      )}
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
  freightAmount: getFreightAmount(state),
  showFreight: getHasFreightAmount(state),
  freightTaxCode: getFreightTaxCode(state),
});

export default connect(mapStateToProps)(BillTableTotals);
