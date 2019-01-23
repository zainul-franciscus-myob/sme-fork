import dateFormat from 'dateformat';

import { getDefaultTaxCodeId } from './generalJournalDetailSelectors';
import GeneralJournalIntents from '../GeneralJournalIntents';
import SystemIntents from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const initialState = {
  generalJournal: {
    id: '',
    referenceId: '',
    originalReferenceId: '',
    date: '',
    gstReportingMethod: '',
    isEndOfYearAdjustment: false,
    isTaxInclusive: false,
    description: '',
    lines: [],
  },
  newLine: {
    accountId: '',
    debitAmount: '',
    creditAmount: '',
    description: '',
    taxCodeId: '',
    taxAmount: '',
    accounts: [],
    taxCodes: [],
  },
  totals: {
    totalDebit: '0.00',
    totalCredit: '0.00',
    totalTax: '0.00',
    totalOutOfBalance: '0.00',
  },
  modalType: '',
  alertMessage: '',
  isLoading: true,
  isSubmitting: false,
  isPageEdited: false,
};

const pageEdited = { isPageEdited: true };

const resetState = () => (initialState);
const formatStringNumber = num => parseFloat(num).toFixed(2).toString();
const formatLine = (state, action) => ({
  ...state,
  generalJournal: {
    ...state.generalJournal,
    lines: state.generalJournal.lines.map(
      ({ debitAmount, creditAmount, ...line }, index) => (
        {
          debitAmount: index === action.index && debitAmount
            ? formatStringNumber(debitAmount) : debitAmount,
          creditAmount: index === action.index && creditAmount
            ? formatStringNumber(creditAmount) : creditAmount,
          ...line,
        }
      ),
    ),
  },
});

const isAccountLineItem = lineKey => lineKey === 'accountId';

const isUpdatingAccountItemInFirstLine = (lineIndex, lineKey) => lineIndex === 0
      && isAccountLineItem(lineKey);

const getReportingMethodFromSelectAccount = (accounts, selectAccountId) => accounts
  .find(account => account.id === selectAccountId).reportingMethod;

const getReportingMethodForUpdate = (action, { lines, gstReportingMethod }) => {
  let reportingMethod = gstReportingMethod;
  if (isUpdatingAccountItemInFirstLine(action.lineIndex, action.lineKey)) {
    const accountId = action.lineValue;
    reportingMethod = getReportingMethodFromSelectAccount(
      lines[action.lineIndex].accounts,
      accountId,
    );
  }
  return reportingMethod;
};

const getReportingMethodForCreate = (action, newLine, { lines, gstReportingMethod }) => {
  let reportingMethod = gstReportingMethod;
  if (lines.length === 0) {
    reportingMethod = getReportingMethodFromSelectAccount(newLine.accounts, action.line.accountId);
  }
  return reportingMethod;
};


const loadGeneralJournalDetail = (state, action) => ({
  ...state,
  generalJournal: {
    ...state.generalJournal,
    ...action.generalJournal,
    originalReferenceId: action.generalJournal.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  totals: action.totals,
  isLoading: false,
});

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

const updateGeneralJournalLine = (line, { lineKey, lineValue }) => {
  const updatedLine = {
    ...line,
    [lineKey]: lineValue,
  };

  const { accounts } = line;
  return isAccountLineItem(lineKey)
    ? {
      ...updatedLine,
      taxCodeId: getDefaultTaxCodeId({ accountId: lineValue, accounts }),
    }
    : updatedLine;
};

const getLinesForUpdate = (action, lines) => lines.map((line, index) => (
  index === action.lineIndex ? updateGeneralJournalLine(line, action) : line
));

const updateLine = (state, action) => ({
  ...state,
  ...pageEdited,
  generalJournal: {
    ...state.generalJournal,
    gstReportingMethod: getReportingMethodForUpdate(action, state.generalJournal),
    lines: getLinesForUpdate(action, state.generalJournal.lines),
  },
});

const addLine = (state, action) => ({
  ...state,
  ...pageEdited,
  generalJournal: {
    ...state.generalJournal,
    gstReportingMethod: getReportingMethodForCreate(action, state.newLine, state.generalJournal),
    lines: [
      ...state.generalJournal.lines,
      {
        ...state.newLine,
        ...action.line,
        taxCodeId: getDefaultTaxCodeId({ ...state.newLine, ...action.line }),
      },
    ],
  },
});

const deleteLine = (state, action) => ({
  ...state,
  ...pageEdited,
  generalJournal: {
    ...state.generalJournal,
    lines: state.generalJournal.lines.filter((item, index) => index !== action.index),
  },
});

const isDateOptionChange = filterName => filterName === 'date';

const updateHeader = (state, action) => ({
  ...state,
  ...pageEdited,
  generalJournal: {
    ...state.generalJournal,
    [action.key]: isDateOptionChange(action.key)
      ? convertToDateString(action.value)
      : action.value,
  },
});

const loadNewGeneralJournal = (state, action) => ({
  ...state,
  generalJournal: {
    ...state.generalJournal,
    ...action.generalJournal,
    date: convertToDateString(Date.now()),
    originalReferenceId: action.generalJournal.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  isLoading: false,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const getCalculateTotals = (state, action) => ({
  ...state,
  totals: action.totals,
});

const resetTotals = state => ({
  ...state,
  totals: initialState.totals,
});

const handlers = {
  [GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL]: loadGeneralJournalDetail,
  [GeneralJournalIntents.LOAD_NEW_GENERAL_JOURNAL]: loadNewGeneralJournal,
  [GeneralJournalIntents.GET_CALCULATED_TOTALS]: getCalculateTotals,
  [GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_HEADER]: updateHeader,
  [GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_LINE]: updateLine,
  [GeneralJournalIntents.ADD_GENERAL_JOURNAL_LINE]: addLine,
  [GeneralJournalIntents.DELETE_GENERAL_JOURNAL_LINE]: deleteLine,
  [GeneralJournalIntents.FORMAT_GENERAL_JOURNAL_LINE]: formatLine,
  [GeneralJournalIntents.SET_LOADING_STATE]: setLoadingState,
  [GeneralJournalIntents.SET_SUBMITTING_STATE]: setSubmittingState,
  [GeneralJournalIntents.SET_ALERT_MESSAGE]: setAlertMessage,
  [GeneralJournalIntents.OPEN_MODAL]: openModal,
  [GeneralJournalIntents.CLOSE_MODAL]: closeModal,
  [GeneralJournalIntents.RESET_TOTALS]: resetTotals,
  [SystemIntents.RESET_STATE]: resetState,
};
const generalJournalReducer = createReducer(initialState, handlers);

export default generalJournalReducer;
