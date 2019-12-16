import { Icons, Navigation } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getReportsUrls } from '../NavigationSelectors';
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
  urls.reportsFavourite && getMenuLink(urls.reportsFavourite, 'Favourites', onMenuLinkClick),
  urls.reportsStandard && getMenuLink(urls.reportsStandard, 'Standard', onMenuLinkClick),
  urls.reportsCustom && getMenuLink(urls.reportsCustom, 'Custom', onMenuLinkClick),
  urls.reportsException && getMenuLink(urls.reportsException, 'Exceptions dashboard', onMenuLinkClick),
  urls.reportsPackBuilder && getMenuLink(urls.reportsPackBuilder, 'Report pack builder', onMenuLinkClick),
  <Navigation.Separator key="separator" />,
  urls.reportsPdfStyleTemplates && getMenuLink(urls.reportsPdfStyleTemplates, 'PDF style templates', onMenuLinkClick),
].filter(Boolean);

const ReportsMenu = ({
  urls,
  onMenuSelect,
  onMenuLinkClick,
}) => (
  <Navigation.Menu
    label="Reports"
    icon={<Icons.Caret />}
    onSelect={onMenuSelect}
    items={getItems(urls, onMenuLinkClick)}
  />
);

const mapStateToProps = state => ({
  urls: getReportsUrls(state),
});

export default connect(mapStateToProps)(ReportsMenu);
