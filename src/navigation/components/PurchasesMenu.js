import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getActiveNav, getPurchasesUrls } from '../NavigationSelectors';

const getItems = urls => [
  urls.billPayment && <Navigation.MenuLink key="Bill Payment" url={urls.billPayment} label="Bill Payment" />,
  urls.billList && <Navigation.MenuLink key="Bills" url={urls.billList} label="Bills" />,
].filter(Boolean);

const PurchasesMenu = ({ urls, activeNav, onMenuSelect }) => (
  <Navigation.Menu
    label="Purchases"
    icon={<Icons.Caret />}
    onSelect={onMenuSelect}
    items={getItems(urls)}
    active={activeNav === 'purchases'}
  />
);

PurchasesMenu.propTypes = {
  urls: PropTypes.shape().isRequired,
  activeNav: PropTypes.string.isRequired,
  onMenuSelect: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  urls: getPurchasesUrls(state, props),
  activeNav: getActiveNav(state),
});
export default connect(mapStateToProps)(PurchasesMenu);
