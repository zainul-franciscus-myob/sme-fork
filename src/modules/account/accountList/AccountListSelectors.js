import { createSelector } from 'reselect';

import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

export const getBusinessId = state => state.businessId;

const getRegion = state => state.region;

export const getAlert = state => state.alert;

export const getIsLoading = state => state.isLoading;

export const getIsTableLoading = state => state.isTableLoading;

export const getFilterOptions = state => state.filterOptions;

export const getAppliedFilterOptions = state => state.appliedFilterOptions;

export const getAppliedFilterOptionsShowInactive = state => state.appliedFilterOptions.showInactive;

export const getAppliedFilterOptionsType = state => state.appliedFilterOptions.type;

const getEntries = state => state.entries;

export const getTableTaxCodeHeader = state => getRegionToDialectText(state.region)('Tax code');

export const getIsTableEmpty = state => state.entries.length === 0;

const getAccountLink = (account, businessId, region) => {
  const { id } = account;
  return `/#/${region}/${businessId}/account/${id}`;
};

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => entries.map((entry) => {
    const { level } = entry;

    return {
      ...entry,
      displayLevel: `Level ${level}`,
      indentLevel: level > 1 ? level - 1 : undefined,
      link: getAccountLink(entry, businessId, region),
    };
  }),
);

export const getLinkedAccountUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/linkedAccounts`;
};

export const getNewAccountUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/account/new`;
};

export const getImportChartOfAccountsUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/dataImportExport?importType=chartOfAccounts&exportType=chartOfAccounts`;
};