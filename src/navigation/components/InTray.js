import { Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getInTrayUrl,
  getIsInTrayActive,
} from '../NavigationSelectors';

const InTray = ({ url, isActive }) => <Navigation.Link active={isActive} url={url} label="In Tray" />;

const mapStateToProps = state => ({
  isActive: getIsInTrayActive(state),
  url: getInTrayUrl(state),
});
export default connect(mapStateToProps)(InTray);
