import { Alert, BaseTemplate, LeanEngageSurvey } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
  getRegion,
  getShouldShowBanking,
  getShouldShowInTray,
  getShouldShowLeanEngage,
  getShouldShowMoveToMyobTask,
  getShouldShowPayroll,
  getShouldShowPurchases,
  getShouldShowSales,
  getShouldShowTracking,
  getShouldUsePayrollLayout,
} from '../selectors/DashboardSelectors';
import DashBoardNzPayrollEapView from './payroll/DashboardNzPayrollEapView';
import DashBoardPayrollView from './payroll/DashboardPayrollView';
import DashboardBankingCard from './banking/DashboardBankingCard';
import DashboardHeader from './DashboardHeader';
import DashboardInTrayCard from './inTray/DashboardInTrayCard';
import DashboardLeanEngageCard from './DashboardLeanEngageCard';
import DashboardMoveToMyobTaskCard from './tasks/DashboardMoveToMyobTaskCard';
import DashboardPayrollPayrunsCard from './payroll/DashboardPayrollPayrunsCard';
import DashboardPurchaseCard from './purchase/DashboardPurchaseCard';
import DashboardSalesCard from './sales/DashboardSalesCard';
import DashboardTrackingCard from './tracking/DashboardTrackingCard';
import PageView from '../../../components/PageView/PageView';
import Region from '../../../common/types/Region';
import footerImage from './footer-right-illustration.svg';
import styles from './DashboardView.module.css';

const DashboardView = ({
  alert,
  inTrayListeners,
  inTrayUploadOptionsModal,
  isLoading,
  onAddBankFeedButtonClick,
  onDismissAlert,
  onLinkClick,
  onSalesReload,
  onPurchaseReload,
  onTrackingReload,
  onTrackingChange,
  onBankingReload,
  onPayrollReload,
  onPayrollReportsReload,
  onBankFeedAccountChange,
  shouldShowBanking,
  shouldShowSales,
  shouldShowPurchases,
  shouldShowLeanEngage,
  shouldShowTracking,
  shouldUsePayrollLayout,
  shouldShowPayroll,
  shouldShowInTray,
  region,
  tasksListeners,
  shouldShowMoveToMyobTask,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const header = <DashboardHeader />;

  const leanEngageSurvey = shouldShowPayroll ? (
    <LeanEngageSurvey
      surveyType="survey"
      surveyName="dashboard-csat"
      productName="dashboard"
    />
  ) : (
    <DashboardLeanEngageCard />
  );

  const body = (
    <div className={styles.body}>
      <div className={styles.primary}>
        {shouldShowMoveToMyobTask && (
          <DashboardMoveToMyobTaskCard
            closeTask={tasksListeners.closeTask}
            constructPath={tasksListeners.constructPath}
            onLinkClick={onLinkClick}
          />
        )}
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
              onBankFeedAccountChange={onBankFeedAccountChange}
              onAddBankFeedButtonClick={onAddBankFeedButtonClick}
            />
          )}
          {shouldShowInTray && (
            <DashboardInTrayCard
              onDismissAlert={inTrayListeners.onDismissAlert}
              onLinkClick={onLinkClick}
              onMoreWaysToUploadButtonClick={
                inTrayListeners.onMoreWaysToUploadButtonClick
              }
              onUpload={inTrayListeners.onUpload}
              onIntrayLinkDocumentsClick={
                inTrayListeners.onIntrayLinkDocumentsClick
              }
            />
          )}

          {shouldShowPayroll && (
            <DashboardPayrollPayrunsCard
              onLinkClick={onLinkClick}
              onReload={onPayrollReload}
            />
          )}

          {shouldShowLeanEngage && leanEngageSurvey}
        </div>

        {!shouldShowPayroll && <img src={footerImage} alt="" />}
      </div>
    </div>
  );

  const dashboardView = (
    <BaseTemplate>
      {alertComponent}
      {inTrayUploadOptionsModal}
      {header}
      {body}
    </BaseTemplate>
  );

  const auPayrollView = (
    <DashBoardPayrollView
      onDismissAlert={onDismissAlert}
      onLinkClick={onLinkClick}
      onPayrollReload={onPayrollReload}
      onPayrollReportsReload={onPayrollReportsReload}
    />
  );

  const nzPayrollView = (
    <DashBoardNzPayrollEapView
      onDismissAlert={onDismissAlert}
      onLinkClick={onLinkClick}
      onPayrollReload={onPayrollReload}
    />
  );

  const payrollView = region === Region.nz ? nzPayrollView : auPayrollView;

  const view = shouldUsePayrollLayout ? payrollView : dashboardView;

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = (state) => ({
  shouldShowBanking: getShouldShowBanking(state),
  shouldShowSales: getShouldShowSales(state),
  shouldShowPurchases: getShouldShowPurchases(state),
  shouldShowLeanEngage: getShouldShowLeanEngage(state),
  shouldShowTracking: getShouldShowTracking(state),
  shouldUsePayrollLayout: getShouldUsePayrollLayout(state),
  shouldShowPayroll: getShouldShowPayroll(state),
  shouldShowInTray: getShouldShowInTray(state),
  shouldShowMoveToMyobTask: getShouldShowMoveToMyobTask(state),
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  region: getRegion(state),
});

export default connect(mapStateToProps)(DashboardView);
