import { MYOBLogo, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  hasBankingUrls, hasBusinessId, hasContactUrls, hasJournalUrls,
} from '../NavigationSelectors';
import BankingMenu from './BankingMenu';
import BusinessMenu from './BusinessMenu';
import ContactMenu from './ContactMenu';
import JournalMenu from './JournalMenu';
import Logout from './Logout';
import SwitchBusiness from './SwitchBusiness';

const getPrimary = ({
  onMenuSelect, shouldDisplayBankingMenu, shouldDisplayContactMenu, shouldDisplayJournalMenu,
}) => [
  shouldDisplayBankingMenu && <BankingMenu key="BankingMenu" onMenuSelect={onMenuSelect} />,
  shouldDisplayContactMenu && <ContactMenu key="ContactMenu" onMenuSelect={onMenuSelect} />,
  shouldDisplayJournalMenu && <JournalMenu key="JournalMenu" onMenuSelect={onMenuSelect} />,
].filter(Boolean);

const getSecondary = ({
  onMenuSelect, shouldDisplayBusinessMenu,
}) => [
  shouldDisplayBusinessMenu && <SwitchBusiness key="SwitchBusiness" />,
  shouldDisplayBusinessMenu && <BusinessMenu key="BusinessMenu" onMenuSelect={onMenuSelect} />,
  !shouldDisplayBusinessMenu && <Logout key="Logout" />,
].filter(Boolean);

const NavigationBar = ({
  onMenuSelect, shouldDisplayBusinessMenu, shouldDisplayBankingMenu,
  shouldDisplayContactMenu, shouldDisplayJournalMenu,
}) => {
  const primary = getPrimary({
    onMenuSelect, shouldDisplayBankingMenu, shouldDisplayContactMenu, shouldDisplayJournalMenu,
  });
  const secondary = getSecondary({ onMenuSelect, shouldDisplayBusinessMenu });
  const brand = <Navigation.Brand url="#/business" width="73px"><MYOBLogo /></Navigation.Brand>;

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
};

const mapStateToProps = state => ({
  shouldDisplayBusinessMenu: hasBusinessId(state),
  shouldDisplayBankingMenu: hasBankingUrls(state),
  shouldDisplayContactMenu: hasContactUrls(state),
  shouldDisplayJournalMenu: hasJournalUrls(state),
});

export default connect(mapStateToProps)(NavigationBar);
