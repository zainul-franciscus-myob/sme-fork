import { createSelector } from 'reselect';

import {
  activeMapping,
} from './navConfig';

export const getBusinessName = state => state.businessName;
const getEnabledFeatures = state => state.enabledFeatures;
const getCurrentRouteName = state => state.currentRouteName;
const getUrls = state => state.urls;

export const getBusinessId = ({ routeParams: { businessId = '' } }) => businessId;

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

export const getBankingUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    spendMoney: enabledUrls.spendMoney,
    receiveMoney: enabledUrls.receiveMoney,
    transferMoney: enabledUrls.transferMoney,
    transactionList: enabledUrls.transactionList,
  }),
);

export const getContactUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    createContact: enabledUrls.createContact,
    contactList: enabledUrls.contactList,
  }),
);

export const getJournalUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    generalJournal: enabledUrls.generalJournal,
    generalJournalList: enabledUrls.generalJournalList,
  }),
);

export const getBusinessUrls = createSelector(
  getEnabledUrls,
  enabledUrls => ({
    incomeAllocation: enabledUrls.incomeAllocation,
    businessDetails: enabledUrls.businessDetails,
  }),
);
