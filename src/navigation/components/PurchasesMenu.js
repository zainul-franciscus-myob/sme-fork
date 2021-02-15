import { CaretIcon, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getPurchasesUrls } from '../NavigationSelectors';
import { trackUserEvent } from '../../telemetry';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const isSeparatorRequired = (urls) =>
  urls.billList || urls.billCreate || urls.supplierPaymentCreate;

const isPurchaseOrderSeparatorRequired = (urls) =>
  urls.purchaseOrderList || urls.purchaseOrderCreate;

const getMenuLinkWithTrackingEvent = (
  url,
  label,
  onMenuLinkClick,
  trackingEvent
) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={() => {
      trackingEvent();
      handleMenuLinkClick(onMenuLinkClick, url);
    }}
  />
);

const getMenuLink = (url, label, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);

const getItems = (urls, onMenuLinkClick) => {
  const trackCreateSupplierPayment = () => {
    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'create_supplier_payment_clicked_in_navbar',
        page: 'SupplierPayment',
      },
    });
  };

  return [
    urls.purchaseOrderList &&
      getMenuLink(urls.purchaseOrderList, 'Purchase orders', onMenuLinkClick),
    urls.purchaseOrderCreate &&
      getMenuLink(
        urls.purchaseOrderCreate,
        'Create purchase order',
        onMenuLinkClick
      ),
    isPurchaseOrderSeparatorRequired(urls) && (
      <Navigation.Separator key="separator" />
    ),
    urls.billList && getMenuLink(urls.billList, 'Bills', onMenuLinkClick),
    urls.billCreate &&
      getMenuLink(urls.billCreate, 'Create bill', onMenuLinkClick),

    urls.supplierPaymentCreate &&
      getMenuLinkWithTrackingEvent(
        urls.supplierPaymentCreate,
        'Create supplier payment',
        onMenuLinkClick,
        trackCreateSupplierPayment
      ),
    isSeparatorRequired(urls) && <Navigation.Separator key="separator" />,
    urls.supplierReturnList &&
      getMenuLink(urls.supplierReturnList, 'Supplier returns', onMenuLinkClick),
    urls.itemList && getMenuLink(urls.itemList, 'Items', onMenuLinkClick),
  ].filter(Boolean);
};
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
