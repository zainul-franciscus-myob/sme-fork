import { CaretIcon, Navigation } from '@myob/myob-widgets';
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

const getItems = (urls, onMenuLinkClick) =>
  [
    urls.employeeListNz &&
      getMenuLink(urls.employeeListNz, 'Employees', onMenuLinkClick),
    urls.employeeCreateNz &&
      getMenuLink(urls.employeeCreateNz, 'Create employee', onMenuLinkClick),
    <Navigation.Separator key="separator-employee" />,
    urls.payRunCreateNz &&
      getMenuLink(urls.payRunCreateNz, 'Create pay run', onMenuLinkClick),
    urls.payRunListNz &&
      getMenuLink(urls.payRunListNz, 'Pay runs', onMenuLinkClick),
    urls.paydayFiling && <Navigation.Separator key="separator-payday" />,
    urls.paydayFiling &&
      getMenuLink(urls.paydayFiling, 'Payday filing', onMenuLinkClick),
  ].filter(Boolean);

const PayrollNzMenu = ({ urls, onMenuSelect, onMenuLinkClick, activeNav }) => (
  <Navigation.Menu
    label="Payroll"
    icon={<CaretIcon />}
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
