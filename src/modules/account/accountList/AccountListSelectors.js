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

export const getHasFlexibleAccountNumbers = (state) =>
  state.hasFlexibleAccountNumbers;

export const getAccountClassifications = (state) =>
  state.accountClassifications;

export const getAccountTypeName = (accountClassifications, accountType) =>
  accountClassifications[accountType].displayName;

export const getAccountSubTypes = (accountClassifications, accountType) =>
  accountClassifications[accountType].type;

export const getTaxCodeList = (state) => state.taxCodeList;

const getAccountLink = (account, businessId, region) => {
  const { id } = account;
  return `/#/${region}/${businessId}/account/${id}`;
};

const getSelectedAccountIds = (state) =>
  state.entries.filter((acc) => acc.selected).map((acc) => acc.id);

export const getAccountNumberCounts = (accounts) => {
  return accounts.reduce((acc, entry) => {
    if (!acc[entry.accountNumber]) acc[entry.accountNumber] = 0;
    acc[entry.accountNumber] += 1;
    return acc;
  }, {});
};

export const getAccountsForBulkDelete = createSelector(
  getSelectedAccountIds,
  (accountIds) => ({ accountIds })
);

export const getDirtyEntries = (state) =>
  state.entries.filter((entry) => entry.dirty);

export const getModalType = (state) => state.modalType;

export const getHoveredRowIndex = (state) => state.hoveredRowIndex;

export const getAccountsForBulkUpdate = (state) =>
  state.entries
    .filter((entry) => entry.dirty)
    .map(
      ({
        id,
        accountName,
        accountNumber,
        subAccountType,
        taxCodeId,
        openingBalance,
      }) => ({
        id,
        accountName,
        accountNumber,
        subAccountType,
        taxCodeId,
        openingBalance,
      })
    );

export const getAccountsForBulkUpdateTaxCodes = (state) =>
  state.entries
    .filter((entry) => entry.selected && !entry.isHeader)
    .map(
      ({
        id,
        accountName,
        accountNumber,
        subAccountType,
        taxCodeId,
        openingBalance,
      }) => ({
        id,
        accountName,
        accountNumber,
        subAccountType,
        taxCodeId,
        openingBalance,
      })
    );

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

export const getSelectedAccounts = (state) => {
  return state.entries.filter((acc) => acc.selected) || [];
};

export const getSelectedAccountsWithAllChildren = (state) => {
  const results = [];
  let startIndex = 0;

  // Look for a selected entry
  while (startIndex < state.entries.length) {
    const startEntry = state.entries[startIndex];

    // Found a selected entry now find all children
    if (startEntry.selected) {
      results.push(startEntry);
      let i = startIndex + 1;
      for (; i < state.entries.length; i += 1) {
        const entry = state.entries[i];
        const isChild = entry.level > startEntry.level;

        if (isChild) results.push(entry);
        else break;
      }
      startIndex = i;
    }
    // Found all children
    // continue searching for selected entrires
    else startIndex += 1;
  }
  return results;
};

export const getSelectedSingleAccount = createSelector(
  getSelectedAccounts,
  (selectedAccounts) => {
    return selectedAccounts[0];
  }
);

export const getAccountAllowedToMoveUp = createSelector(
  getSelectedAccounts,
  (selectedAccounts) => {
    return (
      selectedAccounts.length === 1 && selectedAccounts[0].isAllowedToMoveUp
    );
  }
);

export const getAccountAllowedToMoveDown = createSelector(
  getSelectedAccounts,
  (selectedAccounts) => {
    return (
      selectedAccounts.length === 1 && selectedAccounts[0].isAllowedToMoveDown
    );
  }
);

export const getCannotMoveAccountUpMessage = createSelector(
  getSelectedAccounts,
  (selectedAccounts) => {
    if (selectedAccounts.length > 1) {
      return 'You can only move one account at a time.';
    }

    return 'You cannot move the selected account up one level.';
  }
);

export const getCannotMoveAccountDownMessage = createSelector(
  getSelectedAccounts,
  (selectedAccounts) => {
    if (selectedAccounts.length > 1) {
      return 'You can only move one account at a time.';
    }

    return 'You cannot move the selected account down one level.';
  }
);

export const getSelectedTaxCodeId = (state) => state.selectedTaxCodeId;

const getLevelRangeForSelectedAccounts = createSelector(
  getSelectedAccounts,
  (selectedAccounts) => {
    const maxLevelInSelection = selectedAccounts.reduce(
      (max, cur) => (cur.level > max ? cur.level : max),
      selectedAccounts[0].level
    );
    const minLevelInSelection = selectedAccounts.reduce(
      (min, cur) => (cur.level < min ? cur.level : min),
      selectedAccounts[0].level
    );
    return maxLevelInSelection - minLevelInSelection;
  }
);

export const getAccountMoveToTargets = createSelector(
  getRawEntries,
  getSelectedSingleAccount,
  getLevelRangeForSelectedAccounts,
  (entries, firstSelectedAccount, deltaLevel) => {
    const MAX_LEVEL = 4;

    const parentId = firstSelectedAccount.parentAccountId;
    const selectedAccountType = firstSelectedAccount.accountType;

    const vaildMoveToAccounts = entries.reduce((accounts, entry) => {
      // Accounts can only be moved to accounts of the same type
      // Resulting tree can not have accounts that would have a greater level than 4
      // Only header accounts are valid options
      if (
        entry.accountType === selectedAccountType &&
        entry.level + deltaLevel < MAX_LEVEL &&
        entry.isHeader &&
        !entry.selected
      )
        // Current parent should appear in the list but be a disabled option
        accounts.push({
          ...entry,
          isParentOfSelectedAccounts: entry.id === parentId,
        });
      return accounts;
    }, []);

    return vaildMoveToAccounts;
  }
);

export const getShouldDisableMoveTo = (state) => state.disableMoveTo;
