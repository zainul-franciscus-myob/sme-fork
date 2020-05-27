import { Alert, BaseTemplate, LeanEngageSurvey } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getShouldShowLeanEngage,
} from '../../selectors/DashboardSelectors';
import DashboardPayrollHeader from './DashboardPayrollHeader';
import DashboardPayrollPayrunsCard from './DashboardPayrollPayrunsCard';
import styles from './DashboardPayrollView.module.css';

const DashboardView = ({
  alert,
  onDismissAlert,
  onLinkClick,
  onReload,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const header = <DashboardPayrollHeader />;

  const leanEngageSurvey = <LeanEngageSurvey
    surveyName="dashboard-survey"
    productName="dashboard"
  />;

  const body = (
    <div className={styles.body}>
      <div />
      <div>
        <DashboardPayrollPayrunsCard
          onLinkClick={onLinkClick}
          onReload={onReload}
        />
        {leanEngageSurvey}
      </div>
      <div />
    </div>
  );

  const dashboardView = (
    <BaseTemplate>
      {alertComponent}
      {header}
      {body}
    </BaseTemplate>
  );

  return dashboardView;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  shouldShowLeanEngage: getShouldShowLeanEngage(state),
});

export default connect(mapStateToProps)(DashboardView);
