import { Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAddUrls } from '../NavigationSelectors';
import ImageIconMenu from './ImageIconMenu';
import addIconImage from './images/AddIcon.svg';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const isSeparatorRequired = urls => (
  urls.quoteCreate || urls.invoiceCreate || urls.billCreate
);

const isPayRunSeparatorRequired = urls => (
  urls.payRunCreate
);

const isTransactionSeparatorRequired = urls => (
  urls.spendMoneyCreate || urls.receiveMoneyCreate || urls.transferMoneyCreate
);

const getMenuLink = (url, label, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);

const getItems = (urls, onMenuLinkClick) => [
  urls.quoteCreate && getMenuLink(urls.quoteCreate, 'Quote', onMenuLinkClick),
  urls.invoiceCreate && getMenuLink(urls.invoiceCreate, 'Invoice', onMenuLinkClick),
  urls.billCreate && getMenuLink(urls.billCreate, 'Bill', onMenuLinkClick),
  isSeparatorRequired(urls) && <Navigation.Separator key="separator" />,
  urls.payRunCreate && getMenuLink(urls.payRunCreate, 'Pay run', onMenuLinkClick),
  isPayRunSeparatorRequired(urls) && <Navigation.Separator key="separator-pay-run" />,
  urls.spendMoneyCreate && getMenuLink(urls.spendMoneyCreate, 'Spend money', onMenuLinkClick),
  urls.receiveMoneyCreate && getMenuLink(urls.receiveMoneyCreate, 'Receive money', onMenuLinkClick),
  urls.transferMoneyCreate && getMenuLink(urls.transferMoneyCreate, 'Transfer money', onMenuLinkClick),
  isTransactionSeparatorRequired(urls) && <Navigation.Separator key="separator-transaction" />,
  urls.employeeCreate && getMenuLink(urls.employeeCreate, 'Employee', onMenuLinkClick),
  urls.contactCreate && getMenuLink(urls.contactCreate, 'Contact', onMenuLinkClick),
].filter(Boolean);

const AddMenu = ({
  urls, onMenuSelect, onMenuLinkClick, className,
}) => (
  <ImageIconMenu
    image={addIconImage}
    tooltip="Create new"
    items={getItems(urls, onMenuLinkClick)}
    onSelect={onMenuSelect}
    className={className}
  />
);

const mapStateToProps = (state, props) => ({
  urls: getAddUrls(state, props),
});

export default connect(mapStateToProps)(AddMenu);
