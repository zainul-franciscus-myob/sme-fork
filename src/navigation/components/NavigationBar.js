import { MYOBLogo, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBusinessId,
  getMenuLogoUrl,
  getRegion,
  getShouldDisplayAccountingMenu,
  getShouldDisplayAddMenu,
  getShouldDisplayBankingMenu,
  getShouldDisplayBusinessMenu,
  getShouldDisplayContactMenu,
  getShouldDisplayInTray,
  getShouldDisplayLiveChat,
  getShouldDisplayPayrollMenu,
  getShouldDisplayPayrollNzMenu,
  getShouldDisplayPurchasesMenu,
  getShouldDisplayReportsMenu,
  getShouldDisplaySalesMenu,
  getShouldDisplaySubscriptionNow,
  getShowUrls,
  getTrialEndDate,
  getUserEmail,
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
import LiveChat from '../../liveChat/LiveChat';
import Logout from './Logout';
import PayrollMenu from './PayrollMenu';
import PayrollNzMenu from './PayrollNzMenu';
import PurchasesMenu from './PurchasesMenu';
import ReportsMenu from './ReportsMenu';
import SalesMenu from './SalesMenu';
import SubscriptionRibbon from './SubscriptionRibbon';
import Tasks from './Tasks';
import styles from './NavigationBar.module.css';

const getPrimary = ({
  onMenuLinkClick,
  onMenuSelect,
  shouldDisplayAccountingMenu,
  shouldDisplayBankingMenu,
  shouldDisplayContactMenu,
  shouldDisplayHome,
  shouldDisplayInTray,
  shouldDisplayPayrollMenu,
  shouldDisplayPayrollNzMenu,
  shouldDisplayPurchasesMenu,
  shouldDisplayReportsMenu,
  shouldDisplaySalesMenu,
}) =>
  [
    shouldDisplayHome && <Home key="Home" onMenuLinkClick={onMenuLinkClick} />,
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
    shouldDisplayPayrollNzMenu && (
      <PayrollNzMenu
        key="PayrollNzMenu"
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

const getSettings = ({
  businessName,
  hasTasks,
  onCreateBusinessClick,
  onHelpLinkClick,
  onLogoutLinkClick,
  onManageMyProductClick,
  onMenuLinkClick,
  onMenuSelect,
  onMoveToMYOBClick,
  onTasksLinkClick,
  shouldDisplayAddMenu,
  shouldDisplayBusinessMenu,
  shouldDisplayHelpMenu,
  shouldDisplayTasksMenu,
}) =>
  [
    shouldDisplayAddMenu && (
      <AddMenu
        className={styles.add}
        key="AddMenu"
        onMenuSelect={onMenuSelect}
        onMenuLinkClick={onMenuLinkClick}
      />
    ),
    shouldDisplayHelpMenu && (
      <Help
        className={styles.help}
        key="Help"
        onMenuLinkClick={onHelpLinkClick}
      />
    ),
    shouldDisplayTasksMenu && (
      <Tasks
        className={styles.tasks}
        key="Tasks"
        onMenuLinkClick={onTasksLinkClick}
        showNotificationIcon={hasTasks}
      />
    ),
    shouldDisplayBusinessMenu && (
      <BusinessMenu
        businessName={businessName}
        key="BusinessMenu"
        onCreateBusinessClick={onCreateBusinessClick}
        onLogoutLinkClick={onLogoutLinkClick}
        onManageMyProductClick={onManageMyProductClick}
        onMenuLinkClick={onMenuLinkClick}
        onMenuSelect={onMenuSelect}
        onMoveToMYOBClick={onMoveToMYOBClick}
      />
    ),
    !shouldDisplayBusinessMenu && (
      <Logout key="Logout" onMenuLinkClick={onLogoutLinkClick} />
    ),
  ].filter(Boolean);

const NavigationBar = ({
  businessId,
  businessName,
  businessRole,
  email,
  hasTasks,
  menuLogoUrl,
  onAppMarketplaceClick,
  onCreateBusinessClick,
  onHelpLinkClick,
  onLogoutLinkClick,
  onManageMyProductClick,
  onMenuLinkClick,
  onMenuSelect,
  onMoveToMYOBClick,
  onSubscribeNowClick,
  onTasksLinkClick,
  region,
  serialNumber,
  shouldDisplayAccountingMenu,
  shouldDisplayAddMenu,
  shouldDisplayBankingMenu,
  shouldDisplayBusinessMenu,
  shouldDisplayContactMenu,
  shouldDisplayHelpMenu,
  shouldDisplayHome,
  shouldDisplayInTray,
  shouldDisplayLiveChat,
  shouldDisplayPayrollMenu,
  shouldDisplayPayrollNzMenu,
  shouldDisplayPurchasesMenu,
  shouldDisplayReportsMenu,
  shouldDisplaySalesMenu,
  shouldDisplaySubscriptionNow,
  shouldDisplayTasksMenu,
  trialEndDate,
}) => {
  const primaryMenuItems = getPrimary({
    onMenuLinkClick,
    onMenuSelect,
    shouldDisplayAccountingMenu,
    shouldDisplayBankingMenu,
    shouldDisplayContactMenu,
    shouldDisplayHome,
    shouldDisplayInTray,
    shouldDisplayPayrollMenu,
    shouldDisplayPayrollNzMenu,
    shouldDisplayPurchasesMenu,
    shouldDisplayReportsMenu,
    shouldDisplaySalesMenu,
  });
  const settings = getSettings({
    businessName,
    hasTasks,
    onAppMarketplaceClick,
    onCreateBusinessClick,
    onHelpLinkClick,
    onLogoutLinkClick,
    onManageMyProductClick,
    onMenuLinkClick,
    onMenuSelect,
    onMoveToMYOBClick,
    onSubscribeNowClick,
    onTasksLinkClick,
    region,
    shouldDisplayAddMenu,
    shouldDisplayBusinessMenu,
    shouldDisplayHelpMenu,
    shouldDisplaySubscriptionNow,
    shouldDisplayTasksMenu,
  });

  const brand = (
    <Navigation.Brand url={menuLogoUrl} width="7.3rem">
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

  const liveChat = shouldDisplayLiveChat(businessRole) && (
    <LiveChat
      businessId={businessId}
      businessName={businessName}
      email={email}
      region={region}
      serialNumber={serialNumber}
    />
  );

  return (
    <div className={styles.navigation}>
      {trialToBuyRibbon}
      <Navigation brand={brand} primary={primary} settings={settings} fluid />
      {liveChat}
    </div>
  );
};

const mapStateToProps = (state) => ({
  businessId: getBusinessId(state),
  email: getUserEmail(state),
  menuLogoUrl: getMenuLogoUrl(state)(window.location.href),
  region: getRegion(state),
  shouldDisplayAccountingMenu: getShouldDisplayAccountingMenu(state),
  shouldDisplayAddMenu: getShouldDisplayAddMenu(state),
  shouldDisplayBankingMenu: getShouldDisplayBankingMenu(state),
  shouldDisplayBusinessMenu: getShouldDisplayBusinessMenu(state),
  shouldDisplayContactMenu: getShouldDisplayContactMenu(state),
  shouldDisplayHelpMenu: hasBusinessId(state),
  shouldDisplayHome: getShowUrls(state),
  shouldDisplayInTray: getShouldDisplayInTray(state),
  shouldDisplayLiveChat: getShouldDisplayLiveChat(state),
  shouldDisplayPayrollMenu: getShouldDisplayPayrollMenu(state),
  shouldDisplayPayrollNzMenu: getShouldDisplayPayrollNzMenu(state),
  shouldDisplayPurchasesMenu: getShouldDisplayPurchasesMenu(state),
  shouldDisplayReportsMenu: getShouldDisplayReportsMenu(state),
  shouldDisplaySalesMenu: getShouldDisplaySalesMenu(state),
  shouldDisplaySubscriptionNow: getShouldDisplaySubscriptionNow(state),
  shouldDisplayTasksMenu: hasBusinessId(state),
  trialEndDate: getTrialEndDate(state),
});

export default connect(mapStateToProps)(NavigationBar);
