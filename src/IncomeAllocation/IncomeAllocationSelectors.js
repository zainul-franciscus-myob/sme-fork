import { createSelector } from 'reselect';

const getEntityTypes = store => store.entityTypes;

export const getEntityTypeOptions = createSelector(
  getEntityTypes,
  entityTypes => entityTypes.map(entityType => ({
    label: entityType.name,
    value: entityType.value,
  })),
);

export const getSelectedEntityType = store => store.incomeAllocation.entityType;

const getLength = state => state.incomeAllocation.lines.length;

export const getIndexOfLastLine = state => state.incomeAllocation.lines.length - 1;

export const getTableData = createSelector(
  getLength,
  len => Array(len).fill({}),
);

export const getIsTableEmpty = createSelector(
  getLength,
  len => len === 0,
);

const getNewLine = state => state.newLine;

const getAccounts = state => state.accounts;

const getHeaderAccounts = createSelector(
  getAccounts,
  accounts => accounts.map(({ detailAccounts, ...account }) => account),
);

export const getNewLineData = createSelector(
  getNewLine,
  getHeaderAccounts,
  (newLine, headerAccounts) => ({
    ...newLine,
    headerAccounts,
    retainedEarningsAccounts: [],
    currentEarningsAccounts: [],
  }),
);

const getDetailAccounts = (headerAccountId, accounts) => {
  const selectedHeaderAccount = accounts.find(({ id }) => id === headerAccountId) || {};

  return selectedHeaderAccount.detailAccounts || [];
};

const getAccountIndex = (accountId, accounts) => accounts.findIndex(
  ({ id }) => id === accountId,
);

export const getLineDataByIndexSelector = () => createSelector(
  (state, props) => state.incomeAllocation.lines[props.index],
  getAccounts,
  getHeaderAccounts,
  ((line, accounts, headerAccounts) => {
    if (!line) {
      return {};
    }

    const {
      headerAccountId,
      retainedEarningsAccountId,
      currentEarningsAccountId,
      equity,
    } = line;

    const detailAccounts = getDetailAccounts(headerAccountId, accounts);

    const headerAccountIndex = getAccountIndex(headerAccountId, headerAccounts);
    const retainedEarningsAccountIndex = getAccountIndex(retainedEarningsAccountId, detailAccounts);
    const currentEarningsAccountIndex = getAccountIndex(currentEarningsAccountId, detailAccounts);

    return ({
      headerAccountIndex,
      retainedEarningsAccountIndex,
      currentEarningsAccountIndex,
      equity,
      headerAccounts,
      retainedEarningsAccounts: detailAccounts,
      currentEarningsAccounts: detailAccounts,
    });
  }),
);

export const getIncomeAllocationSavePayload = state => state.incomeAllocation;

export const getIsTableHidden = createSelector(
  getSelectedEntityType,
  entityType => entityType === 'Company',
);

export const getIsActionsDisabled = state => state.isSubmitting;
export const getIsLoading = state => state.isLoading;
export const getAlert = state => state.alert;

export const shouldLinesBeReset = state => state.incomeAllocation.entityType === 'Company';
