import { createSelector } from 'reselect';

import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

export const getBusinessId = (state) => state.businessId;

const getRegion = (state) => state.region;

export const getAlert = (state) => state.alert;

export const getLoadingState = (state) => state.loadingState;

export const getIsTableLoading = (state) => state.isTableLoading;

export const getFilterOptions = (state) => state.filterOptions;

export const getShowInactive = (state) => state.filterOptions.showInactive;

export const getType = (state) => state.filterOptions.type;

export const getRawEntries = (state) => state.entries;

export const getTableTaxCodeHeader = (state) =>
  getRegionToDialectText(state.region)('Tax code');

export const getIsTableEmpty = (state) => state.entries.length === 0;

export const getEditingMode = (state) => state.editingMode;

export const getRedirectUrl = (state) => state.redirectUrl;

export const getOpeningBalanceDate = (state) => state.openingBalanceDate;

export const getRemainingHistoricalBalance = (state) =>
  state.remainingHistoricalBalance;

const getHasFlexibleAccountNumbers = (state) => state.hasFlexibleAccountNumbers;

const getAccountLink = (account, businessId, region) => {
  const { id } = account;
  return `/#/${region}/${businessId}/account/${id}`;
};

const getSelectedAccountIds = (state) =>
  state.entries.filter((acc) => acc.selected).map((acc) => acc.id);

export const getAccountsForBulkDelete = createSelector(
  getSelectedAccountIds,
  (accountIds) => ({ accountIds })
);

export const getDirtyEntries = (state) =>
  state.entries.filter((entry) => entry.dirty);

export const getModalType = (state) => state.modalType;

export const getAccountsForBulkUpdate = (state) => ({
  accounts: state.entries
    .filter((entry) => entry.dirty)
    .map(({ id, openingBalance }) => ({
      id,
      openingBalance,
    })),
});

export const getTableEntries = createSelector(
  getRawEntries,
  getBusinessId,
  getRegion,
  getHasFlexibleAccountNumbers,
  (entries, businessId, region, hasFlexibleAccountNumbers) =>
    entries.map((entry) => {
      const { level, isSystem } = entry;

      const indentLevel = level > 1 ? level - 1 : undefined;
      const hideAccountNumber =
        indentLevel === undefined && isSystem && hasFlexibleAccountNumbers;

      return {
        ...entry,
        indentLevel,
        displayLevel: `Level ${level}`,
        link: getAccountLink(entry, businessId, region),
        hideAccountNumber,
      };
    })
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

export const getIgnoredLinkedAccounts = (state) => state.ignoredLinkedAccounts;

export const getAccountsForCalcHistoricalBalance = (state) => {
  const entries = getRawEntries(state);
  const ignoredLinkedAccounts = getIgnoredLinkedAccounts(state);
  const equityAccountCurrentEarningsAccount =
    ignoredLinkedAccounts.equityAccountCurrentEarnings;
  const equityHistoricalBalancingAccount =
    ignoredLinkedAccounts.equityHistoricalBalancing;

  if (
    equityHistoricalBalancingAccount.accountId === '' ||
    equityAccountCurrentEarningsAccount.accountId === ''
  )
    return [];

  return entries.filter(
    (entry) =>
      !entry.isHeader &&
      entry.id !== equityHistoricalBalancingAccount.accountId &&
      entry.id !== equityAccountCurrentEarningsAccount.accountId
  );
};
