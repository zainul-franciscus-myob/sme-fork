import { createSelector } from 'reselect';

import { activeMapping } from './navConfig';
import Config from '../Config';
import Region from '../common/types/Region';
import RouteName from '../router/RouteName';
import getRegionToDialectText from '../dialect/getRegionToDialectText';

export const getIsLoading = (state) => state.isLoading;
export const getSerialNumber = (state) => state.serialNumber;
export const getUserEmail = (state) => state.userEmail;
const getEnabledFeatures = (state) => state.enabledFeatures;
export const getIsReadOnly = (state) => state.isReadOnly;
const getCurrentRouteName = (state) => state.currentRouteName;
export const getIsCurrentUserAdvisor = (state) => state.isCurrentUserAdvisor;
export const getShouldDisplayAccountBillingMenuText = (state) =>
  state.shouldDisplayAccountBillingMenuText;

const getUrls = (state) => state.urls;
export const getTrialEndDate = (state) => state.trialEndDate;
const getIsTrial = (state) => state.isTrial;

export const getBusinessId = ({ routeParams: { businessId = '' } }) =>
  businessId;
export const getRegion = (state) => state.routeParams.region;
export const hasBusinessId = createSelector(
  getBusinessId,
  (businessId) => businessId !== ''
);

const getSelfServicePortalUrl = (state) => state.selfServicePortalUrl;
export const getPaymentDetailUrl = createSelector(
  getSelfServicePortalUrl,
  getBusinessId,
  getShouldDisplayAccountBillingMenuText,
  (selfServicePortalUrl, businessId, shouldDisplayAccountBillingMenuText) =>
    shouldDisplayAccountBillingMenuText
      ? `${selfServicePortalUrl}/accountDetails?businessId=${businessId}`
      : `${selfServicePortalUrl}/#/billingAndPayments?businessId=${businessId}`
);

const getMyobUrl = (state) => state.myobUrl;
export const getProductManagementUrl = createSelector(
  getMyobUrl,
  getBusinessId,
  (myobUrl, businessId) =>
    `${myobUrl}/manage-my-product?businessId=${businessId}`
);

export const getAppMarketplaceUrl = createSelector(
  getMyobUrl,
  getRegion,
  (myobUrl, region) =>
    `${myobUrl}/${region}/apps/category/products?category=essentials`
);

export const getReportsUrl = createSelector(
  (state) => state.myReportsUrl,
  getRegion,
  getBusinessId,
  (myReportsUrl, region, businessId) =>
    `${myReportsUrl}/#/${region}/${businessId}`
);

export const getMyobTeamUrl = (state) => state.myobTeamUrl;

export const getActiveNav = createSelector(
  getCurrentRouteName,
  (currentRouteName) => activeMapping[currentRouteName] || ''
);

const isLinkUserPage = (currentRouteName) =>
  currentRouteName === RouteName.LINK_USER;
const isBusinessListPage = (currentRouteName) =>
  currentRouteName === RouteName.BUSINESS_LIST;

export const getShowUrls = createSelector(
  getCurrentRouteName,
  (currentRouteName) =>
    !isBusinessListPage(currentRouteName) && !isLinkUserPage(currentRouteName)
);

export const getShouldDisplayBusinessMenu = createSelector(
  getIsLoading,
  getShowUrls,
  (isLoading, showUrls) => !isLoading && showUrls
);

const getEnabledUrls = createSelector(
  getUrls,
  getEnabledFeatures,
  getShowUrls,
  (urls, enabledFeatures, showUrls) =>
    showUrls
      ? enabledFeatures.reduce((acc, key) => ({ ...acc, [key]: urls[key] }), {})
      : {}
);

export const noOpRouteNames = [
  'linkUser/linkUser',
  'businessList/businessList',
];

export const getMenuLogoUrl = createSelector(
  getCurrentRouteName,
  getBusinessId,
  getRegion,
  (currentRouteName, businessId, region) => (currentUrl) => {
    const shouldNavigate = noOpRouteNames.every(
      (routeName) => routeName !== currentRouteName
    );

    return shouldNavigate ? `#/${region}/${businessId}/dashboard` : currentUrl;
  }
);

