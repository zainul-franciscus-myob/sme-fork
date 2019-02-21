import { MYOBLogo, Navigation } from '@myob/myob-widgets';
import React from 'react';

import BankingMenu from './BankingMenu';
import BusinessMenu from './BusinessMenu';
import ContactMenu from './ContactMenu';
import JournalMenu from './JournalMenu';
import SwitchBusiness from './SwitchBusiness';

const getPrimary = () => [
  <BankingMenu key="BankingMenu" />,
  <ContactMenu key="ContactMenu" />,
  <JournalMenu key="JournalMenu" />,
].filter(Boolean);

const getSecondary = ({ isLoggedIn, logout, businessName }) => [
  <SwitchBusiness businessName={businessName} key="SwitchBusiness" />,
  <BusinessMenu isLoggedIn={isLoggedIn} logout={logout} key="BusinessMenu" />,
].filter(Boolean);

const NavigationBar = (props) => {
  const primary = getPrimary(props);
  const secondary = getSecondary(props);
  const brand = <Navigation.Brand url="#home" width="73px"><MYOBLogo /></Navigation.Brand>;

  return (
    <Navigation brand={brand} primary={primary} secondary={secondary} />
  );
};

export default NavigationBar;
