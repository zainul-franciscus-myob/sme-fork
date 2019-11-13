import {
  ADD_GENERAL_JOURNAL_LINE,
  CLOSE_MODAL,
  DELETE_GENERAL_JOURNAL_LINE,
  FORMAT_GENERAL_JOURNAL_LINE,
  GET_CALCULATED_TOTALS,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  OPEN_MODAL,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_GENERAL_JOURNAL_HEADER,
  UPDATE_GENERAL_JOURNAL_LINE,
} from '../GeneralJournalIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import { getDefaultTaxCodeId } from './generalJournalDetailSelectors';
import createReducer from '../../store/createReducer';
import formatIsoDate from '../../valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
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
    totalDebit: '$0.00',
    totalCredit: '$0.00',
    totalTax: '$0.00',
    totalOutOfBalance: '$0.00',
  },
  modal: undefined,
  pageTitle: '',
  alertMessage: '',
  isLoading: true,
  isSubmitting: false,
  isPageEdited: false,
  businessId: '',
  region: '',
});

const pageEdited = { isPageEdited: true };

const resetState = () => (getDefaultState());
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
  pageTitle: action.pageTitle,
});

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

const updateHeader = (state, action) => ({
  ...state,
  ...pageEdited,
  generalJournal: {
    ...state.generalJournal,
    [action.key]: action.value,
  },
});

const loadNewGeneralJournal = (state, action) => ({
  ...state,
  generalJournal: {
    ...state.generalJournal,
    ...action.generalJournal,
    date: formatIsoDate(new Date()),
    originalReferenceId: action.generalJournal.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  isLoading: false,
  pageTitle: action.pageTitle,
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
  modal: action.modal,
});

const closeModal = state => ({
  ...state,
  modal: undefined,
});

const getCalculateTotals = (state, action) => ({
  ...state,
  totals: action.totals,
});

const resetTotals = state => ({
  ...state,
  totals: getDefaultState().totals,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [LOAD_GENERAL_JOURNAL_DETAIL]: loadGeneralJournalDetail,
  [LOAD_NEW_GENERAL_JOURNAL]: loadNewGeneralJournal,
  [GET_CALCULATED_TOTALS]: getCalculateTotals,
  [UPDATE_GENERAL_JOURNAL_HEADER]: updateHeader,
  [UPDATE_GENERAL_JOURNAL_LINE]: updateLine,
  [ADD_GENERAL_JOURNAL_LINE]: addLine,
  [DELETE_GENERAL_JOURNAL_LINE]: deleteLine,
  [FORMAT_GENERAL_JOURNAL_LINE]: formatLine,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [RESET_TOTALS]: resetTotals,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
};
const generalJournalReducer = createReducer(getDefaultState(), handlers);

export default generalJournalReducer;
