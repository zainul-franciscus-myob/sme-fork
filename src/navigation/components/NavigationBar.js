import { Button, MYOBLogo, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  hasBankingUrls,
  hasBusinessId,
  hasContactUrls,
  hasInTrayUrl,
  hasJournalUrls,
  hasPayrollUrls,
  hasPurchasesUrls,
  hasSalesUrls,
} from '../NavigationSelectors';
import BankingMenu from './BankingMenu';
import BusinessMenu from './BusinessMenu';
import ContactMenu from './ContactMenu';
import InTray from './InTray';
import JournalMenu from './JournalMenu';
import Logout from './Logout';
import PayrollMenu from './PayrollMenu';
import PurchasesMenu from './PurchasesMenu';
import SalesMenu from './SalesMenu';
import SwitchBusiness from './SwitchBusiness';
import styles from './NavigationBar.module.css';

const getPrimary = ({
  onMenuSelect, onMenuLinkClick,
  shouldDisplaySalesMenu, shouldDisplayPurchasesMenu, shouldDisplayBankingMenu,
  shouldDisplayContactMenu, shouldDisplayJournalMenu, shouldDisplayPayrollMenu, shouldDisplayInTray,
}) => [
  shouldDisplaySalesMenu && <SalesMenu key="SalesMenu" onMenuSelect={onMenuSelect} onMenuLinkClick={onMenuLinkClick} />,
  shouldDisplayPurchasesMenu && <PurchasesMenu key="PurchasesMenu" onMenuSelect={onMenuSelect} onMenuLinkClick={onMenuLinkClick} />,
  shouldDisplayBankingMenu && <BankingMenu key="BankingMenu" onMenuSelect={onMenuSelect} onMenuLinkClick={onMenuLinkClick} />,
  shouldDisplayContactMenu && <ContactMenu key="ContactMenu" onMenuSelect={onMenuSelect} onMenuLinkClick={onMenuLinkClick} />,
  shouldDisplayJournalMenu && <JournalMenu key="JournalMenu" onMenuSelect={onMenuSelect} onMenuLinkClick={onMenuLinkClick} />,
  shouldDisplayPayrollMenu && <PayrollMenu key="PayrollMenu" onMenuSelect={onMenuSelect} onMenuLinkClick={onMenuLinkClick} />,
  shouldDisplayInTray && <InTray key="InTray" onMenuLinkClick={onMenuLinkClick} />,
].filter(Boolean);

const getSecondary = ({
  onMenuSelect, onMenuLinkClick, shouldDisplayBusinessMenu,
}) => [
  shouldDisplayBusinessMenu && <SwitchBusiness key="SwitchBusiness" />,
  shouldDisplayBusinessMenu && <BusinessMenu key="BusinessMenu" onMenuSelect={onMenuSelect} onMenuLinkClick={onMenuLinkClick} />,
  !shouldDisplayBusinessMenu && <Logout key="Logout" onMenuLinkClick={onMenuLinkClick} />,
].filter(Boolean);

const NavigationBar = ({
  onMenuSelect, onMenuLinkClick,
  onSkipToMainContentClick, shouldDisplaySalesMenu, shouldDisplayBusinessMenu,
  shouldDisplayBankingMenu, shouldDisplayContactMenu,
  shouldDisplayJournalMenu, shouldDisplayPayrollMenu,
  shouldDisplayPurchasesMenu, shouldDisplayInTray,
}) => {
  const primaryMenuItems = getPrimary({
    onMenuSelect,
    onMenuLinkClick,
    shouldDisplaySalesMenu,
    shouldDisplayPurchasesMenu,
    shouldDisplayBankingMenu,
    shouldDisplayContactMenu,
    shouldDisplayJournalMenu,
    shouldDisplayPayrollMenu,
    shouldDisplayInTray,
  });
  const secondary = getSecondary({ onMenuSelect, onMenuLinkClick, shouldDisplayBusinessMenu });
  const brand = (
    <>
      <div className={styles.skipNavigationContainer}>
        <Button type="link" className={styles.skipNavigation} onClick={onSkipToMainContentClick}>
          Skip to main content
        </Button>
      </div>
      <Navigation.Brand url="#/business" width="7.3rem"><MYOBLogo /></Navigation.Brand>
    </>
  );

  const primary = primaryMenuItems.length ? primaryMenuItems : [''];

  return (
    <Navigation brand={brand} primary={primary} secondary={secondary} />
  );
};

const mapStateToProps = state => ({
  shouldDisplayBusinessMenu: hasBusinessId(state),
  shouldDisplayBankingMenu: hasBankingUrls(state),
  shouldDisplayContactMenu: hasContactUrls(state),
  shouldDisplayJournalMenu: hasJournalUrls(state),
  shouldDisplaySalesMenu: hasSalesUrls(state),
  shouldDisplayPayrollMenu: hasPayrollUrls(state),
  shouldDisplayPurchasesMenu: hasPurchasesUrls(state),
  shouldDisplayInTray: hasInTrayUrl(state),
});

export default connect(mapStateToProps)(NavigationBar);
