import { Alert, BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
  getShouldShowBanking,
  getShouldShowLeanEngage,
  getShouldShowPurchases,
  getShouldShowSales,
  getShouldShowTracking,
} from '../selectors/DashboardSelectors';
import DashboardBankingCard from './banking/DashboardBankingCard';
import DashboardHeader from './DashboardHeader';
import DashboardLeanEngageCard from './DashboardLeanEngageCard';
import DashboardPurchaseCard from './purchase/DashboardPurchaseCard';
import DashboardSalesCard from './sales/DashboardSalesCard';
import DashboardTrackingCard from './tracking/DashboardTrackingCard';
import PageView from '../../../components/PageView/PageView';
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
  onBankFeedAccountChange,
  shouldShowBanking,
  shouldShowSales,
  shouldShowPurchases,
  shouldShowLeanEngage,
  shouldShowTracking,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const header = <DashboardHeader />;

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

          {shouldShowLeanEngage && <DashboardLeanEngageCard />}
        </div>
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

  return <PageView isLoading={isLoading} view={dashboardView} />;
};

const mapStateToProps = state => ({
  shouldShowBanking: getShouldShowBanking(state),
  shouldShowSales: getShouldShowSales(state),
  shouldShowPurchases: getShouldShowPurchases(state),
  shouldShowLeanEngage: getShouldShowLeanEngage(state),
  shouldShowTracking: getShouldShowTracking(state),
  isLoading: getIsLoading(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(DashboardView);
