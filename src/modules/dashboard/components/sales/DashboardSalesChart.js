import { connect } from 'react-redux';
import React from 'react';

import { getSalesChart } from '../../selectors/DashboardSalesSelectors';
import SalesOrPurchaseSummaryChart from '../SalesOrPurchaseSummaryChart';

const DashboardSalesChart = ({ data }) => (
  <SalesOrPurchaseSummaryChart title="Total sales" data={data} />
);

const mapStateToProps = state => ({
  data: getSalesChart(state),
});

export default connect(mapStateToProps)(DashboardSalesChart);
