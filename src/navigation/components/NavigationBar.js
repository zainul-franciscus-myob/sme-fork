import { MYOBLogo, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getMenuLogoUrl,
  getShowUrls,
  hasAccountingUrls,
  hasAddUrls,
  hasBankingUrls,
  hasBusinessId,
  hasContactUrls,
  hasInTrayUrl,
  hasPayrollUrls,
  hasPurchasesUrls,
  hasReportsUrls,
  hasSalesUrls,
} from '../NavigationSelectors';
import AccountingMenu from './AccountingMenu';
import Activities from './Activities';
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
  shouldDisplayActivitiesMenu,
  onMenuSelect,
  onMenuLinkClick,
  onHelpLinkClick,
  onActivitiesLinkClick,
  onSubscribeNowClick,
  hasActivities,
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
  shouldDisplayActivitiesMenu && (
  <Activities className={styles.activities} key="Activities" onMenuLinkClick={onActivitiesLinkClick} showNotificationIcon={hasActivities} />
  ),
  shouldDisplayBusinessMenu && (
  <BusinessMenu
    key="BusinessMenu"
    onMenuSelect={onMenuSelect}
    onMenuLinkClick={onMenuLinkClick}
    onSubscribeNowClick={onSubscribeNowClick}
  />
  ),
  !shouldDisplayBusinessMenu && (
  <Logout key="Logout" onMenuLinkClick={onMenuLinkClick} />
  ),
].filter(Boolean);

const NavigationBar = ({
  onMenuSelect,
  onMenuLinkClick,
  onHelpLinkClick,
  onActivitiesLinkClick,
  onSubscribeNowClick,
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
  shouldDisplayActivitiesMenu,
  menuLogoUrl,
  hasActivities,
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
    onActivitiesLinkClick,
    onSubscribeNowClick,
    shouldDisplayBusinessMenu,
    shouldDisplayAddMenu,
    shouldDisplayHelpMenu,
    shouldDisplayActivitiesMenu,
    hasActivities,
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

  return (
    <div className={styles.navigation}>
      <Navigation brand={brand} primary={primary} secondary={secondary} fluid />
    </div>
  );
};

const mapStateToProps = state => ({
  shouldDisplayHome: getShowUrls(state),
  shouldDisplayBusinessMenu: getShowUrls(state),
  shouldDisplayBankingMenu: hasBankingUrls(state),
  shouldDisplayContactMenu: hasContactUrls(state),
  shouldDisplayAccountingMenu: hasAccountingUrls(state),
  shouldDisplaySalesMenu: hasSalesUrls(state),
  shouldDisplayPayrollMenu: hasPayrollUrls(state),
  shouldDisplayPurchasesMenu: hasPurchasesUrls(state),
  shouldDisplayInTray: hasInTrayUrl(state),
  shouldDisplayReportsMenu: hasReportsUrls(state),
  shouldDisplayAddMenu: hasAddUrls(state),
  shouldDisplayHelpMenu: hasBusinessId(state),
  shouldDisplayActivitiesMenu: hasBusinessId(state),
  menuLogoUrl: getMenuLogoUrl(state)(window.location.href),
});

export default connect(mapStateToProps)(NavigationBar);