const getIsRecurringTransactionEnabled = (state) =>
  state.isRecurringTransactionEnabled;
export const getSalesUrls = createSelector(
  getEnabledUrls,
  getIsRecurringTransactionEnabled,
  (enabledUrls, isRecurringTransactionEnabled) => ({
    quoteList: enabledUrls.quoteList,
    quoteCreate: enabledUrls.quoteCreate,
    invoiceList: enabledUrls.invoiceList,
    invoiceCreate: enabledUrls.invoiceCreate,
    invoicePaymentCreate: enabledUrls.invoicePaymentCreate,
    recurringTransactionSalesList: isRecurringTransactionEnabled
      ? enabledUrls.recurringTransactionSalesList
      : undefined,
    customerReturnList: enabledUrls.customerReturnList,
    itemList: enabledUrls.itemList,
    customerStatementList: enabledUrls.customerStatementList,
  })
);
export const getShouldDisplaySalesMenu = createSelector(
  getIsLoading,
  getSalesUrls,
  (isLoading, urls) => !isLoading && Object.values(urls).some(Boolean)
);

export const getPayrollUrls = createSelector(getEnabledUrls, (enabledUrls) => ({
  employeeList: enabledUrls.employeeList,
  employeeCreate: enabledUrls.employeeCreate,
  payRunList: enabledUrls.payRunList,
  payRunCreate: enabledUrls.payRunCreate,
  payItemList: enabledUrls.payItemList,
  timesheets: enabledUrls.timesheets,
  electronicPaymentCreate: enabledUrls.electronicPaymentPayrollCreate,
  myobTeamLink: enabledUrls.myobTeamLink,
  superPaymentList: enabledUrls.superPaymentList,
  stpReporting: enabledUrls.stpReporting,
}));

const getIsNzPayRunsViewEnabled = (state) => state.isNzPayRunsViewEnabled;
const getIsPaydayFilingEnabled = (state) => state.isPaydayFilingEnabled;
export const getPayrollNzUrls = createSelector(
  getEnabledUrls,
  getIsNzPayRunsViewEnabled,
  getIsPaydayFilingEnabled,
  (enabledUrls, isNzPayRunsViewEnabled, isPaydayFilingEnabled) => ({
    employeeListNz: enabledUrls.employeeListNz,
    employeeCreateNz: enabledUrls.employeeCreateNz,
    payRunCreateNz: enabledUrls.payRunCreateNz,
    payRunListNz: isNzPayRunsViewEnabled ? enabledUrls.payRunListNz : undefined,
    paydayFiling: isPaydayFilingEnabled ? enabledUrls.paydayFiling : undefined,
  })
);

export const getShouldDisplayPayrollMenu = createSelector(
  getIsLoading,
  getPayrollUrls,
  getRegion,
  (isLoading, urls, region) =>
    !isLoading && region === Region.au && Object.values(urls).some(Boolean)
);

export const getShouldDisplayPayrollNzMenu = createSelector(
  getIsLoading,
  getPayrollNzUrls,
  getRegion,
  (isLoading, urls, region) =>
    !isLoading && region === Region.nz && Object.values(urls).some(Boolean)
);

export const getBankingUrls = createSelector(
  getEnabledUrls,
  getIsRecurringTransactionEnabled,
  (enabledUrls, isRecurringTransactionEnabled) => ({
    bankTransactionList: enabledUrls.bankTransactionList,
    bankReconciliation: enabledUrls.bankReconciliation,
    bankingRuleList: enabledUrls.bankingRuleList,
    bankFeeds: enabledUrls.bankFeeds,
    electronicPaymentCreate: enabledUrls.electronicPaymentBankCreate,
    spendMoneyCreate: enabledUrls.spendMoneyCreate,
    receiveMoneyCreate: enabledUrls.receiveMoneyCreate,
    transferMoneyCreate: enabledUrls.transferMoneyCreate,
    recurringTransactionBankingList: isRecurringTransactionEnabled
      ? enabledUrls.recurringTransactionBankingList
      : undefined,
    transactionList: enabledUrls.transactionList,
  })
);
export const getShouldDisplayBankingMenu = createSelector(
  getIsLoading,
  getBankingUrls,
  (isLoading, urls) => !isLoading && Object.values(urls).some(Boolean)
);

