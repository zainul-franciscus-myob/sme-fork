import { connect } from 'react-redux';
import React from 'react';

import { getInTrayUrl, getIsInTrayActive } from '../NavigationSelectors';
import NavigationLink from '../../components/Feelix/Navigation/NavigationLink';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const InTray = ({ url, isActive, onMenuLinkClick }) => (
  /*
  temporary solution:
  use copied NavigationLink to bind click event, will switch to use Feelix
  component once the Feelix issue#707 fixed
*/
  <NavigationLink
    active={isActive}
    url={url}
    label="In tray"
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);

const mapStateToProps = (state) => ({
  isActive: getIsInTrayActive(state),
  url: getInTrayUrl(state),
});
export default connect(mapStateToProps)(InTray);
