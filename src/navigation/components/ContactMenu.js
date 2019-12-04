import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getContactUrls } from '../NavigationSelectors';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';

const getMenuLink = (url, label, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);

const getItems = (urls, onMenuLinkClick) => [
  urls.contactList && getMenuLink(urls.contactList, 'All contacts', onMenuLinkClick),
  urls.contactCreate && getMenuLink(urls.contactCreate, 'Create contact', onMenuLinkClick),
].filter(Boolean);

const ContactMenu = ({
  urls, activeNav, onMenuSelect, onMenuLinkClick,
}) => (
  <Navigation.Menu
    label="Contacts"
    icon={<Icons.Caret />}
    items={getItems(urls, onMenuLinkClick)}
    active={activeNav === 'contact'}
    onSelect={onMenuSelect}
  />
);

const mapStateToProps = (state, props) => ({
  urls: getContactUrls(state, props),
  activeNav: getActiveNav(state),
});
export default connect(mapStateToProps)(ContactMenu);