export const getContactUrls = createSelector(getEnabledUrls, (enabledUrls) => ({
  contactList: enabledUrls.contactList,
  contactCreate: enabledUrls.contactCreate,
}));
export const getShouldDisplayContactMenu = createSelector(
  getIsLoading,
  getContactUrls,
  (isLoading, urls) => !isLoading && Object.values(urls).some(Boolean)
);

export const getAccountingUrls = createSelector(
  getEnabledUrls,
  (enabledUrls) => ({
    generalJournalList: enabledUrls.generalJournalList,
    generalJournalCreate: enabledUrls.generalJournalCreate,
    accountList: enabledUrls.accountList,
    linkedAccounts: enabledUrls.linkedAccounts,
    taxList: enabledUrls.taxList,
    onlineTax: enabledUrls.onlineTax,
    jobList: enabledUrls.jobList,
  })
);

const getIsNzPayrollAccountingEnabled = (state) =>
  state.isNzPayrollAccountingEnabled;

export const getShouldDisplayAccountingMenu = createSelector(
  getIsLoading,
  getAccountingUrls,
  getShouldDisplayPayrollNzMenu,
  getIsNzPayrollAccountingEnabled,
  (isLoading, urls, isNzPayrollUser, isNzPayrollAccountingEnabled) => {
    return (
      !isLoading &&
      Object.values(urls).some(Boolean) &&
      (isNzPayrollUser ? isNzPayrollAccountingEnabled : true)
    );
  }
);

export const getCreateNewBusinessUrl = createSelector(getRegion, (region) =>
  region === Region.nz
    ? Config.CREATE_BUSINESS_URL_NZ
    : Config.CREATE_BUSINESS_URL_AU
);

export const getBusinessUrls = createSelector(
  getEnabledUrls,
  (enabledUrls) => ({
    businessDetails: enabledUrls.businessDetails,
    incomeAllocation: enabledUrls.incomeAllocation,
    salesSettings: enabledUrls.salesSettings,
    payrollSettings: enabledUrls.payrollSettings,
    purchaseSettings: enabledUrls.purchaseSettings,
    reportSettings: enabledUrls.reportSettings,
    userList: enabledUrls.userList,
    dataImportExport: enabledUrls.dataImportExport,
    paymentDetail: enabledUrls.paymentDetail,
    productManagementDetail: enabledUrls.productManagementDetail,
    subscription: enabledUrls.subscription,
    appMarketplace: enabledUrls.appMarketplace,
    moveToMYOB: enabledUrls.moveToMYOB,
    manageMyClients: Config.MANAGE_MY_CLIENTS_URL,
    createNewBusiness: getCreateNewBusinessUrl,
  })
);

const getIsPurchaseOrderEnabled = (state) => state.isPurchaseOrderEnabled;

export const getPurchasesUrls = createSelector(
  getEnabledUrls,
  getIsPurchaseOrderEnabled,
  getIsRecurringTransactionEnabled,
  (enabledUrls, isPurchaseOrderEnabled, isRecurringTransactionEnabled) => {
    return {
      purchaseOrderList: isPurchaseOrderEnabled
        ? enabledUrls.purchaseOrderList
        : undefined,
      purchaseOrderCreate: isPurchaseOrderEnabled
        ? enabledUrls.purchaseOrderCreate
        : undefined,
      billList: enabledUrls.billList,
      billCreate: enabledUrls.billCreate,
      billPaymentCreate: enabledUrls.billPaymentCreate,
      supplierPaymentCreate: enabledUrls.supplierPaymentCreate,
      remittanceAdvice: enabledUrls.remittanceAdvice,
      recurringTransactionPurchaseList: isRecurringTransactionEnabled
        ? enabledUrls.recurringTransactionPurchaseList
        : undefined,
      supplierReturnList: enabledUrls.supplierReturnList,
      itemList: enabledUrls.itemList,
    };
  }
);
export const getShouldDisplayPurchasesMenu = createSelector(
  getIsLoading,
  getPurchasesUrls,
  (isLoading, urls) => !isLoading && Object.values(urls).some(Boolean)
);

