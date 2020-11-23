import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsBlocking,
  getIsCreating,
  getTotalTaxLabel,
  getTotals,
} from '../selectors/purchaseOrderSelectors';
import LineItemTableTotalsFormattedCurrency from '../../../../components/LineItemTable/LineItemTableTotalsFormattedCurrency';

const PurchaseOrderTableTotals = ({
  totals: { totalAmount, totalTax, subTotal },
  totalTaxLabel,
}) => (
  <LineItemTable.Total>
    <LineItemTableTotalsFormattedCurrency title="Subtotal" amount={subTotal} />
    <LineItemTableTotalsFormattedCurrency
      title={totalTaxLabel}
      amount={totalTax}
    />
    <LineItemTableTotalsFormattedCurrency
      totalAmount
      title="Total"
      amount={totalAmount}
    />
  </LineItemTable.Total>
);

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  isBlocking: getIsBlocking(state),
  totals: getTotals(state),
  totalTaxLabel: getTotalTaxLabel(state),
});

export default connect(mapStateToProps)(PurchaseOrderTableTotals);
