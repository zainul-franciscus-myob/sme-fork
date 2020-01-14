import { createSelector } from 'reselect';

import { activeMapping } from './navConfig';
import getRegionToDialectText from '../dialect/getRegionToDialectText';

export const getBusinessName = state => state.businessName;
export const getSerialNumber = state => state.serialNumber;
export const getUserEmail = state => state.userEmail;
const getEnabledFeatures = state => state.enabledFeatures;
export const getIsReadOnly = state => state.isReadOnly;
const getCurrentRouteName = state => state.currentRouteName;
const getUrls = state => state.urls;

export const getBusinessId = ({ routeParams: { businessId = '' } }) => businessId;
export const hasBusinessId = createSelector(
  getBusinessId,
  businessId => businessId !== '',
);

export const isLinkUserPage = ({ currentRouteName }) => {
  const currentBaseRoute = currentRouteName.split('/');
  return currentBaseRoute && currentBaseRoute[0] === 'linkUser';
};

export const getActiveNav = createSelector(
  getCurrentRouteName,
  currentRouteName => activeMapping[currentRouteName] || '',
);

const getEnabledUrls = createSelector(
  getUrls,
  getEnabledFeatures,
  (urls, enabledFeatures) => enabledFeatures.reduce(
    (acc, key) => ({ ...acc, [key]: urls[key] }),
    {},
  ),
);

export const noOpRouteNames = [
  'linkUser/linkUser',
  'businessList/businessList',
];

export const getMenuLogoUrl = createSelector(
  getCurrentRouteName,
  getBusinessId,
  (currentRouteName, businessId) => (currentUrl) => {
    const shouldNavigate = noOpRouteNames.every(
      routeName => routeName !== currentRouteName,
    );

    return shouldNavigate ? `#/au/${businessId}/dashboard` : currentUrl;
  },
);

export const getSalesUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    quoteList: enabledUrls.quoteList,
    quoteCreate: enabledUrls.quoteCreate,
    invoiceList: enabledUrls.invoiceList,
    invoiceCreate: enabledUrls.invoiceCreate,
    invoicePaymentCreate: enabledUrls.invoicePaymentCreate,
    customerReturnList: enabledUrls.customerReturnList,
    itemList: enabledUrls.itemList,
    customerStatementList: enabledUrls.customerStatementList,
  }),
);
export const hasSalesUrls = createSelector(
  getSalesUrls,
  urls => Object.values(urls).some(Boolean),
);

export const getPayrollUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    employeeList: enabledUrls.employeeList,
    employeeCreate: enabledUrls.employeeCreate,
    payRunList: enabledUrls.payRunList,
    payRunCreate: enabledUrls.payRunCreate,
    payItemList: enabledUrls.payItemList,
    electronicPaymentCreate: enabledUrls.electronicPaymentPayrollCreate,
    superPaymentList: enabledUrls.superPaymentList,
    stpReporting: enabledUrls.stpReporting,
  }),
);
export const hasPayrollUrls = createSelector(
  getPayrollUrls,
  urls => Object.values(urls).some(Boolean),
);

export const getBankingUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    bankTransactionList: enabledUrls.bankTransactionList,
    bankReconciliation: enabledUrls.bankReconciliation,
    bankingRuleList: enabledUrls.bankingRuleList,
    bankFeeds: enabledUrls.bankFeeds,
    electronicPaymentCreate: enabledUrls.electronicPaymentBankCreate,
    spendMoneyCreate: enabledUrls.spendMoneyCreate,
    receiveMoneyCreate: enabledUrls.receiveMoneyCreate,
    transferMoneyCreate: enabledUrls.transferMoneyCreate,
    transactionList: enabledUrls.transactionList,
  }),
);
export const hasBankingUrls = createSelector(
  getBankingUrls,
  urls => Object.values(urls).some(Boolean),
);

export const getContactUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    contactList: enabledUrls.contactList,
    contactCreate: enabledUrls.contactCreate,
  }),
);
export const hasContactUrls = createSelector(
  getContactUrls,
  urls => Object.values(urls).some(Boolean),
);

