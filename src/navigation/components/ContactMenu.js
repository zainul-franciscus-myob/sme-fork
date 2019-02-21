import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getActiveNav, getContactUrls } from '../NavigationSelectors';

const getItems = urls => [
  urls.createContact && <Navigation.MenuLink key="Create contact" url={urls.createContact} label="Create contact" />,
  urls.contactList && <Navigation.MenuLink key="View contacts" url={urls.contactList} label="View contacts" />,
].filter(Boolean);

const ContactMenu = ({ urls, activeNav }) => Object.keys(urls).length > 0 && (
  <Navigation.Menu
    label="Contacts"
    icon={<Icons.Caret />}
    onSelect={() => {}}
    items={getItems(urls)}
    active={activeNav === 'contact'}
  />
);

ContactMenu.propTypes = {
  urls: PropTypes.shape().isRequired,
  activeNav: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  urls: getContactUrls(state, props),
  activeNav: getActiveNav(state),
});
export default connect(mapStateToProps)(ContactMenu);
