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
  invoiceTotalLink,
  overDueTotalLink,
}) => (
  <DashboardTotalSummary
    items={[
      { title: salesTotalLabel, content: salesTotal, link: invoiceTotalLink },
      {
        title: 'Open invoices',
        content: unpaidTotal,
        link: unpaidTotalLink,
        tooltip: true,
      },
      {
        title: 'Overdue invoices',
        content: overDueTotal,
        link: overDueTotalLink,
        tooltip: true,
      },
    ]}
  />
);

const mapStateToProps = (state) => getSalesTotalSummary(state);

export default connect(mapStateToProps)(DashboardSalesTotalSummary);
