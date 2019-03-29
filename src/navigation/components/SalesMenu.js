import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getActiveNav, getSalesUrls } from '../NavigationSelectors';

const getItems = urls => [
  urls.quoteList && <Navigation.MenuLink key="Quotes" url={urls.quoteList} label="Quotes" />,
  urls.invoiceList && <Navigation.MenuLink key="Invoices" url={urls.invoiceList} label="Invoices" />,
  urls.inventory && <Navigation.MenuLink key="Items" url={urls.inventory} label="Items" />,
].filter(Boolean);

const SalesMenu = ({ urls, activeNav, onMenuSelect }) => (
  <Navigation.Menu
    label="Sales"
    icon={<Icons.Caret />}
    onSelect={onMenuSelect}
    items={getItems(urls)}
    active={activeNav === 'sales'}
  />
);

SalesMenu.propTypes = {
  urls: PropTypes.shape().isRequired,
  activeNav: PropTypes.string.isRequired,
  onMenuSelect: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  urls: getSalesUrls(state, props),
  activeNav: getActiveNav(state),
});
export default connect(mapStateToProps)(SalesMenu);
