import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getActiveNav, getBusinessName, getBusinessUrls, getTaxCodesLabel,
} from '../NavigationSelectors';

const getItems = ({ urls, taxCodesLabel }) => [
  urls.businessDetails && <Navigation.MenuLink key="businessDetails" label="Business details" url={urls.businessDetails} />,
  urls.incomeAllocation && <Navigation.MenuLink key="incomeAllocation" label="Income allocation" url={urls.incomeAllocation} />,
  urls.taxList && <Navigation.MenuLink key="taxList" label={taxCodesLabel} url={urls.taxList} />,
  urls.incomeAllocation && <Navigation.Separator key="separator" />,
  <Navigation.MenuLink key="logout" url="#/logout" label="Logout" icon={<Icons.SignOut />} />,
].filter(Boolean);

const BusinessMenu = ({
  businessName, urls, activeNav, onMenuSelect, taxCodesLabel,
}) => (
  <Navigation.Menu
    label={businessName}
    icon={<Icons.Caret />}
    items={getItems({ urls, taxCodesLabel })}
    onSelect={onMenuSelect}
    active={activeNav === 'business'}
  />
);

BusinessMenu.propTypes = {
  businessName: PropTypes.string.isRequired,
  activeNav: PropTypes.string.isRequired,
  taxCodesLabel: PropTypes.string.isRequired,
  urls: PropTypes.shape({}).isRequired,
  onMenuSelect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  urls: getBusinessUrls(state),
  businessName: getBusinessName(state),
  activeNav: getActiveNav(state),
  taxCodesLabel: getTaxCodesLabel(state),
});

export default connect(mapStateToProps)(BusinessMenu);
