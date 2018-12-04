import { getDefaultTaxCodeId } from './GeneralJournalDetailSelectors';
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
  modalType: '',
  alertMessage: '',
  isLoading: true,
  isSubmitting: false,
};

const formatStringNumber = num => num && Number(num).toFixed(2).toString();

const isAccountLineItem = lineKey => lineKey === 'accountId';

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

const calculateAmount = (amount, taxAmount, isTaxInclusive) => {
  if (!amount) {
    return '';
  }

  return formatStringNumber(isTaxInclusive ? Number(amount) + Number(taxAmount) : amount);
};

const formatLinesWithInputAmounts = (lines, isTaxInclusive) => lines.map(line => ({
  ...line,
  debitInputAmount: calculateAmount(line.debitAmount, line.taxAmount, isTaxInclusive),
  creditInputAmount: calculateAmount(line.creditAmount, line.taxAmount, isTaxInclusive),
}));

const resetState = () => (initialState);

const loadGeneralJournalDetail = (state, action) => {
  const newLine = {
    ...state.newLine,
    ...action.newLine,
    debitInputAmount: action.newLine.debitAmount,
    creditInputAmount: action.newLine.creditAmount,
  };

  return {
    ...state,
    generalJournal: {
      ...state.generalJournal,
      ...action.generalJournal,
      lines: formatLinesWithInputAmounts(
        action.generalJournal.lines, action.generalJournal.isTaxInclusive,
      ),
    },
    newLine,
    isLoading: false,
  };
};

const loadNewGeneralJournalDetail = (state, action) => ({
  ...initialState,
  generalJournal: {
    ...initialState.generalJournal,
    ...action.generalJournal,
    originalReferenceId: action.generalJournal.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  isLoading: action.isLoading,
});

const updateHeader = (state, action) => {
  const generalJournal = {
    ...state.generalJournal,
    [action.key]: action.value,
  };
  generalJournal.lines = formatLinesWithInputAmounts(
    generalJournal.lines, generalJournal.isTaxInclusive,
  );

  return {
    ...state,
    generalJournal,
  };
};

const addLine = (state, action) => ({
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
});

const updateLine = (state, action) => ({
  ...state,
  generalJournal: {
    ...state.generalJournal,
    gstReportingMethod: getReportingMethodForUpdate(action, state.generalJournal),
    lines: getLinesForUpdate(action, state.generalJournal.lines),
  },
});

const formatLine = (state, action) => ({
  ...state,
  generalJournal: {
    ...state.generalJournal,
    lines: state.generalJournal.lines.map(
      ({ debitInputAmount, creditInputAmount, ...line }, index) => (
        {
          debitInputAmount: index === action.index && debitInputAmount
            ? formatStringNumber(debitInputAmount) : debitInputAmount,
          creditInputAmount: index === action.index && creditInputAmount
            ? formatStringNumber(creditInputAmount) : creditInputAmount,
          ...line,
        }
      ),
    ),
  },
});

const deleteLine = (state, action) => ({
  ...state,
  generalJournal: {
    ...state.generalJournal,
    lines: state.generalJournal.lines.filter((item, index) => index !== action.index),
  },
});

const getCalculatedTax = (state, action) => ({
  ...state,
  generalJournal: {
    ...state.generalJournal,
    ...action.generalJournal,
    lines: formatLinesWithInputAmounts(
      action.generalJournal.lines, action.generalJournal.isTaxInclusive,
    ),
  },
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
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

const handlers = {
  [GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL]: loadGeneralJournalDetail,
  [GeneralJournalIntents.LOAD_NEW_GENERAL_JOURNAL_DETAIL]: loadNewGeneralJournalDetail,
  [GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_HEADER_OPTIONS]: updateHeader,
  [GeneralJournalIntents.ADD_GENERAL_JOURNAL_DETAIL_LINE]: addLine,
  [GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_LINE]: updateLine,
  [GeneralJournalIntents.FORMAT_GENERAL_JOURNAL_DETAIL_LINE]: formatLine,
  [GeneralJournalIntents.DELETE_GENERAL_JOURNAL_DETAIL_LINE]: deleteLine,
  [GeneralJournalIntents.GET_CALCULATED_TAX]: getCalculatedTax,
  [GeneralJournalIntents.SET_SUBMITTING_STATE]: setSubmittingState,
  [GeneralJournalIntents.SET_ALERT_MESSAGE]: setAlertMessage,
  [GeneralJournalIntents.SET_LOADING_STATE]: setLoadingState,
  [GeneralJournalIntents.OPEN_MODAL]: openModal,
  [GeneralJournalIntents.CLOSE_MODAL]: closeModal,
  [SystemIntents.RESET_STATE]: resetState,
};

const generalJournalDetailReducer = createReducer(initialState, handlers);

export default generalJournalDetailReducer;
