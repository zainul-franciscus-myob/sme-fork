import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getBankingUrls } from '../NavigationSelectors';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const showSeparator = urls => urls.bankTransactionList || urls.bankReconciliation;

const getMenuLink = (url, label, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);

const getItems = (urls, onMenuLinkClick) => [
  urls.bankTransactionList && getMenuLink(urls.bankTransactionList, 'Bank transactions', onMenuLinkClick),
  urls.bankReconciliation && getMenuLink(urls.bankReconciliation, 'Reconcile bank accounts', onMenuLinkClick),
  showSeparator(urls) && <Navigation.Separator key="separator" />,
  urls.spendMoney && getMenuLink(urls.spendMoney, 'Spend money', onMenuLinkClick),
  urls.receiveMoney && getMenuLink(urls.receiveMoney, 'Receive money', onMenuLinkClick),
  urls.transferMoney && getMenuLink(urls.transferMoney, 'Transfer money', onMenuLinkClick),
  urls.transactionList && getMenuLink(urls.transactionList, 'Transaction list', onMenuLinkClick),
  urls.bankingRule && getMenuLink(urls.bankingRule, 'Banking rules', onMenuLinkClick),
].filter(Boolean);

const BankingMenu = ({
  urls, activeNav, onMenuSelect, onMenuLinkClick,
}) => (
  <Navigation.Menu
    label="Banking"
    icon={<Icons.Caret />}
    onSelect={onMenuSelect}
    items={getItems(urls, onMenuLinkClick)}
    active={activeNav === 'banking'}
  />
);

const mapStateToProps = (state, props) => ({
  urls: getBankingUrls(state, props),
  activeNav: getActiveNav(state),
});
export default connect(mapStateToProps)(BankingMenu);