export const getAccountingUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    generalJournalList: enabledUrls.generalJournalList,
    generalJournalCreate: enabledUrls.generalJournalCreate,
    accountList: enabledUrls.accountList,
    linkedAccounts: enabledUrls.linkedAccounts,
    taxList: enabledUrls.taxList,
    prepareBasOrIas: enabledUrls.prepareBasOrIas,
  }),
);

export const hasAccountingUrls = createSelector(
  getAccountingUrls,
  urls => Object.values(urls).some(Boolean),
);

export const getBusinessUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    businessDetails: enabledUrls.businessDetails,
    incomeAllocation: enabledUrls.incomeAllocation,
    salesSettings: enabledUrls.salesSettings,
    payrollSettings: enabledUrls.payrollSettings,
    userList: enabledUrls.userList,
    dataImportExport: enabledUrls.dataImportExport,
    paymentDetail: enabledUrls.paymentDetail,
    subscription: enabledUrls.subscription,
  }),
);

export const getPurchasesUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    billList: enabledUrls.billList,
    billCreate: enabledUrls.billCreate,
    billPaymentCreate: enabledUrls.billPaymentCreate,
    supplierReturnList: enabledUrls.supplierReturnList,
    itemList: enabledUrls.itemList,
  }),
);
export const hasPurchasesUrls = createSelector(
  getPurchasesUrls,
  urls => Object.values(urls).some(Boolean),
);

export const getAddUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    quoteCreate: enabledUrls.quoteCreate,
    invoiceCreate: enabledUrls.invoiceCreate,
    billCreate: enabledUrls.billCreate,
    payRunCreate: enabledUrls.payRunCreate,
    spendMoneyCreate: enabledUrls.spendMoneyCreate,
    receiveMoneyCreate: enabledUrls.receiveMoneyCreate,
    transferMoneyCreate: enabledUrls.transferMoneyCreate,
    employeeCreate: enabledUrls.employeeCreate,
    contactCreate: enabledUrls.contactCreate,
  }),
);
export const hasAddUrls = createSelector(
  getAddUrls,
  urls => Object.values(urls).some(Boolean),
);

export const getRegion = state => state.routeParams.region;
export const getTaxCodesLabel = createSelector(
  getRegion,
  region => getRegionToDialectText(region)('Tax codes'),
);

export const getPrepareBasOrIasLabel = createSelector(
  getRegion,
  region => getRegionToDialectText(region)('Prepare BAS or IAS'),
);

export const getInTrayUrl = state => getEnabledUrls(state).inTrayList;
export const getIsInTrayActive = state => getActiveNav(state) === 'inTray';
export const hasInTrayUrl = state => Boolean(getInTrayUrl(state));

export const getHomeUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `#/${region}/${businessId}/dashboard`,
);
export const getIsHomeActive = state => getActiveNav(state) === 'home';

export const getReportsUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    reportsStandard: enabledUrls.reportsStandard,
    reportsFavourite: enabledUrls.reportsFavourite,
    reportsCustom: enabledUrls.reportsCustom,
    reportsException: enabledUrls.reportsException,
    reportsPackBuilder: enabledUrls.reportsPackBuilder,
    reportsPdfStyleTemplates: enabledUrls.reportsPdfStyleTemplates,
  }),
);
export const hasReportsUrls = createSelector(
  getReportsUrls,
  urls => Object.values(urls).some(Boolean),
);

export const getBusinessAbbreviation = createSelector(
  getBusinessName,
  (businessName = '') => businessName
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(/\s+/, 2)
    .reduce((a, b) => {
      const formattedB = b.toUpperCase();

      if (formattedB === 'PTY' || formattedB === 'LTD') return a;

      return formattedB.length ? a + [...formattedB][0] : a;
    }, ''),
);

export const getShowBusinessAvatar = createSelector(
  getBusinessAbbreviation,
  abbr => abbr.length > 0,
);
