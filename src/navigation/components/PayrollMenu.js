import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getPayrollUrls } from '../NavigationSelectors';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const getMenuLink = (url, label, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);

const getItems = (urls, onMenuLinkClick) => [
  urls.employeeList && getMenuLink(urls.employeeList, 'Employees', onMenuLinkClick),
  urls.payrollSettings && getMenuLink(urls.payrollSettings, 'Payroll settings', onMenuLinkClick),
  urls.payItemList && getMenuLink(urls.payItemList, 'Pay items', onMenuLinkClick),
].filter(Boolean);

const PayrollMenu = ({
  urls, onMenuSelect, onMenuLinkClick, activeNav,
}) => (
  <Navigation.Menu
    label="Payroll"
    icon={<Icons.Caret />}
    onSelect={onMenuSelect}
    items={getItems(urls, onMenuLinkClick)}
    active={activeNav === 'payroll'}
  />
);

const mapStateToProps = (state, props) => ({
  activeNav: getActiveNav(state),
  urls: getPayrollUrls(state, props),
});

export default connect(mapStateToProps)(PayrollMenu);
