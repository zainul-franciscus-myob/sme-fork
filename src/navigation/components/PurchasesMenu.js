import { CaretIcon, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getPurchasesUrls } from '../NavigationSelectors';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const isSeparatorRequired = (urls) =>
  urls.billList || urls.billCreate || urls.billPaymentCreate;

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
    urls.billList && getMenuLink(urls.billList, 'Bills', onMenuLinkClick),
    urls.billCreate &&
      getMenuLink(urls.billCreate, 'Create bill', onMenuLinkClick),
    urls.billPaymentCreate &&
      getMenuLink(
        urls.billPaymentCreate,
        'Create bill payment',
        onMenuLinkClick
      ),
    isSeparatorRequired(urls) && <Navigation.Separator key="separator" />,
    urls.supplierReturnList &&
      getMenuLink(urls.supplierReturnList, 'Supplier returns', onMenuLinkClick),
    urls.itemList && getMenuLink(urls.itemList, 'Items', onMenuLinkClick),
  ].filter(Boolean);

const PurchasesMenu = ({ urls, activeNav, onMenuSelect, onMenuLinkClick }) => (
  <Navigation.Menu
    label="Purchases"
    icon={<CaretIcon />}
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
