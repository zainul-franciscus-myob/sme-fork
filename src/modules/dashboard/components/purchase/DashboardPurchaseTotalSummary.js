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
  overDueTotalLink,
}) => (
  <DashboardTotalSummary
    items={[
      {
        title: purchaseTotalLabel,
        content: purchaseTotal,
        link: purchaseTotalLink,
      },
      {
        title: 'Open bills',
        content: unpaidTotal,
        link: unpaidTotalLink,
        tooltip: true,
      },
      {
        title: 'Overdue bills',
        content: overDueTotal,
        link: overDueTotalLink,
        tooltip: true,
      },
    ]}
  />
);

const mapStateToProps = (state) => getPurchaseTotalSummary(state);

export default connect(mapStateToProps)(DashboardPurchaseTotalSummary);
