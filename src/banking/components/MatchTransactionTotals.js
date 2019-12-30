import {
  LineItemTable,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getHasAdjustment, getTotals } from '../bankingSelectors/matchTransactionSelectors';
import styles from './MatchTransactionTotals.module.css';

const MatchTransactionTotals = ({ totals, showGroupedTotals }) => (
  <div className={styles.totals}>
    <LineItemTable.Total>
      { showGroupedTotals && <LineItemTable.Totals title="Selected transactions" amount={totals.matchAmountTotal} /> }
      { showGroupedTotals && <LineItemTable.Totals title="Adjustments" amount={totals.adjustmentsTotal} /> }
      <LineItemTable.Totals title="Subtotal" amount={totals.subtotal} />
      <LineItemTable.Totals totalAmount type={totals.isOutOfBalance && 'danger'} title="Out of balance" amount={totals.outOfBalance} />
    </LineItemTable.Total>
  </div>
);

const mapStateToProps = state => ({
  totals: getTotals(state),
  showGroupedTotals: getHasAdjustment(state),
});

export default connect(mapStateToProps)(MatchTransactionTotals);
