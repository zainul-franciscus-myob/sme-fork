import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getActiveNav, getBankingUrls } from '../NavigationSelectors';

const getItems = urls => [
  urls.spendMoney && <Navigation.MenuLink key="Spend money" url={urls.spendMoney} label="Spend money" />,
  urls.receiveMoney && <Navigation.MenuLink key="Receive money" url={urls.receiveMoney} label="Receive money" />,
  urls.transferMoney && <Navigation.MenuLink key="Transfer money" url={urls.transferMoney} label="Transfer money" />,
  urls.transactionList && <Navigation.MenuLink key="Transaction list" url={urls.transactionList} label="Transaction list" />,
].filter(Boolean);

const BankingMenu = ({ urls, activeNav }) => Object.keys(urls).length > 0 && (
  <Navigation.Menu
    label="Banking"
    icon={<Icons.Caret />}
    onSelect={() => {}}
    items={getItems(urls)}
    active={activeNav === 'banking'}
  />
);

BankingMenu.propTypes = {
  urls: PropTypes.shape().isRequired,
  activeNav: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  urls: getBankingUrls(state, props),
  activeNav: getActiveNav(state),
});
export default connect(mapStateToProps)(BankingMenu);
