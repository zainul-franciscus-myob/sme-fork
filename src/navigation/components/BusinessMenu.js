import {
  Icons, Label, Navigation, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getActiveNav,
  getBusinessName,
  getBusinessUrls,
  getIsReadOnly,
  getSerialNumber,
  getShowBusinessAvatar,
  getUserEmail,
} from '../NavigationSelectors';
import BusinessAvatar from './BusinessAvatar';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';
import styles from './BusinessMenu.module.css';

const isSeparatorRequired = urls => (
  urls.businessDetails
    || urls.incomeAllocation
    || urls.salesSettings
    || urls.payrollSettings
    || urls.userList
    || urls.dataImportExport
);

const getMenuLink = (url, label, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
  />
);

const getMenuLinkWithIcon = (url, label, icon, onMenuLinkClick) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
    icon={icon}
  />
);

const getDisabledMenuLink = label => (
  <Navigation.MenuLink key={label} url="" label={label} disabled />
);

const UnlinkedMenuLink = ({ label, className }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <li className={classNames(styles.unlink, className)}><a role="button">{label}</a></li>
);

const getItems = ({
  urls, serialNumber, userEmail, onMenuLinkClick,
}) => [
  getMenuLinkWithIcon('#/businesses', 'Switch business', <Icons.Switch />, onMenuLinkClick),
  <Navigation.Separator key="separator-switch-business" />,
  urls.businessDetails && getMenuLink(urls.businessDetails, 'Business details', onMenuLinkClick),
  urls.incomeAllocation && getMenuLink(urls.incomeAllocation, 'Income allocation', onMenuLinkClick),
  urls.salesSettings && getMenuLink(urls.salesSettings, 'Invoice and quote settings', onMenuLinkClick),
  urls.payrollSettings && getMenuLink(urls.payrollSettings, 'Payroll settings', onMenuLinkClick),
  urls.userList && getMenuLink(urls.userList, 'Users', onMenuLinkClick),
  urls.dataImportExport && getMenuLink(urls.dataImportExport, 'Import and export data', onMenuLinkClick),
  isSeparatorRequired(urls) && <Navigation.Separator key="separator" />,
  userEmail && <UnlinkedMenuLink label={userEmail} className={styles.userEmail} />,
  getDisabledMenuLink('my.MYOB account'),
  urls.subscription && getMenuLink(urls.subscription, 'Subscription details', onMenuLinkClick),
  <Navigation.Separator key="separator-links" />,
  serialNumber && <UnlinkedMenuLink label={`Serial number: ${serialNumber}`} />,
  getMenuLinkWithIcon('#/logout', 'Logout', <Icons.SignOut />, onMenuLinkClick),
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
  serialNumber,
  userEmail,
  urls,
  activeNav,
  onMenuSelect,
  onMenuLinkClick,
  isReadOnly,
  showBusinessAvatar,
}) => (
  <Navigation.Menu
    label={(
      <>
        {showBusinessAvatar && <BusinessAvatar />}
        {businessName}
        {isReadOnly && <ReadonlyStatus />}
      </>
    )}
    icon={<Icons.Caret />}
    items={getItems({
      urls, serialNumber, userEmail, onMenuLinkClick,
    })}
    onSelect={onMenuSelect}
    active={activeNav === 'business'}
  />
);

const mapStateToProps = state => ({
  urls: getBusinessUrls(state),
  businessName: getBusinessName(state),
  serialNumber: getSerialNumber(state),
  userEmail: getUserEmail(state),
  activeNav: getActiveNav(state),
  isReadOnly: getIsReadOnly(state),
  showBusinessAvatar: getShowBusinessAvatar(state),
});

export default connect(mapStateToProps)(BusinessMenu);
