import { getTaxRateForLineFromAccounts } from './GeneralJournalDetailSelectors';
import GeneralJournalIntents from './GeneralJournalIntents';

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
  modalType: '',
  alertMessage: '',
  isLoading: true,
};

const formatStringNumber = num => parseFloat(num).toFixed(2).toString();

const getExclusiveAmount = (amount, rate) => amount / (1 + rate);
const getInclusiveAmount = (amount, rate) => amount * (1 + rate);

const getDisplayAmount = (amount, rate, isTaxInclusive) => {
  const parsedAmount = parseFloat(amount);
  const calculatedAmount = isTaxInclusive
    ? getInclusiveAmount(parsedAmount, rate) : getExclusiveAmount(parsedAmount, rate);
  return formatStringNumber(calculatedAmount);
};

const updateLineByTaxType = (line, accounts, isTaxInclusive) => {
  let {
    debitDisplayAmount,
    creditDisplayAmount,
  } = line;

  const taxRate = getTaxRateForLineFromAccounts(accounts, line);

  debitDisplayAmount = debitDisplayAmount
    && getDisplayAmount(debitDisplayAmount, taxRate, isTaxInclusive);
  creditDisplayAmount = creditDisplayAmount
    && getDisplayAmount(creditDisplayAmount, taxRate, isTaxInclusive);

  return {
    ...line,
    debitDisplayAmount,
    creditDisplayAmount,
  };
};

const generalJournalDetailReducer = (state = initialState, action) => {
  switch (action.intent) {
    case GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL:
      return {
        ...state,
        generalJournal: { ...state.generalJournal, ...action.generalJournal },
        accounts: action.accounts,
        isLoading: false,
      };
    case GeneralJournalIntents.LOAD_NEW_GENERAL_JOURNAL_DETAIL:
      return {
        ...initialState,
        generalJournal: { ...initialState.generalJournal, ...action.generalJournal },
        accounts: action.accounts,
        isLoading: action.isLoading,
      };
    case GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_HEADER_OPTIONS:
      return {
        ...state,
        generalJournal: {
          ...state.generalJournal,
          [action.key]: action.value,
          lines: action.key === 'isTaxInclusive'
            ? state.generalJournal.lines.map(
              line => updateLineByTaxType(line, state.accounts, action.value),
            )
            : state.generalJournal.lines,
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
                ? { ...line, [action.lineKey]: action.lineValue }
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
            action.line,
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
            ({ debitDisplayAmount, creditDisplayAmount, ...line }, index) => (
              {
                debitDisplayAmount: index === action.index && debitDisplayAmount
                  ? formatStringNumber(debitDisplayAmount) : debitDisplayAmount,
                creditDisplayAmount: index === action.index && creditDisplayAmount
                  ? formatStringNumber(creditDisplayAmount) : creditDisplayAmount,
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
