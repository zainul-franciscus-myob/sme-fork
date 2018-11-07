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
  accounts: [],
  taxCodes: [],
  modalType: '',
  alertMessage: '',
  isLoading: true,
};

const formatStringNumber = num => parseFloat(num).toFixed(2).toString();

const updateGeneralJournalLine = (accounts, taxCodes, line, { lineKey, lineValue }) => {
  const updatedLine = {
    ...line,
    taxAmount: calculateTaxForLine(line, taxCodes),
    [lineKey]: lineValue,
  };

  return lineKey === 'accountId'
    ? {
      ...updatedLine,
      taxCodeId: getDefaultTaxCodeId(accounts, { accountId: lineValue }),
    }
    : updatedLine;
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
        accounts: action.accounts,
        taxCodes: action.taxCodes,
        isLoading: false,
      };
    case GeneralJournalIntents.LOAD_NEW_GENERAL_JOURNAL_DETAIL:
      return {
        ...initialState,
        generalJournal: { ...initialState.generalJournal, ...action.generalJournal },
        accounts: action.accounts,
        taxCodes: action.taxCodes,
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
          lines: state.generalJournal.lines.map(
            (line, index) => (
              index === action.lineIndex
                ? updateGeneralJournalLine(state.accounts, state.taxCodes, line, action)
                : line
            ),
          ),
        },
      };
    case GeneralJournalIntents.ADD_GENERAL_JOURNAL_DETAIL_LINE:
      return {
        ...state,
        generalJournal: {
          ...state.generalJournal,
          lines: [
            ...state.generalJournal.lines,
            {
              ...action.line,
              taxCodeId: getDefaultTaxCodeId(state.accounts, action.line),
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
