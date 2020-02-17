import {
  ADD_GENERAL_JOURNAL_LINE,
  CLOSE_MODAL,
  DELETE_GENERAL_JOURNAL_LINE,
  GET_TAX_CALCULATIONS,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_GENERAL_JOURNAL_HEADER,
  UPDATE_GENERAL_JOURNAL_LINE,
} from '../GeneralJournalIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getDefaultTaxCodeId, getIsSale } from './generalJournalDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatAmount from '../../../common/valueFormatters/formatAmount';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

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
    quantity: '',
    description: '',
    taxCodeId: '',
    taxAmount: '',
    lineTypeId: '',
    displayCreditAmount: '',
    displayDebitAmount: '',
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
  loadingState: LoadingState.LOADING,
  isSubmitting: false,
  isPageEdited: false,
  businessId: '',
  region: '',
  accountOptions: [],
  taxCodeOptions: [],
});

const pageEdited = { isPageEdited: true };

const resetState = () => (getDefaultState());

const isAccountLineItem = lineKey => lineKey === 'accountId';

const isUpdatingAccountItemInFirstLine = (lineIndex, lineKey) => lineIndex === 0
      && isAccountLineItem(lineKey);

const getReportingMethodFromSelectAccount = (accounts, selectAccountId) => accounts
  .find(account => account.id === selectAccountId).reportingMethod;

const getReportingMethodForUpdate = (action, { gstReportingMethod }, accounts) => {
  let reportingMethod = gstReportingMethod;
  if (isUpdatingAccountItemInFirstLine(action.lineIndex, action.lineKey)) {
    const accountId = action.lineValue;
    if (accountId) {
      reportingMethod = getReportingMethodFromSelectAccount(
        accounts,
        accountId,
      );
    }
  }
  return reportingMethod;
};

const getReportingMethodForCreate = (action, accounts, { lines, gstReportingMethod }) => {
  let reportingMethod = gstReportingMethod;
  if (lines.length === 0 && action.line.accountId) {
    reportingMethod = getReportingMethodFromSelectAccount(accounts, action.line.accountId);
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
  pageTitle: action.pageTitle,
  taxCodeOptions: action.taxCodeOptions,
  accountOptions: action.accountOptions,
});

const updateGeneralJournalLine = (line, { lineKey, lineValue }, accounts) => {
  const updatedLine = {
    ...line,
    [lineKey]: lineValue,
  };

  return isAccountLineItem(lineKey)
    ? {
      ...updatedLine,
      taxCodeId: getDefaultTaxCodeId({ accountId: lineValue, accounts }),
    }
    : updatedLine;
};

const getLinesForUpdate = (action, lines, accounts) => lines.map((line, index) => (
  index === action.lineIndex ? updateGeneralJournalLine(line, action, accounts) : line
));

const updateLine = (state, action) => ({
  ...state,
  ...pageEdited,
  generalJournal: {
    ...state.generalJournal,
    gstReportingMethod: getReportingMethodForUpdate(
      action,
      state.generalJournal,
      state.accountOptions,
    ),
    lines: getLinesForUpdate(action, state.generalJournal.lines, state.accountOptions),
  },
});

const addLine = (state, action) => ({
  ...state,
  ...pageEdited,
  generalJournal: {
    ...state.generalJournal,
    gstReportingMethod: getReportingMethodForCreate(
      action,
      state.accountOptions,
      state.generalJournal,
    ),
    lines: [
      ...state.generalJournal.lines,
      {
        ...state.newLine,
        ...action.line,
        taxCodeId: getDefaultTaxCodeId({
          ...state.newLine,
          ...action.line,
          accounts: state.accountOptions,
        }),
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
  pageTitle: action.pageTitle,
  taxCodeOptions: action.taxCodeOptions,
  accountOptions: action.accountOptions,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
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

const getTaxCalculations = (state, { taxCalculations: { lines, totals } }) => ({
  ...state,
  isPageEdited: true,
  generalJournal: {
    ...state.generalJournal,
    lines: state.generalJournal.lines.map((line, index) => {
      const { amount, isCredit } = lines[index];

      if (isCredit === true) {
        return {
          ...line,
          creditAmount: amount.valueOf(),
          displayCreditAmount:
              line.creditAmount && formatAmount(amount.valueOf()),
        };
      }

      if (isCredit === false) {
        return {
          ...line,
          debitAmount: amount.valueOf(),
          displayDebitAmount:
              line.debitAmount && formatAmount(amount.valueOf()),
        };
      }
      return { ...line };
    }),
  },
  totals: {
    ...state.totals,
    totalDebit: formatCurrency(totals.totalDebit.valueOf()),
    totalCredit: formatCurrency(totals.totalCredit.valueOf()),
    totalOutOfBalance: formatCurrency(totals.totalOutOfBalance.valueOf()),
    totalTax: formatCurrency(
      getIsSale(state) ? -totals.totalTax.valueOf() : totals.totalTax.valueOf(),
    ),
  },
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [LOAD_GENERAL_JOURNAL_DETAIL]: loadGeneralJournalDetail,
  [LOAD_NEW_GENERAL_JOURNAL]: loadNewGeneralJournal,
  [GET_TAX_CALCULATIONS]: getTaxCalculations,
  [UPDATE_GENERAL_JOURNAL_HEADER]: updateHeader,
  [UPDATE_GENERAL_JOURNAL_LINE]: updateLine,
  [ADD_GENERAL_JOURNAL_LINE]: addLine,
  [DELETE_GENERAL_JOURNAL_LINE]: deleteLine,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
};
const generalJournalReducer = createReducer(getDefaultState(), handlers);

export default generalJournalReducer;
