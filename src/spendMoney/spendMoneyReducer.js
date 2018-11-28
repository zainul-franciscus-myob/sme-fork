import { getDefaultTaxCodeId } from './spendMoneySelectors';
import SpendMoneyIntents from './SpendMoneyIntents';
import SystemIntents from '../SystemIntents';

const initialState = {
  spendMoney: {
    id: '',
    referenceId: '',
    originalReferenceId: '',
    date: '',
    isTaxInclusive: false,
    isReportable: false,
    description: '',
    selectedPayFromAccount: '',
    selectedPayToContact: '',
    lines: [],
    payFromAccounts: [],
    payToContacts: [],
  },
  newLine: {
    accountId: '',
    amount: '',
    description: '',
    jobId: '',
    taxCodeId: '',
    taxAmount: '',
    jobs: [],
    accounts: [],
    taxCodes: [],
  },
  modalType: '',
  alertMessage: '',
  isLoading: true,
};

const formatStringNumber = num => parseFloat(num).toFixed(2).toString();
const isAccountLineItem = lineKey => lineKey === 'accountId';

const updateSpendMoneyLine = (line, { lineKey, lineValue }) => {
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
  index === action.lineIndex ? updateSpendMoneyLine(line, action) : line
));

const spendMoneyReducer = (state = initialState, action) => {
  switch (action.intent) {
    case SystemIntents.RESET_STATE:
      return {
        ...initialState,
      };
    case SpendMoneyIntents.LOAD_NEW_SPEND_MONEY:
      return {
        ...state,
        spendMoney: { ...state.spendMoney, ...action.spendMoney },
        newLine: { ...state.newLine, ...action.newLine },
        isLoading: false,
      };
    case SpendMoneyIntents.LOAD_NEW_GENERAL_JOURNAL_DETAIL:
      return {
        ...initialState,
        generalJournal: {
          ...initialState.generalJournal,
          ...action.generalJournal,
          originalReferenceId: action.generalJournal.referenceId,
        },
        newLine: { ...state.newLine, ...action.newLine },
        isLoading: action.isLoading,
      };
    case SpendMoneyIntents.UPDATE_GENERAL_JOURNAL_DETAIL_HEADER_OPTIONS:
      return {
        ...state,
        generalJournal: {
          ...state.generalJournal,
          [action.key]: action.value,
        },
      };
    case SpendMoneyIntents.SAVE_GENERAL_JOURNAL_DETAIL:
      return {
        ...state,
      };
    case SpendMoneyIntents.OPEN_MODAL:
      return {
        ...state,
        modalType: action.modalType,
      };
    case SpendMoneyIntents.CLOSE_MODAL:
      return {
        ...state,
        modalType: '',
      };
    case SpendMoneyIntents.UPDATE_GENERAL_JOURNAL_DETAIL_LINE:
      return {
        ...state,
        generalJournal: {
          ...state.generalJournal,
          lines: getLinesForUpdate(action, state.generalJournal.lines),
        },
      };
    case SpendMoneyIntents.ADD_GENERAL_JOURNAL_DETAIL_LINE:
      return {
        ...state,
        generalJournal: {
          ...state.generalJournal,
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
    case SpendMoneyIntents.DELETE_GENERAL_JOURNAL_DETAIL_LINE:
      return {
        ...state,
        generalJournal: {
          ...state.generalJournal,
          lines: state.generalJournal.lines.filter((item, index) => index !== action.index),
        },
      };
    case SpendMoneyIntents.FORMAT_GENERAL_JOURNAL_DETAIL_LINE:
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
    case SpendMoneyIntents.SET_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.alertMessage,
      };
    case SpendMoneyIntents.SET_LOADING_STATE:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
export default spendMoneyReducer;
