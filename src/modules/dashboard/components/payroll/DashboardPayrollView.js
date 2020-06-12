import { Alert, BaseTemplate, LeanEngageSurvey } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getShouldShowLeanEngage,
} from '../../selectors/DashboardSelectors';
import DashboardPayrollHeader from './DashboardPayrollHeader';
import DashboardPayrollPayrunsCard from './DashboardPayrollPayrunsCard';
import DashboardPayrollReportsCard from './DashboardPayrollReportsCard';
import styles from './DashboardPayrollView.module.css';

const DashboardView = ({
  alert,
  onDismissAlert,
  onLinkClick,
  onPayrollReload,
  onPayrollReportsReload,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const header = <DashboardPayrollHeader />;

  const leanEngageSurvey = <LeanEngageSurvey
    surveyType="survey"
    surveyName="micro-payroll-dashboard"
    productName="dashboard"
  />;

  const body = (
    <div className={styles.body}>
      <div>
        <DashboardPayrollPayrunsCard
          onLinkClick={onLinkClick}
          onReload={onPayrollReload}
        />
      </div>
      <div>
        <DashboardPayrollReportsCard
          onLinkClick={onLinkClick}
          onReload={onPayrollReportsReload}
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
