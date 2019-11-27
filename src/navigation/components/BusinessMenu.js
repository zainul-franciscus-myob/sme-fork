import {
  Icons, Label, Navigation, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getActiveNav,
  getBusinessName,
  getBusinessUrls,
  getIsReadOnly,
  getPrepareBasOrIasLabel,
  getTaxCodesLabel,
} from '../NavigationSelectors';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';
import styles from './BusinessMenu.module.css';

const isSeparatorRequired = urls => (
  urls.businessDetails
    || urls.taxList
    || urls.incomeAllocation
    || urls.userList
    || urls.salesSettings
    || urls.prepareBasOrIas
    || urls.linkedAccounts
    || urls.accountList
);

const getMenuLink = (url, label, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);

const getItems = ({
  urls,
  onMenuLinkClick,
  taxCodesLabel,
  prepareBasOrIasLabel,
}) => [
  urls.businessDetails && getMenuLink(urls.businessDetails, 'Business details', onMenuLinkClick),
  urls.incomeAllocation && getMenuLink(urls.incomeAllocation, 'Income allocation', onMenuLinkClick),
  urls.taxList && getMenuLink(urls.taxList, taxCodesLabel, onMenuLinkClick),
  urls.dataImportExport && getMenuLink(urls.dataImportExport, 'Import/Export data', onMenuLinkClick),
  urls.userList && getMenuLink(urls.userList, 'Users', onMenuLinkClick),
  urls.salesSettings && getMenuLink(urls.salesSettings, 'Invoice and quote settings', onMenuLinkClick),
  urls.prepareBasOrIas && getMenuLink(urls.prepareBasOrIas, prepareBasOrIasLabel, onMenuLinkClick),
  urls.linkedAccounts && getMenuLink(urls.linkedAccounts, 'Manage linked accounts', onMenuLinkClick),
  urls.bankFeeds && getMenuLink(urls.bankFeeds, 'Manage bank feeds', onMenuLinkClick),
  urls.accountList && getMenuLink(urls.accountList, 'Accounts', onMenuLinkClick),
  isSeparatorRequired(urls) && <Navigation.Separator key="separator" />,
  <Navigation.MenuLink key="logout" url="#/logout" label="Logout" icon={<Icons.SignOut />} onClick={handleMenuLinkClick(onMenuLinkClick, '#/logout')} />,
].filter(Boolean);

const ReadonlyStatus = () => (
  <span className={styles.readonly}>
    <Tooltip
      placement="bottom"
      triggerContent={<Label type="boxed" size="small">Read only</Label>}
    >
      You have read only permission. Contact your administrator if you think this is a mistake.
    </Tooltip>
  </span>
);

const BusinessMenu = ({
  businessName,
  urls,
  activeNav,
  onMenuSelect,
  onMenuLinkClick,
  taxCodesLabel,
  isReadOnly,
  prepareBasOrIasLabel,
}) => (
  <Navigation.Menu
    label={(
      <>
        {businessName}
        {isReadOnly && <ReadonlyStatus />}
      </>
    )}
    icon={<Icons.Caret />}
    items={getItems({
      urls, onMenuLinkClick, taxCodesLabel, prepareBasOrIasLabel,
    })}
    onSelect={onMenuSelect}
    active={activeNav === 'business'}
  />
);

const mapStateToProps = state => ({
  urls: getBusinessUrls(state),
  businessName: getBusinessName(state),
  activeNav: getActiveNav(state),
  taxCodesLabel: getTaxCodesLabel(state),
  isReadOnly: getIsReadOnly(state),
  prepareBasOrIasLabel: getPrepareBasOrIasLabel(state),
});

export default connect(mapStateToProps)(BusinessMenu);
