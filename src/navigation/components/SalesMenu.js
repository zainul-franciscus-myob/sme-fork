import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getSalesUrls } from '../NavigationSelectors';
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
  urls.quoteList && getMenuLink(urls.quoteList, 'Quotes', onMenuLinkClick),
  urls.invoiceList && getMenuLink(urls.invoiceList, 'Invoices', onMenuLinkClick),
  urls.invoicePayment && getMenuLink(urls.invoicePayment, 'Invoice payment', onMenuLinkClick),
  urls.customerReturnList && getMenuLink(urls.customerReturnList, 'Customer returns', onMenuLinkClick),
  urls.customerReturnList && getMenuLink(urls.customerStatementList, 'Customer statements', onMenuLinkClick),
  urls.inventory && getMenuLink(urls.inventory, 'Items', onMenuLinkClick),
].filter(Boolean);

const SalesMenu = ({
  urls, activeNav, onMenuSelect, onMenuLinkClick,
}) => (
  <Navigation.Menu
    label="Sales"
    icon={<Icons.Caret />}
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
