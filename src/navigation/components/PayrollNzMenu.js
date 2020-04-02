import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getPayrollNzUrls } from '../NavigationSelectors';
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
  urls.employeeListNz && getMenuLink(urls.employeeListNz, 'Employees', onMenuLinkClick),
].filter(Boolean);


const PayrollNzMenu = ({
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
  urls: getPayrollNzUrls(state, props),
});

export default connect(mapStateToProps)(PayrollNzMenu);