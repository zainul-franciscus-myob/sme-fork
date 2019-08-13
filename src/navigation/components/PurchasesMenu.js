import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getPurchasesUrls } from '../NavigationSelectors';
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
  urls.billPayment && getMenuLink(urls.billPayment, 'Bill Payment', onMenuLinkClick),
  urls.billList && getMenuLink(urls.billList, 'Bills', onMenuLinkClick),
  urls.supplierReturnList && getMenuLink(urls.supplierReturnList, 'Supplier returns', onMenuLinkClick),
].filter(Boolean);

const PurchasesMenu = ({
  urls, activeNav, onMenuSelect, onMenuLinkClick,
}) => (
  <Navigation.Menu
    label="Purchases"
    icon={<Icons.Caret />}
    onSelect={onMenuSelect}
    items={getItems(urls, onMenuLinkClick)}
    active={activeNav === 'purchases'}
  />
);

const mapStateToProps = (state, props) => ({
  urls: getPurchasesUrls(state, props),
  activeNav: getActiveNav(state),
});
export default connect(mapStateToProps)(PurchasesMenu);
