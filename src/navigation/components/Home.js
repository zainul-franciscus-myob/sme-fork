import { Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getHomeUrl, getIsHomeActive } from '../NavigationSelectors';

const Home = ({ url, isActive }) => (
  <Navigation.Link
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