export const getAddUrls = createSelector(getEnabledUrls, (enabledUrls) => ({
  quoteCreate: enabledUrls.quoteCreate,
  invoiceCreate: enabledUrls.invoiceCreate,
  purchaseOrderCreate: enabledUrls.purchaseOrderCreate,
  billCreate: enabledUrls.billCreate,
  payRunCreate: enabledUrls.payRunCreate,
  spendMoneyCreate: enabledUrls.spendMoneyCreate,
  receiveMoneyCreate: enabledUrls.receiveMoneyCreate,
  transferMoneyCreate: enabledUrls.transferMoneyCreate,
  employeeCreate: enabledUrls.employeeCreate,
  contactCreate: enabledUrls.contactCreate,
}));
export const getShouldDisplayAddMenu = createSelector(
  getIsLoading,
  getAddUrls,
  (isLoading, urls) => !isLoading && Object.values(urls).some(Boolean)
);

export const getTaxCodesLabel = createSelector(getRegion, (region) =>
  getRegionToDialectText(region)('Tax codes')
);

export const getOnlineTaxLabel = createSelector(getRegion, (region) =>
  getRegionToDialectText(region)('Prepare BAS or IAS')
);

export const getInTrayUrl = (state) => getEnabledUrls(state).inTrayList;
export const getIsInTrayActive = (state) => getActiveNav(state) === 'inTray';
export const getShouldDisplayInTray = createSelector(
  getIsLoading,
  getInTrayUrl,
  (isLoading, url) => !isLoading && Boolean(url)
);

export const getHomeUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `#/${region}/${businessId}/dashboard`
);
export const getIsHomeActive = (state) => getActiveNav(state) === 'home';

export const getReportsUrls = createSelector(getEnabledUrls, (enabledUrls) => ({
  reportsStandard: enabledUrls.reportsStandard,
  reportsFavourite: enabledUrls.reportsFavourite,
  reportsCustom: enabledUrls.reportsCustom,
  reportsException: enabledUrls.reportsException,
  reportsPackBuilder: enabledUrls.reportsPackBuilder,
  reportsPdfStyleTemplates: enabledUrls.reportsPdfStyleTemplates,
}));

export const getShouldDisplayReportsMenu = createSelector(
  getIsLoading,
  getReportsUrls,
  (isLoading, urlsReport) =>
    !isLoading && Object.values(urlsReport).some(Boolean)
);

export const getShouldDisplaySubscriptionNow = (state) =>
  hasBusinessId(state) && Boolean(getTrialEndDate(state));

export const getShouldDisplayLiveChat = createSelector(
  hasBusinessId,
  getIsTrial,
  getIsCurrentUserAdvisor,
  getBusinessId,
  (businessIdExists, trialist, isAdvisor) => (businessRole) =>
    businessIdExists &&
    businessRole !== 'Student' &&
    !isAdvisor &&
    trialist &&
    Config.GENESYS_CHAT
);

export const getIsNzPayrollOnly = createSelector(
  getShouldDisplayPayrollNzMenu,
  getShouldDisplayPurchasesMenu,
  getShouldDisplaySalesMenu,
  getShouldDisplayBankingMenu,
  (hasNzPayroll, hasPurchase, hasSales, hasBanking) =>
    hasNzPayroll && !hasPurchase && !hasSales && !hasBanking
);

const getIsMoveToMyobEnabled = (state) => state.isMoveToMyobEnabled;

export const getShouldShowMoveToMYOB = createSelector(
  getBusinessUrls,
  getIsTrial,
  getIsMoveToMyobEnabled,
  (businessUrls, isTrial, isMoveToMyobEnabled) =>
    Boolean(businessUrls.moveToMYOB) && isTrial && isMoveToMyobEnabled
);

export const getMoveToMYOBUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `#/${region}/${businessId}/moveToMYOB`
);
