import { MYOBLogo, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getMenuLogoUrl,
  getRegion,
  getShouldDisplayAccountingMenu,
  getShouldDisplayAddMenu,
  getShouldDisplayBankingMenu,
  getShouldDisplayBusinessMenu,
  getShouldDisplayChangePlan,
  getShouldDisplayContactMenu,
  getShouldDisplayInTray,
  getShouldDisplayPayrollMenu,
  getShouldDisplayPurchasesMenu,
  getShouldDisplayReportsMenu,
  getShouldDisplaySalesMenu,
  getShowUrls,
  getTrialEndDate,
  hasBusinessId,
} from '../NavigationSelectors';
import AccountingMenu from './AccountingMenu';
import AddMenu from './AddMenu';
import BankingMenu from './BankingMenu';
import BusinessMenu from './BusinessMenu';
import ContactMenu from './ContactMenu';
import Help from './Help';
import Home from './Home';
import InTray from './InTray';
import Logout from './Logout';
import PayrollMenu from './PayrollMenu';
import PurchasesMenu from './PurchasesMenu';
import ReportsMenu from './ReportsMenu';
import SalesMenu from './SalesMenu';
import SubscriptionRibbon from './SubscriptionRibbon';
import Tasks from './Tasks';
import styles from './NavigationBar.module.css';

const getPrimary = ({
  onMenuSelect,
  onMenuLinkClick,
  shouldDisplayHome,
  shouldDisplaySalesMenu,
  shouldDisplayPurchasesMenu,
  shouldDisplayBankingMenu,
  shouldDisplayContactMenu,
  shouldDisplayAccountingMenu,
  shouldDisplayPayrollMenu,
  shouldDisplayInTray,
  shouldDisplayReportsMenu,
}) => [
  shouldDisplayHome && <Home key="Home" />,
  shouldDisplaySalesMenu && (
  <SalesMenu
    key="SalesMenu"
    onMenuSelect={onMenuSelect}
    onMenuLinkClick={onMenuLinkClick}
  />
  ),
  shouldDisplayPurchasesMenu && (
  <PurchasesMenu
    key="PurchasesMenu"
    onMenuSelect={onMenuSelect}
    onMenuLinkClick={onMenuLinkClick}
  />
  ),
  shouldDisplayBankingMenu && (
  <BankingMenu
    key="BankingMenu"
    onMenuSelect={onMenuSelect}
    onMenuLinkClick={onMenuLinkClick}
  />
  ),
  shouldDisplayAccountingMenu && (
  <AccountingMenu
    key="AccountingMenu"
    onMenuSelect={onMenuSelect}
    onMenuLinkClick={onMenuLinkClick}
  />
  ),
  shouldDisplayPayrollMenu && (
  <PayrollMenu
    key="PayrollMenu"
    onMenuSelect={onMenuSelect}
    onMenuLinkClick={onMenuLinkClick}
  />
  ),
  shouldDisplayContactMenu && (
  <ContactMenu
    key="ContactMenu"
    onMenuSelect={onMenuSelect}
    onMenuLinkClick={onMenuLinkClick}
  />
  ),
  shouldDisplayReportsMenu && (
  <ReportsMenu
    key="Reports"
    onMenuSelect={onMenuSelect}
    onMenuLinkClick={onMenuLinkClick}
  />
  ),
  shouldDisplayInTray && (
  <InTray key="InTray" onMenuLinkClick={onMenuLinkClick} />
  ),
].filter(Boolean);

const getSecondary = ({
  shouldDisplayBusinessMenu,
  shouldDisplayAddMenu,
  shouldDisplayHelpMenu,
  shouldDisplayTasksMenu,
  shouldDisplayChangePlan,
  shouldDisplaySubscriptionNow,
  onMenuSelect,
  onMenuLinkClick,
  onHelpLinkClick,
  onTasksLinkClick,
  onLogoutLinkClick,
  onSubscribeNowClick,
  onChangePlanClick,
  hasTasks,
  businessName,
}) => [
  shouldDisplayAddMenu && (
  <AddMenu
    className={styles.add}
    key="AddMenu"
    onMenuSelect={onMenuSelect}
    onMenuLinkClick={onMenuLinkClick}
  />
  ),
  shouldDisplayHelpMenu && (
  <Help className={styles.help} key="Help" onMenuLinkClick={onHelpLinkClick} />
  ),
  shouldDisplayTasksMenu && (
  <Tasks className={styles.tasks} key="Tasks" onMenuLinkClick={onTasksLinkClick} showNotificationIcon={hasTasks} />
  ),
  shouldDisplayBusinessMenu && (
  <BusinessMenu
    key="BusinessMenu"
    businessName={businessName}
    onMenuSelect={onMenuSelect}
    onMenuLinkClick={onMenuLinkClick}
    onSubscribeNowClick={shouldDisplaySubscriptionNow && onSubscribeNowClick}
    onLogoutLinkClick={onLogoutLinkClick}
    onChangePlanClick={shouldDisplayChangePlan && onChangePlanClick}
  />
  ),
  !shouldDisplayBusinessMenu && (
  <Logout key="Logout" onMenuLinkClick={onLogoutLinkClick} />
  ),
].filter(Boolean);

