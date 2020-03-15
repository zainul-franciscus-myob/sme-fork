import { PageState, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsDetailLoading, getIsEmpty } from '../../selectors/DashboardTrackingSelectors';
import DashboardTrackingChart from './DashboardTrackingChart';
import DashboardTrackingLegend from './DashboardTrackingLegend';
import emptyStateImage from './dashboard-empty-state-business-tracking.svg';
import styles from './DashboardTrackingDetail.module.css';

const DashboardTrackingDetail = ({ isDetailLoading, isEmpty }) => {
  if (isDetailLoading) return <PageState title={<Spinner size="medium" />} description="Loading" />;

  if (isEmpty) {
    return (
      <div className={styles.empty}>
        <PageState
          title="No information to show"
          description="Try selecting a different financial year,  or start entering transactions for the selected year."
          image={<img src={emptyStateImage} style={{ width: '50%' }} alt="no tracking" />}
        />
      </div>
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
