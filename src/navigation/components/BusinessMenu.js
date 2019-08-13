import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveNav, getBusinessName, getBusinessUrls, getTaxCodesLabel,
} from '../NavigationSelectors';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const isSeparatorRequired = urls => (
  urls.businessDetails
    || urls.taxList
    || urls.incomeAllocation
    || urls.userList
    || urls.salesSettings
    || urls.prepareBasOrIas
    || urls.linkedAccounts
);

const getMenuLink = (url, label, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);

const getItems = ({ urls, onMenuLinkClick, taxCodesLabel }) => [
  urls.businessDetails && getMenuLink(urls.businessDetails, 'Business details', onMenuLinkClick),
  urls.incomeAllocation && getMenuLink(urls.incomeAllocation, 'Income allocation', onMenuLinkClick),
  urls.taxList && getMenuLink(urls.taxList, taxCodesLabel, onMenuLinkClick),
  urls.userList && getMenuLink(urls.userList, 'Users', onMenuLinkClick),
  urls.salesSettings && getMenuLink(urls.salesSettings, 'Invoice and quote settings', onMenuLinkClick),
  urls.prepareBasOrIas && getMenuLink(urls.prepareBasOrIas, 'Prepare BAS or IAS', onMenuLinkClick),
  urls.linkedAccounts && getMenuLink(urls.linkedAccounts, 'Manage linked accounts', onMenuLinkClick),
  isSeparatorRequired(urls) && <Navigation.Separator key="separator" />,
  <Navigation.MenuLink key="logout" url="#/logout" label="Logout" icon={<Icons.SignOut />} onClick={handleMenuLinkClick(onMenuLinkClick, '#/logout')} />,
].filter(Boolean);

const BusinessMenu = ({
  businessName, urls, activeNav, onMenuSelect, onMenuLinkClick, taxCodesLabel,
}) => (
  <Navigation.Menu
    label={businessName}
    icon={<Icons.Caret />}
    items={getItems({ urls, onMenuLinkClick, taxCodesLabel })}
    onSelect={onMenuSelect}
    active={activeNav === 'business'}
  />
);

const mapStateToProps = state => ({
  urls: getBusinessUrls(state),
  businessName: getBusinessName(state),
  activeNav: getActiveNav(state),
  taxCodesLabel: getTaxCodesLabel(state),
});

export default connect(mapStateToProps)(BusinessMenu);
