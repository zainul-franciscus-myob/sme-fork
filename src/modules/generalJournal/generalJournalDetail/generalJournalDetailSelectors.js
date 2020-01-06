import { createSelector, createStructuredSelector } from 'reselect';

import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

const getReferenceId = state => state.generalJournal.referenceId;
const getDate = state => state.generalJournal.date;
const getDescription = state => state.generalJournal.description;
const getGSTReportingMethod = state => state.generalJournal.gstReportingMethod;
const getIsEndOfYearAdjustment = state => state.generalJournal.isEndOfYearAdjustment;
const getIsTaxInclusive = state => state.generalJournal.isTaxInclusive;

export const getHeaderOptions = createStructuredSelector({
  referenceId: getReferenceId,
  date: getDate,
  description: getDescription,
  isTaxInclusive: getIsTaxInclusive,
  isEndOfYearAdjustment: getIsEndOfYearAdjustment,
  gstReportingMethod: getGSTReportingMethod,
});

export const getAlertMessage = state => state.alertMessage;
export const getModalType = state => state.modalType;
export const getIsLoading = state => state.isLoading;

const formatNumber = num => num.toFixed(2);

export const getDefaultTaxCodeId = ({ accountId, accounts }) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const isZero = amount => formatNumber(Number(amount)) === '0.00';

const getDisabledField = ({ debitAmount, creditAmount }) => {
  if (debitAmount && !isZero(debitAmount)) {
    return 'credit';
  }

  if (creditAmount && !isZero(creditAmount)) {
    return 'debit';
  }

  return '';
};

export const getLineDataByIndexSelector = () => createSelector(
  (state, props) => state.generalJournal.lines[props.index],
  ((line) => {
    let formatedLine = {};
    if (line) {
      const {
        accountId,
        taxCodeId,
        taxCodes,
        accounts,
        debitAmount,
        creditAmount,
        quantity,
        description,
        taxAmount,
      } = line;

      const disabledField = getDisabledField(line);

      formatedLine = ({
        debitAmount,
        creditAmount,
        quantity,
        taxAmount,
        description,
        accountId,
        taxCodeId,
        taxCodes,
        accounts,
        isCreditDisabled: disabledField === 'credit',
        isDebitDisabled: disabledField === 'debit',
      });
    }
    return formatedLine;
  }),
);

const getLength = state => state.generalJournal.lines.length;

export const getTableData = createSelector(
  getLength,
  len => Array(len).fill({}),
);

export const getIsTableEmpty = createSelector(
  getLength,
  len => len === 0,
);

export const getNewLineData = state => state.newLine;

export const getIndexOfLastLine = state => state.generalJournal.lines.length - 1;

export const getGeneralJournal = state => state.generalJournal;

export const getGeneralJournalId = state => state.generalJournal.id;

export const getTotals = state => state.totals;
export const getIsOutOfBalanced = state => state.totals.totalOutOfBalance !== '$0.00';

const getGeneralJournalLinesForPayload = lines => lines.map((line) => {
  const { accounts, taxCodes, ...rest } = line;
  return rest;
});

export const getGeneralJournalForCreatePayload = (state) => {
  const {
    depositIntoAccounts,
    payFromContacts,
    referenceId,
    originalReferenceId,
    lines,
    ...rest
  } = getGeneralJournal(state);

  const linesForPayload = getGeneralJournalLinesForPayload(lines);
  const referenceIdForPayload = referenceId === originalReferenceId ? undefined : referenceId;

  return {
    ...rest,
    lines: linesForPayload,
    referenceId: referenceIdForPayload,
  };
};

export const getGeneralJournalForUpdatePayload = (state) => {
  const {
    depositIntoAccounts,
    payFromContacts,
    originalReferenceId,
    lines,
    ...rest
  } = getGeneralJournal(state);

  const linesForPayload = getGeneralJournalLinesForPayload(lines);

  return {
    ...rest,
    lines: linesForPayload,
  };
};

export const getCalculatedTotalsPayload = (state) => {
  const { lines, isTaxInclusive, gstReportingMethod } = getGeneralJournal(state);
  return {
    isTaxInclusive,
    lines: getGeneralJournalLinesForPayload(lines),
    gstReportingMethod,
  };
};

export const getIsActionsDisabled = state => state.isSubmitting;
export const isPageEdited = state => state.isPageEdited;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getPageTitle = state => state.pageTitle;
export const getTaxCodeLabel = state => getRegionToDialectText(state.region)('Tax code');
export const getTaxLabel = state => getRegionToDialectText(state.region)('Tax');
export const getTaxInclusiveLabel = state => `${getTaxLabel(state)} inclusive`;
export const getTaxExclusiveLabel = state => `${getTaxLabel(state)} exclusive`;
export const getModal = state => state.modal;
export const getModalUrl = state => ((state.modal || {}).url);

export const getTransactionListUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/transactionList`,
);

export const getSaveUrl = (state) => {
  const modalUrl = getModalUrl(state);
  const transactionListUrl = getTransactionListUrl(state);
  return modalUrl || transactionListUrl;
};