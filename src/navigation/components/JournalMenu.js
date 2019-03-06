import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getActiveNav, getJournalUrls } from '../NavigationSelectors';

const getItems = urls => [
  urls.generalJournal && <Navigation.MenuLink key="General journal" url={urls.generalJournal} label="General journal" />,
  urls.generalJournalList && <Navigation.MenuLink key="View general journals" url={urls.generalJournalList} label="View general journals" />,
].filter(Boolean);

const JournalMenu = ({ urls, activeNav, onMenuSelect }) => (
  <Navigation.Menu
    label="Journals"
    icon={<Icons.Caret />}
    onSelect={onMenuSelect}
    items={getItems(urls)}
    active={activeNav === 'journals'}
  />
);

JournalMenu.propTypes = {
  urls: PropTypes.shape().isRequired,
  activeNav: PropTypes.string.isRequired,
  onMenuSelect: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  urls: getJournalUrls(state, props),
  activeNav: getActiveNav(state),
});
export default connect(mapStateToProps)(JournalMenu);
