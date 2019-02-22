import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getActiveNav, getBusinessId, getBusinessName, getBusinessUrls,
} from '../NavigationSelectors';

const getItems = ({ urls }) => [
  urls.incomeAllocation && <Navigation.MenuLink key="incomeAllocation" label="Income Allocation" url={urls.incomeAllocation} />,
  urls.incomeAllocation && <Navigation.Separator key="sperator" />,
  <Navigation.MenuLink key="logout" url="#/logout" label="Logout" icon={<Icons.SignOut />} />,
].filter(Boolean);

const BusinessMenu = ({
  businessId, businessName, urls, activeNav, onMenuSelect,
}) => (businessId ? (
  <Navigation.Menu
    label={businessName}
    icon={<Icons.Caret />}
    items={getItems({ urls })}
    onSelect={onMenuSelect}
    active={activeNav === 'business'}
  />
) : <Navigation.Link key="logout" url="#/logout" label="Logout" icon={<Icons.SignOut />} />);


BusinessMenu.propTypes = {
  businessId: PropTypes.string.isRequired,
  businessName: PropTypes.string.isRequired,
  activeNav: PropTypes.string.isRequired,
  urls: PropTypes.shape({}).isRequired,
  onMenuSelect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  urls: getBusinessUrls(state),
  businessId: getBusinessId(state),
  businessName: getBusinessName(state),
  activeNav: getActiveNav(state),
});

export default connect(mapStateToProps)(BusinessMenu);
