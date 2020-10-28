import { CaretIcon, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountingUrls,
  getActiveNav,
  getOnlineTaxLabel,
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

const getItems = ({ urls, taxCodesLabel, onlineTaxLabel, onMenuLinkClick }) =>
  [
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
    urls.accountList &&
      getMenuLink(urls.accountList, 'Chart of accounts', onMenuLinkClick),
    urls.linkedAccounts &&
      getMenuLink(
        urls.linkedAccounts,
        'Manage linked accounts',
        onMenuLinkClick
      ),
    urls.jobList && getMenuLink(urls.jobList, 'Jobs', onMenuLinkClick),
    urls.taxList && getMenuLink(urls.taxList, taxCodesLabel, onMenuLinkClick),
    isAccountSeparatorRequired(urls) && (
      <Navigation.Separator key="separator-account" />
    ),
    urls.onlineTax &&
      getMenuLink(urls.onlineTax, onlineTaxLabel, onMenuLinkClick),
  ].filter(Boolean);

const AccountingMenu = ({
  urls,
  activeNav,
  taxCodesLabel,
  onlineTaxLabel,
  onMenuSelect,
  onMenuLinkClick,
}) => (
  <Navigation.Menu
    label="Accounting"
    icon={<CaretIcon />}
    onSelect={onMenuSelect}
    items={getItems({
      urls,
      taxCodesLabel,
      onlineTaxLabel,
      onMenuLinkClick,
    })}
    active={activeNav === 'accounting'}
  />
);

const mapStateToProps = (state, props) => ({
  urls: getAccountingUrls(state, props),
  activeNav: getActiveNav(state),
  taxCodesLabel: getTaxCodesLabel(state),
  onlineTaxLabel: getOnlineTaxLabel(state),
});
export default connect(mapStateToProps)(AccountingMenu);
