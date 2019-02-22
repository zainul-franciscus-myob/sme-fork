import { MYOBLogo, Navigation } from '@myob/myob-widgets';
import React from 'react';

import BankingMenu from './BankingMenu';
import BusinessMenu from './BusinessMenu';
import ContactMenu from './ContactMenu';
import JournalMenu from './JournalMenu';
import SwitchBusiness from './SwitchBusiness';

const getPrimary = ({ onMenuSelect }) => [
  <BankingMenu key="BankingMenu" onMenuSelect={onMenuSelect} />,
  <ContactMenu key="ContactMenu" onMenuSelect={onMenuSelect} />,
  <JournalMenu key="JournalMenu" onMenuSelect={onMenuSelect} />,
].filter(Boolean);

const getSecondary = ({
  businessName, onMenuSelect,
}) => [
  <SwitchBusiness businessName={businessName} key="SwitchBusiness" />,
  <BusinessMenu key="BusinessMenu" onMenuSelect={onMenuSelect} />,
].filter(Boolean);

const NavigationBar = (props) => {
  const primary = getPrimary(props);
  const secondary = getSecondary(props);
  const brand = <Navigation.Brand url="#/business" width="73px"><MYOBLogo /></Navigation.Brand>;

  return (
    <Navigation brand={brand} primary={primary} secondary={secondary} />
  );
};

export default NavigationBar;
