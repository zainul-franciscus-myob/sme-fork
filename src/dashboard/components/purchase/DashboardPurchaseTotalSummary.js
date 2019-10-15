import { connect } from 'react-redux';
import React from 'react';

import { getPurchaseTotalSummary } from '../../selectors/DashboardPurchaseSelectors';
import DashboardTotalSummary from '../DashboardTotalSummary';

const DashboardPurchaseTotalSummary = ({
  unpaidTotal,
  overDueTotal,
  purchaseTotal,
  purchaseTotalLabel,
  unpaidTotalLink,
  purchaseTotalLink,
}) => (
  <DashboardTotalSummary
    items={[
      { title: purchaseTotalLabel, content: purchaseTotal, link: purchaseTotalLink },
      { title: 'All open bills', content: unpaidTotal, link: unpaidTotalLink },
      { title: 'All overdue bills', content: overDueTotal },
    ]}
  />
);

const mapStateToProps = state => getPurchaseTotalSummary(state);

export default connect(mapStateToProps)(DashboardPurchaseTotalSummary);
