import { connect } from 'react-redux';
import React from 'react';

import { getHomeUrl, getIsHomeActive } from '../NavigationSelectors';
import NavigationLink from '../../components/Feelix/Navigation/NavigationLink';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const Home = ({ url, isActive, onMenuLinkClick }) => (
  /*
    temporary solution:
    use copied NavigationLink to bind click event, will switch to use Feelix
    component once the Feelix issue#707 fixed
  */
  <NavigationLink
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
    active={isActive}
    url={url}
    label="Dashboard"
  />
);

const mapStateToProps = state => ({
  isActive: getIsHomeActive(state),
  url: getHomeUrl(state),
});

export default connect(mapStateToProps)(Home);
