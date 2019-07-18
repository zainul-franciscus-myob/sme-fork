import { MYOBLogo, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

const getPrimary = ({
  onMenuSelect, shouldDisplaySalesMenu, shouldDisplayPurchasesMenu, shouldDisplayBankingMenu,
  shouldDisplayContactMenu, shouldDisplayJournalMenu, shouldDisplayPayrollMenu, shouldDisplayInTray,
}) => [
  shouldDisplaySalesMenu && <SalesMenu key="SalesMenu" onMenuSelect={onMenuSelect} />,
  shouldDisplayPurchasesMenu && <PurchasesMenu key="PurchasesMenu" onMenuSelect={onMenuSelect} />,
  shouldDisplayBankingMenu && <BankingMenu key="BankingMenu" onMenuSelect={onMenuSelect} />,
  shouldDisplayContactMenu && <ContactMenu key="ContactMenu" onMenuSelect={onMenuSelect} />,
  shouldDisplayJournalMenu && <JournalMenu key="JournalMenu" onMenuSelect={onMenuSelect} />,
  shouldDisplayPayrollMenu && <PayrollMenu key="PayrollMenu" onMenuSelect={onMenuSelect} />,
  shouldDisplayInTray && <InTray key="InTray" />,
].filter(Boolean);

const getSecondary = ({
  onMenuSelect, shouldDisplayBusinessMenu,
}) => [
  shouldDisplayBusinessMenu && <SwitchBusiness key="SwitchBusiness" />,
  shouldDisplayBusinessMenu && <BusinessMenu key="BusinessMenu" onMenuSelect={onMenuSelect} />,
  !shouldDisplayBusinessMenu && <Logout key="Logout" />,
].filter(Boolean);

const NavigationBar = ({
  onMenuSelect, shouldDisplaySalesMenu, shouldDisplayBusinessMenu,
  shouldDisplayBankingMenu, shouldDisplayContactMenu,
  shouldDisplayJournalMenu, shouldDisplayPayrollMenu,
  shouldDisplayPurchasesMenu, shouldDisplayInTray,
}) => {
  const primaryMenuItems = getPrimary({
    onMenuSelect,
    shouldDisplaySalesMenu,
    shouldDisplayPurchasesMenu,
    shouldDisplayBankingMenu,
    shouldDisplayContactMenu,
    shouldDisplayJournalMenu,
    shouldDisplayPayrollMenu,
    shouldDisplayInTray,
  });
  const secondary = getSecondary({ onMenuSelect, shouldDisplayBusinessMenu });
  const brand = <Navigation.Brand url="#/business" width="73px"><MYOBLogo /></Navigation.Brand>;

  const primary = primaryMenuItems.length ? primaryMenuItems : [''];

  return (
    <Navigation brand={brand} primary={primary} secondary={secondary} />
  );
};

NavigationBar.propTypes = {
  onMenuSelect: PropTypes.func.isRequired,
  shouldDisplayBusinessMenu: PropTypes.bool.isRequired,
  shouldDisplayBankingMenu: PropTypes.bool.isRequired,
  shouldDisplayContactMenu: PropTypes.bool.isRequired,
  shouldDisplayJournalMenu: PropTypes.bool.isRequired,
  shouldDisplaySalesMenu: PropTypes.bool.isRequired,
  shouldDisplayPayrollMenu: PropTypes.bool.isRequired,
  shouldDisplayPurchasesMenu: PropTypes.bool.isRequired,
  shouldDisplayInTray: PropTypes.bool.isRequired,
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
