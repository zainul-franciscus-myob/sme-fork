import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHasAdjustment,
  getTotals,
} from '../bankingSelectors/matchTransactionSelectors';
import TotalsContainer from './TotalsContainer';

const MatchTransactionTotals = ({ totals, showGroupedTotals }) => (
  <TotalsContainer>
    {showGroupedTotals && (
      <LineItemTable.Totals
        title="Selected transactions"
        amount={totals.matchAmountTotal}
      />
    )}
    {showGroupedTotals && (
      <LineItemTable.Totals
        title="Adjustments"
        amount={totals.adjustmentsTotal}
      />
    )}
    <LineItemTable.Totals title="Subtotal" amount={totals.subtotal} />
    <LineItemTable.Totals
      totalAmount
      type={totals.isOutOfBalance && 'danger'}
      title="Out of balance"
      amount={totals.outOfBalance}
    />
  </TotalsContainer>
);

const mapStateToProps = (state) => ({
  totals: getTotals(state),
  showGroupedTotals: getHasAdjustment(state),
});

export default connect(mapStateToProps)(MatchTransactionTotals);
