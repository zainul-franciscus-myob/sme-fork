import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountingUrls, getActiveNav, getPrepareBasOrIasLabel, getTaxCodesLabel,
} from '../NavigationSelectors';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const isJournalSeparatorRequired = urls => (
  urls.generalJournalList || urls.generalJournalCreate
);

const isAccountSeparatorRequired = urls => (
  urls.accountList || urls.linkedAccounts || urls.taxList
);

const getMenuLink = (url, label, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);

const getItems = ({
  urls, taxCodesLabel, prepareBasOrIasLabel, onMenuLinkClick,
}) => [
  urls.generalJournalList && getMenuLink(urls.generalJournalList, 'General journals', onMenuLinkClick),
  urls.generalJournalCreate && getMenuLink(urls.generalJournalCreate, 'Create general journal', onMenuLinkClick),
  isJournalSeparatorRequired(urls) && <Navigation.Separator key="separator-journal" />,
  urls.accountList && getMenuLink(urls.accountList, 'Chart of accounts', onMenuLinkClick),
  urls.linkedAccounts && getMenuLink(urls.linkedAccounts, 'Manage linked accounts', onMenuLinkClick),
  urls.taxList && getMenuLink(urls.taxList, taxCodesLabel, onMenuLinkClick),
  isAccountSeparatorRequired(urls) && <Navigation.Separator key="separator-account" />,
  urls.prepareBasOrIas && getMenuLink(urls.prepareBasOrIas, prepareBasOrIasLabel, onMenuLinkClick),
].filter(Boolean);

const AccountingMenu = ({
  urls, activeNav, taxCodesLabel, prepareBasOrIasLabel, onMenuSelect, onMenuLinkClick,
}) => (
  <Navigation.Menu
    label="Accounting"
    icon={<Icons.Caret />}
    onSelect={onMenuSelect}
    items={getItems({
      urls, taxCodesLabel, prepareBasOrIasLabel, onMenuLinkClick,
    })}
    active={activeNav === 'accounting'}
  />
);

const mapStateToProps = (state, props) => ({
  urls: getAccountingUrls(state, props),
  activeNav: getActiveNav(state),
  taxCodesLabel: getTaxCodesLabel(state),
  prepareBasOrIasLabel: getPrepareBasOrIasLabel(state),
});
export default connect(mapStateToProps)(AccountingMenu);
