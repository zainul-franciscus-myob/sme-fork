import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getPayrollUrls } from '../NavigationSelectors';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const isEmployeeSeparatorRequired = (urls) =>
  urls.employeeList || urls.employeeCreate;

const isPayRunSeparatorRequired = (urls) =>
  urls.payRunList || urls.payRunCreate;

const getMenuLink = (url, label, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);

const getMenuLinkWithIcon = (url, label, icon, onMenuLinkClick, target) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url, target)}
    icon={icon}
    iconRight
    target={target}
  />
);

const getItems = (urls, onMenuLinkClick) =>
  [
    urls.employeeList &&
      getMenuLink(urls.employeeList, 'Employees', onMenuLinkClick),
    urls.employeeCreate &&
      getMenuLink(urls.employeeCreate, 'Create employee', onMenuLinkClick),
    isEmployeeSeparatorRequired(urls) && (
      <Navigation.Separator key="separator-employee" />
    ),
    urls.payRunList &&
      getMenuLink(urls.payRunList, 'Pay runs', onMenuLinkClick),
    urls.payRunCreate &&
      getMenuLink(urls.payRunCreate, 'Create pay run', onMenuLinkClick),
    isPayRunSeparatorRequired(urls) && (
      <Navigation.Separator key="separator-pay-run" />
    ),
    urls.payItemList &&
      getMenuLink(urls.payItemList, 'Pay items', onMenuLinkClick),
    urls.timesheets &&
      getMenuLink(urls.timesheets, 'Timesheets', onMenuLinkClick),
    urls.myobTeamLink &&
      getMenuLinkWithIcon(
        urls.myobTeamLink,
        'MYOB Team',
        <Icons.OpenExternalLink />,
        onMenuLinkClick,
        '_blank'
      ),
    <Navigation.Separator key="separator-pay-item-timesheets" />,
    urls.electronicPaymentCreate &&
      getMenuLink(
        urls.electronicPaymentCreate,
        'Bank file payments',
        onMenuLinkClick
      ),
    urls.superPaymentList &&
      getMenuLink(urls.superPaymentList, 'Super payments', onMenuLinkClick),
    <Navigation.Separator key="separator-payments" />,
    urls.stpReporting &&
      getMenuLink(
        urls.stpReporting,
        'Single Touch Payroll reporting',
        onMenuLinkClick
      ),
  ].filter(Boolean);

const PayrollMenu = ({ urls, onMenuSelect, onMenuLinkClick, activeNav }) => (
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
