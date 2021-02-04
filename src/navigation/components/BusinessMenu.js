import {
  AddIcon,
  CaretIcon,
  EditIcon,
  InventoryIcon,
  Label,
  Navigation,
  PurchasesIcon,
  SignOutIcon,
  SwitchIcon,
  Tooltip,
  WalletIcon,
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
  getShouldDisplayAccountBillingMenuText,
  getShouldShowMoveToMYOB,
  getShouldShowPaymentDetail,
  getUserEmail,
} from '../NavigationSelectors';
import BusinessAvatar from '../../components/BusinessAvatar/BusinessAvatar';
import handleMenuLinkClick from './handlers/handleMenuLinkClick';
import styles from './BusinessMenu.module.css';

const isSeparatorRequired = (urls) =>
  urls.appMarketplace ||
  urls.businessDetails ||
  urls.createNewBusiness ||
  urls.dataImportExport ||
  urls.incomeAllocation ||
  urls.manageMyClients ||
  urls.moveToMYOB ||
  urls.payrollSettings ||
  urls.reportSettings ||
  urls.salesSettings ||
  urls.userList;

const getMenuLink = ({
  icon,
  label,
  onClick,
  target,
  tracking,
  url,
  ...props
}) => {
  return (
    <Navigation.MenuLink
      icon={icon}
      key={label}
      label={label}
      onClick={handleMenuLinkClick(onClick, url, target)}
      url={url}
      {...props}
    />
  );
};

const getItems = ({
  isCurrentUserAdvisor,
  onCreateBusinessClick,
  onManageMyProductClick,
  onMoveToMYOB,
  onLogoutLinkClick,
  serialNumber,
  shouldShowMoveToMYOB,
  shouldShowPaymentDetail,
  urls,
  userEmail,
  shouldDisplayAccountBillingMenuText,
}) =>
  [
    urls.businessDetails &&
      getMenuLink({
        label: 'Business settings',
        url: urls.businessDetails,
      }),
    urls.incomeAllocation &&
      getMenuLink({
        label: 'Income allocation',
        url: urls.incomeAllocation,
      }),
    urls.salesSettings &&
      getMenuLink({
        label: 'Sales settings',
        url: urls.salesSettings,
      }),
    urls.payrollSettings &&
      getMenuLink({
        label: 'Payroll settings',
        url: urls.payrollSettings,
      }),
    urls.purchaseSettings &&
      getMenuLink({
        label: 'Purchases settings',
        url: urls.purchaseSettings,
      }),
    urls.reportSettings &&
      getMenuLink({
        label: 'Report settings',
        url: urls.reportSettings,
      }),
    urls.userList &&
      getMenuLink({
        label: 'Users',
        url: urls.userList,
      }),
    urls.dataImportExport &&
      getMenuLink({
        label: 'Import and export data',
        url: urls.dataImportExport,
      }),
    isSeparatorRequired(urls) && <Navigation.Separator key="separator" />,
    shouldShowMoveToMYOB &&
      getMenuLink({
        icon: <InventoryIcon />,
        label: 'Move to MYOB',
        onClick: onMoveToMYOB,
        target: '_blank',
        url: urls.moveToMYOB,
      }),
    urls.productManagementDetail &&
      getMenuLink({
        icon: <EditIcon />,
        label: 'Manage my product',
        onClick: onManageMyProductClick,
        url: urls.productManagementDetail,
      }),
    shouldShowPaymentDetail &&
      getMenuLink({
        icon: <WalletIcon />,
        label: shouldDisplayAccountBillingMenuText
          ? 'My account and billing'
          : 'Billing and Payments',
        target: '_blank',
        url: urls.paymentDetail,
      }),
    isCurrentUserAdvisor
      ? getMenuLink({
          icon: <SwitchIcon />,
          label: 'Manage my clients',
          target: '_blank',
          url: urls.manageMyClients,
        })
      : getMenuLink({
          icon: <SwitchIcon />,
          label: 'Switch business',
          url: '#/businesses',
        }),
    urls.createNewBusiness &&
      getMenuLink({
        icon: <AddIcon />,
        label: 'Create new business',
        onClick: onCreateBusinessClick,
        url: urls.createNewBusiness,
      }),
    urls.appMarketplace &&
      getMenuLink({
        icon: <PurchasesIcon />,
        label: 'App marketplace',
        target: '_blank',
        url: urls.appMarketplace,
      }),
    isSeparatorRequired(urls) && <Navigation.Separator key="separator" />,
    getMenuLink({
      label: 'Log out',
      icon: <SignOutIcon />,
      onClick: onLogoutLinkClick,
    }),
    userEmail && (
      <li className={classNames(styles.userDetails, styles.userEmail)}>
        {userEmail}
      </li>
    ),
    serialNumber && (
      <li className={classNames(styles.userDetails, styles.serialNumber)}>
        {`Serial no. ${serialNumber}`}
      </li>
    ),
  ].filter(Boolean);

const ReadonlyStatus = () => (
  <span className={styles.readonly}>
    <Tooltip
      placement="bottom"
      triggerContent={
        <Label type="boxed" size="small">
          Read only
        </Label>
      }
    >
      You have read only permission. Contact your administrator if you think
      this is a mistake.
    </Tooltip>
  </span>
);

const BusinessMenu = ({
  activeNav,
  businessName,
  isCurrentUserAdvisor,
  isReadOnly,
  onAppMarketplaceClick,
  onCreateBusinessClick,
  onManageMyProductClick,
  onMoveToMYOB,
  onLogoutLinkClick,
  onMenuSelect,
  serialNumber,
  shouldShowMoveToMYOB,
  shouldShowPaymentDetail,
  urls,
  userEmail,
  shouldDisplayAccountBillingMenuText,
}) => (
  <div className={styles.businessMenu}>
    <Navigation.Menu
      label={
        <div className={styles.avatar}>
          <BusinessAvatar businessName={businessName} />
          <span className={styles.mobileHide}>
            {businessName}
            {isReadOnly && <ReadonlyStatus />}
            <div className={styles.caret}>
              <CaretIcon />
            </div>
          </span>
        </div>
      }
      items={getItems({
        isCurrentUserAdvisor,
        onAppMarketplaceClick,
        onCreateBusinessClick,
        onManageMyProductClick,
        onMoveToMYOB,
        onLogoutLinkClick,
        serialNumber,
        shouldShowMoveToMYOB,
        shouldShowPaymentDetail,
        urls,
        userEmail,
        shouldDisplayAccountBillingMenuText,
      })}
      onSelect={onMenuSelect}
      active={activeNav === 'business'}
    />
  </div>
);

const mapStateToProps = (state) => ({
  activeNav: getActiveNav(state),
  isCurrentUserAdvisor: getIsCurrentUserAdvisor(state),
  isReadOnly: getIsReadOnly(state),
  serialNumber: getSerialNumber(state),
  shouldShowMoveToMYOB: getShouldShowMoveToMYOB(state),
  shouldShowPaymentDetail: getShouldShowPaymentDetail(state),
  urls: getBusinessUrls(state),
  userEmail: getUserEmail(state),
  shouldDisplayAccountBillingMenuText: getShouldDisplayAccountBillingMenuText(
    state
  ),
});

export default connect(mapStateToProps)(BusinessMenu);
