import {
  Alert, BaseTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
} from '../selectors/DashboardSelectors';
import DashboardBankAccountCard from './DashboardBankAccountCard';
import DashboardBusinessTrackingCard from './DashboardBusinessTrackingCard';
import DashboardHeader from './DashboardHeader';
import DashboardLeanEngageCard from './DashboardLeanEngageCard';
import DashboardPurchaseCard from './purchase/DashboardPurchaseCard';
import DashboardSalesCard from './sales/DashboardSalesCard';
import PageView from '../../components/PageView/PageView';
import footerImage from './footer-right-illustration.svg';
import styles from './DashboardView.module.css';


const DashboardView = ({
  alert,
  isLoading,
  onDismissAlert,
  onLinkClick,
  onSalesReload,
  onPurchaseReload,
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
        <DashboardSalesCard onLinkClick={onLinkClick} onReload={onSalesReload} />
        <DashboardPurchaseCard onLinkClick={onLinkClick} onReload={onPurchaseReload} />
        <DashboardBusinessTrackingCard />
      </div>
      <div className={styles.secondary}>
        <DashboardBankAccountCard />
        <div className={styles.lastCard}>
          <DashboardLeanEngageCard />
        </div>
        <img src={footerImage} alt="" />
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
  isLoading: getIsLoading(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(DashboardView);
