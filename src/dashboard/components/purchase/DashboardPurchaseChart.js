import { connect } from 'react-redux';
import React from 'react';

import { getPurchaseChart } from '../../selectors/DashboardPurchaseSelectors';
import SalesOrPurchaseSummaryChart from '../SalesOrPurchaseSummaryChart';

const DashboardPurchaseChart = ({ data }) => (
  <SalesOrPurchaseSummaryChart title="Total purchases" data={data} />
);

const mapStateToProps = state => ({
  data: getPurchaseChart(state),
});

export default connect(mapStateToProps)(DashboardPurchaseChart);
