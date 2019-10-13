import { connect } from 'react-redux';
import React from 'react';

import { getPurchaseTotalSummary } from '../../selectors/DashboardPurchaseSelectors';
import DashboardTotalSummary from '../DashboardTotalSummary';

const DashboardPurchaseTotalSummary = ({
  unpaidTotal,
  overDueTotal,
  purchaseTotal,
  purchaseTotalLabel,
  billListLink,
}) => (
  <DashboardTotalSummary
    items={[
      { title: purchaseTotalLabel, content: purchaseTotal, link: billListLink },
      { title: 'All open bills', content: unpaidTotal, link: billListLink },
      { title: 'All overdue bills', content: overDueTotal },
    ]}
  />
);

const mapStateToProps = state => getPurchaseTotalSummary(state);

export default connect(mapStateToProps)(DashboardPurchaseTotalSummary);
