import {
  Icons, Label, Navigation, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getActiveNav,
  getBusinessUrls,
  getIsCurrentUserAdvisor,
  getIsReadOnly,
  getSerialNumber,
  getShouldShowPaymentDetail,
  getUserEmail,
} from '../NavigationSelectors';
import BusinessAvatar from '../../components/BusinessAvatar/BusinessAvatar';
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

const getMenuLink = (url, label, onMenuLinkClick, target) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url, target)}
  />
);

const getMenuLinkWithIcon = (url, label, icon, onMenuLinkClick, target) => (
  <Navigation.MenuLink
    key={label}
    url={url}
    label={label}
    onClick={handleMenuLinkClick(onMenuLinkClick, url)}
    icon={icon}
    target={target}
  />
);

const manageMyClientsMenuItem = onMenuLinkClick => getMenuLinkWithIcon('https://partner.myob.com/ledgers/live', 'Manage my clients', <Icons.Switch />, onMenuLinkClick, '_blank');
const switchBusinessMenuItem = onMenuLinkClick => getMenuLinkWithIcon('#/businesses', 'Switch business', <Icons.Switch />, onMenuLinkClick, undefined);

const UnlinkedMenuLink = ({ label, className }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <li className={classNames(styles.unlink, className)}><a role="button">{label}</a></li>
);

const createBusinessEnabled = () => ['dev', 'development', 'integration', 'pdv'].includes(process.env.NODE_ENV);

const getItems = ({
  urls,
  serialNumber,
  userEmail,
  shouldShowPaymentDetail,
  isCurrentUserAdvisor,
  onMenuLinkClick,
  onLogoutLinkClick,
  onSubscribeNowClick,
  onChangePlanClick,
  onCreateBusinessClick,
}) => [
  onSubscribeNowClick && getMenuLinkWithIcon('', 'Subscribe now', <Icons.OpenExternalLink />, onSubscribeNowClick, '_blank'),
  onSubscribeNowClick && <Navigation.Separator key="separator" />,
  urls.businessDetails && getMenuLink(urls.businessDetails, 'Business details', onMenuLinkClick),
  urls.incomeAllocation && getMenuLink(urls.incomeAllocation, 'Income allocation', onMenuLinkClick),
  urls.salesSettings && getMenuLink(urls.salesSettings, 'Invoice and quote settings', onMenuLinkClick),
  urls.payrollSettings && getMenuLink(urls.payrollSettings, 'Payroll settings', onMenuLinkClick),
  urls.userList && getMenuLink(urls.userList, 'Users', onMenuLinkClick),
  urls.dataImportExport && getMenuLink(urls.dataImportExport, 'Import and export data', onMenuLinkClick),
  isSeparatorRequired(urls) && <Navigation.Separator key="separator" />,
  onChangePlanClick && getMenuLinkWithIcon('', 'Change plan', <Icons.OpenExternalLink />, onChangePlanClick),
  shouldShowPaymentDetail ? getMenuLinkWithIcon(urls.paymentDetail, 'Payment details', <Icons.Wallet />, onMenuLinkClick, '_blank') : undefined,
  isCurrentUserAdvisor
    ? manageMyClientsMenuItem(onMenuLinkClick)
    : switchBusinessMenuItem(onMenuLinkClick),
  createBusinessEnabled() && onCreateBusinessClick && getMenuLinkWithIcon('', 'Create new business', <Icons.Add />, onCreateBusinessClick),
  getMenuLinkWithIcon('', 'Log out', <Icons.SignOut />, onLogoutLinkClick),
  userEmail && <UnlinkedMenuLink
    label={userEmail}
    className={classNames(styles.userDetails, styles.userEmail)}
  />,
  serialNumber && <UnlinkedMenuLink
    label={`Serial no. ${serialNumber}`}
    className={classNames(styles.userDetails, styles.serialNumber)}
  />,
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
  isCurrentUserAdvisor,
  shouldShowPaymentDetail,
  onMenuSelect,
  onMenuLinkClick,
  onLogoutLinkClick,
  onSubscribeNowClick,
  onChangePlanClick,
  onCreateBusinessClick,
  isReadOnly,
}) => (
    <div className={styles.businessMenu}>
      <Navigation.Menu
        label={(
          <div className={styles.avatar}>
            <BusinessAvatar businessName={businessName} />
            {businessName}
            {isReadOnly && <ReadonlyStatus />}
            <div className={styles.caret}><Icons.Caret /></div>
          </div>
        )}
        items={getItems({
          urls,
          serialNumber,
          userEmail,
          shouldShowPaymentDetail,
          isCurrentUserAdvisor,
          onMenuLinkClick,
          onLogoutLinkClick,
          onSubscribeNowClick,
          onChangePlanClick,
          onCreateBusinessClick,
        })}
        onSelect={onMenuSelect}
        active={activeNav === 'business'}
      />
    </div>
);

const mapStateToProps = state => ({
  urls: getBusinessUrls(state),
  serialNumber: getSerialNumber(state),
  userEmail: getUserEmail(state),
  activeNav: getActiveNav(state),
  isReadOnly: getIsReadOnly(state),
  isCurrentUserAdvisor: getIsCurrentUserAdvisor(state),
  shouldShowPaymentDetail: getShouldShowPaymentDetail(state),
});

export default connect(mapStateToProps)(BusinessMenu);
