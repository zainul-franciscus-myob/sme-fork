import { createSelector, createStructuredSelector } from 'reselect';

const convertToUnixTime = date => new Date(date).getTime().toString();

const getReferenceId = state => state.generalJournal.referenceId;
const getDate = state => state.generalJournal.date;
const getDescription = state => state.generalJournal.description;
const getGSTReportingMethod = state => state.generalJournal.gstReportingMethod;
const getIsEndOfYearAdjustment = state => state.generalJournal.isEndOfYearAdjustment;
const getIsTaxInclusive = state => state.generalJournal.isTaxInclusive;

const getHeadersProperties = createStructuredSelector({
  referenceId: getReferenceId,
  date: getDate,
  description: getDescription,
  isTaxInclusive: getIsTaxInclusive,
  isEndOfYearAdjustment: getIsEndOfYearAdjustment,
  gstReportingMethod: getGSTReportingMethod,
});

export const getHeaderOptions = createSelector(getHeadersProperties, (headerProps) => {
  const {
    date,
    ...headerOptions
  } = headerProps;

  return {
    date: convertToUnixTime(date),
    ...headerOptions,
  };
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
        accountId, taxCodeId, taxCodes, accounts, debitAmount, creditAmount, description, taxAmount,
      } = line;

      const disabledField = getDisabledField(line);

      formatedLine = ({
        debitAmount,
        creditAmount,
        taxAmount,
        description,
        accountId,
        taxCodeId,
        taxCodes,
        accounts,
        selectedAccountIndex: accounts.findIndex(({ id }) => id === accountId),
        selectedTaxCodeIndex: taxCodes.findIndex(({ id }) => id === taxCodeId),
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

export const getGeneralJournalForCreatePayload = (state) => {
  const { referenceId, originalReferenceId, ...rest } = getGeneralJournal(state);
  return referenceId === originalReferenceId ? rest : { ...rest, referenceId };
};

export const getCalculatedTotalsPayload = (state) => {
  const { lines, isTaxInclusive, gstReportingMethod } = getGeneralJournal(state);
  return { isTaxInclusive, lines, gstReportingMethod };
};

export const getIsActionsDisabled = state => state.isSubmitting;
export const isPageEdited = state => state.isPageEdited;