const NavigationBar = ({
  onMenuSelect,
  onMenuLinkClick,
  onHelpLinkClick,
  onTasksLinkClick,
  onLogoutLinkClick,
  onSubscribeNowClick,
  onChangePlanClick,
  region,
  shouldDisplayHome,
  shouldDisplaySalesMenu,
  shouldDisplayBusinessMenu,
  shouldDisplayBankingMenu,
  shouldDisplayContactMenu,
  shouldDisplayAccountingMenu,
  shouldDisplayPayrollMenu,
  shouldDisplayPurchasesMenu,
  shouldDisplayInTray,
  shouldDisplayReportsMenu,
  shouldDisplayHelpMenu,
  shouldDisplayAddMenu,
  shouldDisplayTasksMenu,
  shouldDisplayChangePlan,
  shouldDisplaySubscriptionNow,
  trialEndDate,
  menuLogoUrl,
  hasTasks,
  businessName,
}) => {
  const primaryMenuItems = getPrimary({
    onMenuSelect,
    onMenuLinkClick,
    shouldDisplayHome,
    shouldDisplaySalesMenu,
    shouldDisplayPurchasesMenu,
    shouldDisplayBankingMenu,
    shouldDisplayContactMenu,
    shouldDisplayAccountingMenu,
    shouldDisplayPayrollMenu,
    shouldDisplayInTray,
    shouldDisplayReportsMenu,
  });
  const secondary = getSecondary({
    onMenuSelect,
    onMenuLinkClick,
    onHelpLinkClick,
    onTasksLinkClick,
    onLogoutLinkClick,
    onSubscribeNowClick,
    onChangePlanClick,
    region,
    shouldDisplayBusinessMenu,
    shouldDisplayAddMenu,
    shouldDisplayHelpMenu,
    shouldDisplayTasksMenu,
    shouldDisplayChangePlan,
    shouldDisplaySubscriptionNow,
    hasTasks,
    businessName,
  });
  const brand = (
    <Navigation.Brand
      url={menuLogoUrl}
      width="7.3rem"
    >
      <MYOBLogo />
    </Navigation.Brand>
  );

  const primary = primaryMenuItems.length ? primaryMenuItems : [];

  const trialToBuyRibbon = shouldDisplaySubscriptionNow && (
    <SubscriptionRibbon
      trialEndDate={trialEndDate}
      onSubscribeNowClick={onSubscribeNowClick}
      region={region}
    />
  );

  return (
    <div className={styles.navigation}>
      {trialToBuyRibbon}
      <Navigation brand={brand} primary={primary} secondary={secondary} fluid />
    </div>
  );
};

const mapStateToProps = state => ({
  region: getRegion(state),
  shouldDisplayHome: getShowUrls(state),
  shouldDisplayBusinessMenu: getShouldDisplayBusinessMenu(state),
  shouldDisplayBankingMenu: getShouldDisplayBankingMenu(state),
  shouldDisplayContactMenu: getShouldDisplayContactMenu(state),
  shouldDisplayAccountingMenu: getShouldDisplayAccountingMenu(state),
  shouldDisplaySalesMenu: getShouldDisplaySalesMenu(state),
  shouldDisplayPayrollMenu: getShouldDisplayPayrollMenu(state),
  shouldDisplayPurchasesMenu: getShouldDisplayPurchasesMenu(state),
  shouldDisplayInTray: getShouldDisplayInTray(state),
  shouldDisplayReportsMenu: getShouldDisplayReportsMenu(state),
  shouldDisplayAddMenu: getShouldDisplayAddMenu(state),
  shouldDisplayHelpMenu: hasBusinessId(state),
  shouldDisplayTasksMenu: hasBusinessId(state),
  shouldDisplayChangePlan: getShouldDisplayChangePlan(state),
  shouldDisplaySubscriptionNow: hasBusinessId(state) && getTrialEndDate(state) != null,
  trialEndDate: getTrialEndDate(state),
  menuLogoUrl: getMenuLogoUrl(state)(window.location.href),
});

export default connect(mapStateToProps)(NavigationBar);
