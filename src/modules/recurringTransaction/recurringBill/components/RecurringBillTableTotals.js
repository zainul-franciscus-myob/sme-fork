import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmountDue,
  getFreightAmount,
  getFreightTaxCode,
  getHasFreightAmount,
  getTotalTaxLabel,
  getTotals,
} from '../selectors/RecurringBillSelectors';
import LineItemTableTotalsFormattedCurrency from '../../../../components/LineItemTable/LineItemTableTotalsFormattedCurrency';

const RecurringBillTableTotals = ({
  amountDue,
  totals: { totalAmount, totalTax, subTotal },
  totalTaxLabel,
  freightAmount,
  showFreight,
  freightTaxCode,
}) => (
  <LineItemTable.Total>
    <LineItemTableTotalsFormattedCurrency title="Subtotal" amount={subTotal} />
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
    <LineItemTableTotalsFormattedCurrency
      totalAmount
      title="Balance due"
      amount={amountDue}
    />
  </LineItemTable.Total>
);

const mapStateToProps = (state) => ({
  amountDue: getAmountDue(state),
  totals: getTotals(state),
  totalTaxLabel: getTotalTaxLabel(state),
  freightAmount: getFreightAmount(state),
  showFreight: getHasFreightAmount(state),
  freightTaxCode: getFreightTaxCode(state),
});

export default connect(mapStateToProps)(RecurringBillTableTotals);
