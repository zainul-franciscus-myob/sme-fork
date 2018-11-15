import { calculateTaxForLine, getDefaultTaxCodeId } from './GeneralJournalDetailSelectors';
import GeneralJournalIntents from './GeneralJournalIntents';
import SystemIntents from '../SystemIntents';

const initialState = {
  generalJournal: {
    id: '',
    referenceId: '',
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
  modalType: '',
  alertMessage: '',
  isLoading: true,
};

const formatStringNumber = num => parseFloat(num).toFixed(2).toString();
const isAccountLineItem = lineKey => lineKey === 'accountId';

const updateGeneralJournalLine = (line, { lineKey, lineValue }) => {
  const updatedLine = {
    ...line,
    taxAmount: calculateTaxForLine(line),
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

const generalJournalDetailReducer = (state = initialState, action) => {
  switch (action.intent) {
    case SystemIntents.RESET_STATE:
      return {
        ...initialState,
      };
    case GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL:
      return {
        ...state,
        generalJournal: { ...state.generalJournal, ...action.generalJournal },
        newLine: { ...state.newLine, ...action.newLine },
        isLoading: false,
      };
    case GeneralJournalIntents.LOAD_NEW_GENERAL_JOURNAL_DETAIL:
      return {
        ...initialState,
        generalJournal: { ...initialState.generalJournal, ...action.generalJournal },
        newLine: { ...state.newLine, ...action.newLine },
        isLoading: action.isLoading,
      };
    case GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_HEADER_OPTIONS:
      return {
        ...state,
        generalJournal: {
          ...state.generalJournal,
          [action.key]: action.value,
        },
      };
    case GeneralJournalIntents.SAVE_GENERAL_JOURNAL_DETAIL:
      return {
        ...state,
      };
    case GeneralJournalIntents.OPEN_MODAL:
      return {
        ...state,
        modalType: action.modalType,
      };
    case GeneralJournalIntents.CLOSE_MODAL:
      return {
        ...state,
        modalType: '',
      };
    case GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_LINE:
      return {
        ...state,
        generalJournal: {
          ...state.generalJournal,
          gstReportingMethod: getReportingMethodForUpdate(action, state.generalJournal),
          lines: getLinesForUpdate(action, state.generalJournal.lines),
        },
      };
    case GeneralJournalIntents.ADD_GENERAL_JOURNAL_DETAIL_LINE:
      return {
        ...state,
        generalJournal: {
          ...state.generalJournal,
          gstReportingMethod: getReportingMethodForCreate(action,
            state.newLine, state.generalJournal),
          lines: [
            ...state.generalJournal.lines,
            {
              ...state.newLine,
              ...action.line,
              taxCodeId: getDefaultTaxCodeId({ ...state.newLine, ...action.line }),
            },
          ],
        },
      };
    case GeneralJournalIntents.DELETE_GENERAL_JOURNAL_DETAIL_LINE:
      return {
        ...state,
        generalJournal: {
          ...state.generalJournal,
          lines: state.generalJournal.lines.filter((item, index) => index !== action.index),
        },
      };
    case GeneralJournalIntents.FORMAT_GENERAL_JOURNAL_DETAIL_LINE:
      return {
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
      };
    case GeneralJournalIntents.SET_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.alertMessage,
      };
    case GeneralJournalIntents.SET_LOADING_STATE:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
export default generalJournalDetailReducer;
