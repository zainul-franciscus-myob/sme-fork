import { Alert, BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getShouldShowLeanEngage,
} from '../../selectors/DashboardSelectors';
import DashboardPayrollHeader from './DashboardPayrollHeader';
import styles from './DashboardNzPayrollEapView.module.css';

const DashboardView = ({ alert, onDismissAlert }) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const header = <DashboardPayrollHeader />;

  const body = (
    <div>
      <div className={styles.text}>
        {`Welcome to early access of our new Payroll. Share your feedback, report
        issues, join the conversation via our `}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://myobearlyadop-kio9027.slack.com/"
          className="clickable"
        >
          early adopters Slack team
        </a>
        {` and help shape the future of payroll.`}
      </div>
      <div className={styles.text}>
        Note: The Product is a pre-release version with limited features. We are
        incrementally adding new functionality and fixing issues.
      </div>
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

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  shouldShowLeanEngage: getShouldShowLeanEngage(state),
});

export default connect(mapStateToProps)(DashboardView);
