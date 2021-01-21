import { CaretIcon, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getSalesUrls } from '../NavigationSelectors';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const isQuoteSeparatorRequired = (urls) => urls.quoteList || urls.quoteCreate;

const isInvoiceSeparatorRequired = (urls) =>
  urls.invoiceList ||
  urls.invoiceCreate ||
  urls.invoicePaymentCreate ||
  urls.recurringTransactionSalesList;

const isInventorySeparatorRequired = (urls) =>
  urls.customerReturnList || urls.itemList;

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
    urls.quoteList && getMenuLink(urls.quoteList, 'Quotes', onMenuLinkClick),
    urls.quoteCreate &&
      getMenuLink(urls.quoteCreate, 'Create quote', onMenuLinkClick),
    isQuoteSeparatorRequired(urls) && (
      <Navigation.Separator key="separator-quote" />
    ),
    urls.invoiceList &&
      getMenuLink(urls.invoiceList, 'Invoices', onMenuLinkClick),
    urls.invoiceCreate &&
      getMenuLink(urls.invoiceCreate, 'Create invoice', onMenuLinkClick),
    urls.invoicePaymentCreate &&
      getMenuLink(
        urls.invoicePaymentCreate,
        'Create invoice payment',
        onMenuLinkClick
      ),
    urls.recurringTransactionSalesList &&
      getMenuLink(
        urls.recurringTransactionSalesList,
        'Recurring transactions',
        onMenuLinkClick
      ),
    isInvoiceSeparatorRequired(urls) && (
      <Navigation.Separator key="separator-invoice" />
    ),
    urls.customerReturnList &&
      getMenuLink(urls.customerReturnList, 'Customer returns', onMenuLinkClick),
    urls.itemList && getMenuLink(urls.itemList, 'Items', onMenuLinkClick),
    isInventorySeparatorRequired(urls) && (
      <Navigation.Separator key="separator-inventory" />
    ),
    urls.customerStatementList &&
      getMenuLink(
        urls.customerStatementList,
        'Customer statements',
        onMenuLinkClick
      ),
  ].filter(Boolean);

const SalesMenu = ({ urls, activeNav, onMenuSelect, onMenuLinkClick }) => (
  <Navigation.Menu
    label="Sales"
    icon={<CaretIcon />}
    onSelect={onMenuSelect}
    items={getItems(urls, onMenuLinkClick)}
    active={activeNav === 'sales'}
  />
);

const mapStateToProps = (state, props) => ({
  urls: getSalesUrls(state, props),
  activeNav: getActiveNav(state),
});
export default connect(mapStateToProps)(SalesMenu);
