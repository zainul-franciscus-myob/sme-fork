import { PageState, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsDetailLoading, getIsEmpty } from '../../selectors/DashboardTrackingSelectors';
import DashboardTrackingChart from './DashboardTrackingChart';
import DashboardTrackingLegend from './DashboardTrackingLegend';
import styles from './DashboardTrackingDetail.module.css';

const DashboardTrackingDetail = ({
  isDetailLoading,
  isEmpty,
}) => {
  if (isDetailLoading) {
    return <PageState title={<Spinner size="medium" />} description="Loading" />;
  }

  if (isEmpty) {
    return (
      <PageState
        description="See how your business is performing with income, expenses and profit at a glance."
      />
    );
  }

  return (
    <div className={styles.chartContainer}>
      <DashboardTrackingLegend />
      <div className={styles.chart}>
        <DashboardTrackingChart />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isDetailLoading: getIsDetailLoading(state),
  isEmpty: getIsEmpty(state),
});

export default connect(mapStateToProps)(DashboardTrackingDetail);
