import { Alert, BaseTemplate, LeanEngageSurvey } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';


import {
  getAlert,
  getIsLoading,
  getPayrollWidgetFeatureToggle,
  getShouldShowBanking,
  getShouldShowLeanEngage,
  getShouldShowPayroll,
  getShouldShowPurchases,
  getShouldShowSales,
  getShouldShowTracking,
  getShouldUsePayrollLayout,
} from '../selectors/DashboardSelectors';
import DashBoardPayrollView from './payroll/DashboardPayrollView';
import DashboardBankingCard from './banking/DashboardBankingCard';
import DashboardHeader from './DashboardHeader';
import DashboardLeanEngageCard from './DashboardLeanEngageCard';
import DashboardPayrollPayrunsCard from './payroll/DashboardPayrollPayrunsCard';
import DashboardPurchaseCard from './purchase/DashboardPurchaseCard';
import DashboardSalesCard from './sales/DashboardSalesCard';
import DashboardTrackingCard from './tracking/DashboardTrackingCard';
import PageView from '../../../components/PageView/PageView';
import footerImage from './footer-right-illustration.svg';
import styles from './DashboardView.module.css';

const DashboardView = ({
  alert,
  isLoading,
  onDismissAlert,
  onLinkClick,
  onSalesReload,
  onPurchaseReload,
  onTrackingReload,
  onTrackingChange,
  onBankingReload,
  onPayrollReload,
  onBankFeedAccountChange,
  shouldShowBanking,
  shouldShowSales,
  shouldShowPurchases,
  shouldShowLeanEngage,
  shouldShowTracking,
  shouldUsePayrollLayout,
  shouldShowPayroll,
  isPayrollWidgetToggleOn,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const header = <DashboardHeader />;

  const leanEngageSurvey = shouldShowPayroll && isPayrollWidgetToggleOn ? <LeanEngageSurvey
    surveyName="dashboard-survey"
    productName="dashboard"
  /> : <DashboardLeanEngageCard />;

  const body = (
    <div className={styles.body}>
      <div className={styles.primary}>
        {shouldShowSales && (
          <DashboardSalesCard
            onLinkClick={onLinkClick}
            onReload={onSalesReload}
          />
        )}
        {shouldShowPurchases && (
          <DashboardPurchaseCard
            onLinkClick={onLinkClick}
            onReload={onPurchaseReload}
          />
        )}
        {shouldShowTracking && (
          <DashboardTrackingCard
            onChange={onTrackingChange}
            onReload={onTrackingReload}
          />
        )}
      </div>
      <div className={styles.secondary}>
        <div className={styles.secondaryCards}>
          {shouldShowBanking && (
            <DashboardBankingCard
              onReload={onBankingReload}
              onLinkClick={onLinkClick}
              onBankFeedAccountChange={onBankFeedAccountChange}
            />
          )}

          {shouldShowPayroll && isPayrollWidgetToggleOn && (
            <DashboardPayrollPayrunsCard
              onLinkClick={onLinkClick}
              onReload={onPayrollReload}
            />
          )}


          {shouldShowLeanEngage && leanEngageSurvey}
        </div>

        {!(shouldShowPayroll && isPayrollWidgetToggleOn) && <img src={footerImage} alt="" />}
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

  const payrollView = (
    <DashBoardPayrollView
      onDismissAlert={onDismissAlert}
      onLinkClick={onLinkClick}
      onReload={onPayrollReload}
    />
  );

  const view = shouldUsePayrollLayout ? payrollView : dashboardView;

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  shouldShowBanking: getShouldShowBanking(state),
  shouldShowSales: getShouldShowSales(state),
  shouldShowPurchases: getShouldShowPurchases(state),
  shouldShowLeanEngage: getShouldShowLeanEngage(state),
  shouldShowTracking: getShouldShowTracking(state),
  shouldUsePayrollLayout: getShouldUsePayrollLayout(state),
  shouldShowPayroll: getShouldShowPayroll(state),
  isLoading: getIsLoading(state),
  alert: getAlert(state),

  // @FEATURE_TOGGLE: essentials-dashboard-payroll-payrun-widget
  isPayrollWidgetToggleOn: getPayrollWidgetFeatureToggle(state),
});

export default connect(mapStateToProps)(DashboardView);
