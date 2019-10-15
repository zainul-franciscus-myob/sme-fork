import { connect } from 'react-redux';
import React from 'react';

import { getSalesTotalSummary } from '../../selectors/DashboardSalesSelectors';
import DashboardTotalSummary from '../DashboardTotalSummary';

const DashboardSalesTotalSummary = ({
  unpaidTotal,
  overDueTotal,
  salesTotal,
  salesTotalLabel,
  unpaidTotalLink,
  purchaseTotalLink,
}) => (
  <DashboardTotalSummary
    items={[
      { title: salesTotalLabel, content: salesTotal, link: purchaseTotalLink },
      { title: 'All open invoices', content: unpaidTotal, link: unpaidTotalLink },
      { title: 'All overdue invoices', content: overDueTotal },
    ]}
  />
);

const mapStateToProps = state => getSalesTotalSummary(state);

export default connect(mapStateToProps)(DashboardSalesTotalSummary);
