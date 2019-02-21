import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getBusinessId, getBusinessName } from '../NavigationSelectors';

const getItems = ({ logout }) => [
  <Navigation.MenuLink key="logout" url="/" onClick={logout} label="Logout" icon={<Icons.SignOut />} />,
];

const BusinessMenu = ({ businessId, businessName, logout }) => (businessId ? (
  <Navigation.Menu
    label={businessName}
    icon={<Icons.Caret />}
    onSelect={() => {}}
    items={getItems({ logout })}
  />
) : <Navigation.Link key="logout" url="/" onClick={logout} label="Logout" icon={<Icons.SignOut />} />);


BusinessMenu.propTypes = {
  businessId: PropTypes.string.isRequired,
  businessName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  businessId: getBusinessId(state),
  businessName: getBusinessName(state),
});

export default connect(mapStateToProps)(BusinessMenu);
