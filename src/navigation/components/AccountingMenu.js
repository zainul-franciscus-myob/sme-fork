import { CaretIcon, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountingUrls,
  getActiveNav,
  getIsNzPayrollOnly,
  getOnlineTaxLabel,
  getShouldDisplayAccountingTaxMenuItem,
  getShouldDisplayOnlineTaxMenuItem,
  getTaxCodesLabel,
} from '../NavigationSelectors';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const isJournalSeparatorRequired = (urls) =>
  urls.generalJournalList || urls.generalJournalCreate;

const isAccountSeparatorRequired = (urls) =>
  urls.accountList || urls.linkedAccounts || urls.taxList;

const getMenuLink = (url, label, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);
const getJournalMenuItems = (urls, onMenuLinkClick) => [
  urls.generalJournalList &&
    getMenuLink(urls.generalJournalList, 'General journals', onMenuLinkClick),
  urls.generalJournalCreate &&
    getMenuLink(
      urls.generalJournalCreate,
      'Create general journal',
      onMenuLinkClick
    ),
  isJournalSeparatorRequired(urls) && (
    <Navigation.Separator key="separator-journal" />
  ),
];

const getOnlineTaxMenuItems = (urls, onMenuLinkClick, onlineTaxLabel) => [
  isAccountSeparatorRequired(urls) && (
    <Navigation.Separator key="separator-account" />
  ),
  urls.onlineTax &&
    getMenuLink(urls.onlineTax, onlineTaxLabel, onMenuLinkClick),
];

const getAccountingMenuItems = (
  urls,
  taxCodesLabel,
  onMenuLinkClick,
  isNzPayrollOnly,
  shouldDisplayAccountingTaxMenuItem
) => [
  urls.accountList &&
    getMenuLink(urls.accountList, 'Chart of accounts', onMenuLinkClick),
  urls.linkedAccounts &&
    getMenuLink(urls.linkedAccounts, 'Manage linked accounts', onMenuLinkClick),
  urls.jobList &&
    !isNzPayrollOnly &&
    getMenuLink(urls.jobList, 'Jobs', onMenuLinkClick),
  urls.taxList &&
    shouldDisplayAccountingTaxMenuItem &&
    getMenuLink(urls.taxList, taxCodesLabel, onMenuLinkClick),
];

const getItems = ({
  isNzPayrollOnly,
  urls,
  taxCodesLabel,
  onlineTaxLabel,
  onMenuLinkClick,
  shouldDisplayAccountingTaxMenuItem,
  shouldDisplayOnlineTaxMenuItem,
}) => {
  const journalMenu = isNzPayrollOnly
    ? []
    : getJournalMenuItems(urls, onMenuLinkClick);
  const onlineTaxMenu = shouldDisplayOnlineTaxMenuItem
    ? getOnlineTaxMenuItems(urls, onMenuLinkClick, onlineTaxLabel)
    : [];
  const accountingMenu = getAccountingMenuItems(
    urls,
    taxCodesLabel,
    onMenuLinkClick,
    isNzPayrollOnly,
    shouldDisplayAccountingTaxMenuItem
  );
  const menu = [...journalMenu, ...accountingMenu, ...onlineTaxMenu].filter(
    Boolean
  );

  return menu;
};

const AccountingMenu = ({
  urls,
  activeNav,
  taxCodesLabel,
  onlineTaxLabel,
  onMenuSelect,
  onMenuLinkClick,
  isNzPayrollOnly,
  shouldDisplayAccountingTaxMenuItem,
  shouldDisplayOnlineTaxMenuItem,
}) => (
  <Navigation.Menu
    label="Accounting"
    icon={<CaretIcon />}
    onSelect={onMenuSelect}
    items={getItems({
      isNzPayrollOnly,
      urls,
      taxCodesLabel,
      onlineTaxLabel,
      onMenuLinkClick,
      shouldDisplayAccountingTaxMenuItem,
      shouldDisplayOnlineTaxMenuItem,
    })}
    active={activeNav === 'accounting'}
  />
);

const mapStateToProps = (state, props) => ({
  urls: getAccountingUrls(state, props),
  activeNav: getActiveNav(state),
  taxCodesLabel: getTaxCodesLabel(state),
  onlineTaxLabel: getOnlineTaxLabel(state),
  isNzPayrollOnly: getIsNzPayrollOnly(state),
  shouldDisplayAccountingTaxMenuItem: getShouldDisplayAccountingTaxMenuItem(
    state
  ),
  shouldDisplayOnlineTaxMenuItem: getShouldDisplayOnlineTaxMenuItem(state),
});
export default connect(mapStateToProps)(AccountingMenu);
