import { Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getReportsUrl } from '../NavigationSelectors';

const Reports = ({
  url,
}) => <Navigation.Link url={url} label="Reports" />;

const mapStateToProps = state => ({
  url: getReportsUrl(state),
});

export default connect(mapStateToProps)(Reports);
