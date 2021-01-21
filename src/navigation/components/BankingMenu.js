import { CaretIcon, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getBankingUrls } from '../NavigationSelectors';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const isBankingSeparatorRequired = (urls) =>
  urls.bankTransactionList ||
  urls.bankReconciliation ||
  urls.bankingRuleList ||
  urls.bankFeeds;

const isElectronicPaymentSeparatorRequired = (urls) =>
  urls.electronicPaymentCreate;

const isTransactionSeparatorRequired = (urls) =>
  urls.spendMoneyCreate ||
  urls.receiveMoneyCreate ||
  urls.transferMoneyCreate ||
  urls.recurringTransactionBankingList;

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
    urls.bankTransactionList &&
      getMenuLink(
        urls.bankTransactionList,
        'Bank transactions',
        onMenuLinkClick
      ),
    urls.bankReconciliation &&
      getMenuLink(
        urls.bankReconciliation,
        'Reconcile accounts',
        onMenuLinkClick
      ),
    urls.bankingRuleList &&
      getMenuLink(urls.bankingRuleList, 'Bank rules', onMenuLinkClick),
    urls.bankFeeds &&
      getMenuLink(urls.bankFeeds, 'Manage bank feeds', onMenuLinkClick),
    isBankingSeparatorRequired(urls) && (
      <Navigation.Separator key="separator-banking" />
    ),
    urls.electronicPaymentCreate &&
      getMenuLink(
        urls.electronicPaymentCreate,
        'Bank file payments',
        onMenuLinkClick
      ),
    isElectronicPaymentSeparatorRequired(urls) && (
      <Navigation.Separator key="separator-electronic-payment" />
    ),
    urls.spendMoneyCreate &&
      getMenuLink(urls.spendMoneyCreate, 'Spend money', onMenuLinkClick),
    urls.receiveMoneyCreate &&
      getMenuLink(urls.receiveMoneyCreate, 'Receive money', onMenuLinkClick),
    urls.transferMoneyCreate &&
      getMenuLink(urls.transferMoneyCreate, 'Transfer money', onMenuLinkClick),
    urls.recurringTransactionBankingList &&
      getMenuLink(
        urls.recurringTransactionBankingList,
        'Recurring transactions',
        onMenuLinkClick
      ),
    isTransactionSeparatorRequired(urls) && (
      <Navigation.Separator key="separator-transaction" />
    ),
    urls.transactionList &&
      getMenuLink(urls.transactionList, 'Find transactions', onMenuLinkClick),
  ].filter(Boolean);

const BankingMenu = ({ urls, activeNav, onMenuSelect, onMenuLinkClick }) => (
  <Navigation.Menu
    label="Banking"
    icon={<CaretIcon />}
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
