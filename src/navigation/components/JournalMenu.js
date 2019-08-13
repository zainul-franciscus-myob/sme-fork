import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveNav, getJournalUrls } from '../NavigationSelectors';
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
  urls.generalJournal && getMenuLink(urls.generalJournal, 'General journal', onMenuLinkClick),
  urls.generalJournalList && getMenuLink(urls.generalJournalList, 'View general journals', onMenuLinkClick),
].filter(Boolean);

const JournalMenu = ({
  urls, activeNav, onMenuSelect, onMenuLinkClick,
}) => (
  <Navigation.Menu
    label="Journals"
    icon={<Icons.Caret />}
    onSelect={onMenuSelect}
    items={getItems(urls, onMenuLinkClick)}
    active={activeNav === 'journals'}
  />
);

const mapStateToProps = (state, props) => ({
  urls: getJournalUrls(state, props),
  activeNav: getActiveNav(state),
});
export default connect(mapStateToProps)(JournalMenu);
