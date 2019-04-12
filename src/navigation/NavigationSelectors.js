import { createSelector } from 'reselect';

import {
  activeMapping,
} from './navConfig';
import getRegionToDialectText from '../dialect/getRegionToDialectText';

export const getBusinessName = state => state.businessName;
const getEnabledFeatures = state => state.enabledFeatures;
const getCurrentRouteName = state => state.currentRouteName;
const getUrls = state => state.urls;

export const getBusinessId = ({ routeParams: { businessId = '' } }) => businessId;
export const hasBusinessId = createSelector(
  getBusinessId,
  businessId => businessId !== '',
);

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

export const getSalesUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    quoteList: enabledUrls.quoteList,
    invoiceList: enabledUrls.invoiceList,
    inventory: enabledUrls.inventory,
  }),
);
export const hasSalesUrls = createSelector(
  getSalesUrls,
  urls => Object.values(urls).some(Boolean),
);

export const getBankingUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    bankTransactionList: enabledUrls.bankTransactionList,
    spendMoney: enabledUrls.spendMoney,
    receiveMoney: enabledUrls.receiveMoney,
    transferMoney: enabledUrls.transferMoney,
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
    createContact: enabledUrls.createContact,
    contactList: enabledUrls.contactList,
  }),
);
export const hasContactUrls = createSelector(
  getContactUrls,
  urls => Object.values(urls).some(Boolean),
);

export const getJournalUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    generalJournal: enabledUrls.generalJournal,
    generalJournalList: enabledUrls.generalJournalList,
  }),
);
export const hasJournalUrls = createSelector(
  getJournalUrls,
  urls => Object.values(urls).some(Boolean),
);

export const getBusinessUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    incomeAllocation: enabledUrls.incomeAllocation,
    businessDetails: enabledUrls.businessDetails,
    taxList: enabledUrls.taxList,
    userList: enabledUrls.userList,
  }),
);

export const getRegion = state => state.routeParams.region;
export const getTaxCodesLabel = createSelector(
  getRegion,
  region => getRegionToDialectText(region)('Tax codes'),
);
