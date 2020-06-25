import { createSelector, createStructuredSelector } from 'reselect';
import { isBefore } from 'date-fns';

import {
  CREATE_GENERAL_JOURNAL,
  LOAD_DUPLICATE_GENERAL_JOURNAL,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  UPDATE_GENERAL_JOURNAL,
} from '../GeneralJournalIntents';
import ModalType from './ModalType';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

const getReferenceId = state => state.generalJournal.referenceId;
const getDate = state => state.generalJournal.date;
const getDescription = state => state.generalJournal.description;
const getGSTReportingMethod = state => state.generalJournal.gstReportingMethod;
const getIsEndOfYearAdjustment = state => state.generalJournal.isEndOfYearAdjustment;
const getStartOfFinancialYearDate = state => state.startOfFinancialYearDate;
export const getIsCreating = state => state.generalJournalId === 'new';
export const getIsTaxInclusive = state => state.generalJournal.isTaxInclusive;

export const getIsGeneralJournalJobColumnEnabled = state => state.isGeneralJournalJobColumnEnabled;

export const getHeaderOptions = createStructuredSelector({
  referenceId: getReferenceId,
  date: getDate,
  description: getDescription,
  isTaxInclusive: getIsTaxInclusive,
  isEndOfYearAdjustment: getIsEndOfYearAdjustment,
  gstReportingMethod: getGSTReportingMethod,
});

export const getAlert = state => state.alert;
export const getLoadingState = state => state.loadingState;
export const getIsSystem = state => state.generalJournal.isSystem;

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
        jobId,
        jobs,
        taxCodeId,
        taxCodes,
        accounts,
        debitAmount,
        displayDebitAmount,
        creditAmount,
        displayCreditAmount,
        quantity,
        description,
        taxAmount,
      } = line;

      const disabledField = getDisabledField(line);

      formatedLine = ({
        debitAmount,
        displayDebitAmount,
        creditAmount,
        displayCreditAmount,
        quantity,
        taxAmount,
        description,
        accountId,
        jobId,
        jobs,
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

export const getNewLineData = state => state.newLine;

export const getIndexOfLastLine = state => state.generalJournal.lines.length - 1;

const getGeneralJournal = state => state.generalJournal;

export const getGeneralJournalId = state => state.generalJournalId;

export const getTotals = state => state.totals;
export const getIsOutOfBalanced = state => state.totals.totalOutOfBalance !== '$0.00';

const getGeneralJournalLines = createSelector(
  getGeneralJournal,
  generalJournal => generalJournal.lines,
);

const getGeneralJournalForCreatePayload = (state) => {
  const {
    depositIntoAccounts,
    payFromContacts,
    referenceId,
    originalReferenceId,
    lines,
    ...rest
  } = getGeneralJournal(state);

  const linesForPayload = getGeneralJournalLines(state);
  const referenceIdForPayload = referenceId === originalReferenceId ? undefined : referenceId;

  return {
    ...rest,
    lines: linesForPayload,
    referenceId: referenceIdForPayload,
  };
};

export const getIsActionsDisabled = state => state.isSubmitting || state.isCreatedAccountLoading;
export const getIsTableDisabled = state => (
  state.isCreatedAccountLoading || state.isCreatedJobLoading
);
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

export const getOpenedModalType = (state) => {
  const modal = getModal(state) || { type: ModalType.NONE };

  return modal.type;
};

export const getJobOptions = state => state.jobOptions;

export const getTaxCodeOptions = state => state.taxCodeOptions;

export const getAccountOptions = state => state.accountOptions;

export const getIsSale = createSelector(
  getGeneralJournal,
  generalJournal => generalJournal.gstReportingMethod === 'sale',
);

export const isLineTaxCalculatable = line => (
  line.taxCodeId && (line.creditAmount || line.creditAmount)
);

const isNumeric = val => !Number.isNaN(parseFloat(val));

const isCreditLine = (line) => {
  if (isNumeric(line.creditAmount)) {
    return true;
  }
  if (isNumeric(line.debitAmount)) {
    return false;
  }
  return undefined;
};

export const getLinesForTaxCalculation = createSelector(
  getGeneralJournalLines,
  lines => lines.map(line => ({
    ...line,
    amount: line.creditAmount || line.debitAmount,
    lineTypeId: line.lineTypeId,
    isCredit: isCreditLine(line),
  })),
);

export const getIsLineAmountsTaxInclusive = (state, isSwitchingTaxInclusive) => {
  const isTaxInclusive = getIsTaxInclusive(state);
  return (
    isSwitchingTaxInclusive ? !isTaxInclusive : isTaxInclusive
  );
};

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getJobModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getDuplicateId = (state) => state.duplicateId;

export const getSaveGeneralJournalRequest = createSelector(
  getBusinessId,
  getGeneralJournalId,
  getIsCreating,
  getGeneralJournalForCreatePayload,
  getGeneralJournal,
  (businessId, generalJournalId, isCreating, createPayload, updatePayload) => {
    const content = isCreating ? createPayload : updatePayload;
    const urlParams = isCreating ? {
      businessId,
    } : {
      businessId,
      generalJournalId,
    };
    const intent = isCreating ? CREATE_GENERAL_JOURNAL : UPDATE_GENERAL_JOURNAL;
    return {
      intent,
      content,
      urlParams,
    };
  },
);

export const getLoadGeneralJournalIntent = createSelector(
  getIsCreating,
  getDuplicateId,
  (isCreating, duplicateId) => {
    if (isCreating) {
      return duplicateId ? LOAD_DUPLICATE_GENERAL_JOURNAL : LOAD_NEW_GENERAL_JOURNAL;
    }
    return LOAD_GENERAL_JOURNAL_DETAIL;
  },
);

export const getLoadGeneralJournalRequest = createSelector(
  getBusinessId,
  getGeneralJournalId,
  getDuplicateId,
  getIsCreating,
  getLoadGeneralJournalIntent,
  (businessId, generalJournalId, duplicateId, isCreating, intent) => {
    const urlParams = {
      businessId,
      generalJournalId: isCreating ? undefined : generalJournalId,
      duplicateId,
    };

    return {
      intent,
      urlParams,
    };
  },
);

export const getLoadAccountAfterCreateUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);
  return { businessId, accountId };
};

export const getLoadJobAfterCreateUrlParams = (state, jobId) => {
  const businessId = getBusinessId(state);
  return { businessId, jobId };
};

export const getCreateGeneralJournalUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/generalJournal/new`;
};

export const getIsBeforeStartOfFinancialYear = createSelector(
  getDate,
  getStartOfFinancialYearDate,
  (date, startOfFinancialYearDate) => date && startOfFinancialYearDate
  && isBefore(new Date(date), new Date(startOfFinancialYearDate)),
);
