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

const filterUndefinedFromObject = object => Object.keys(object)
  .filter(key => object[key])
  .reduce((acc, key) => ({ ...acc, [key]: object[key] }), {});

export const getBankingUrls = createSelector(
  getEnabledUrls,
  enabledUrls => filterUndefinedFromObject({
    spendMoney: enabledUrls.spendMoney,
    receiveMoney: enabledUrls.receiveMoney,
    transferMoney: enabledUrls.transferMoney,
    transactionList: enabledUrls.transactionList,
  }),
);

export const getContactUrls = createSelector(
  getEnabledUrls,
  enabledUrls => filterUndefinedFromObject({
    createContact: enabledUrls.createContact,
    contactList: enabledUrls.contactList,
  }),
);

export const getJournalUrls = createSelector(
  getEnabledUrls,
  enabledUrls => filterUndefinedFromObject({
    generalJournal: enabledUrls.generalJournal,
    generalJournalList: enabledUrls.generalJournalList,
  }),
);
