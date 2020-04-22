import {
  ADD_ATTACHMENTS,
  ADD_SPEND_MONEY_LINE,
  APPEND_ALERT_MESSAGE,
  CLEAR_IN_TRAY_DOCUMENT_URL,
  CLOSE_MODAL,
  DELETE_SPEND_MONEY_LINE,
  GET_TAX_CALCULATIONS,
  HIDE_PREFILL_INFO,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_NEW_DUPLICATE_SPEND_MONEY,
  LOAD_NEW_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SPEND_MONEY_DETAIL,
  LOAD_SUPPLIER_EXPENSE_ACCOUNT,
  OPEN_MODAL,
  OPEN_REMOVE_ATTACHMENT_MODAL,
  PREFILL_DATA_FROM_IN_TRAY,
  REMOVE_ATTACHMENT,
  REMOVE_ATTACHMENT_BY_INDEX,
  RESET_BANK_STATEMENT_TEXT,
  RESET_TOTALS,
  SET_ALERT,
  SET_DUPLICATE_ID,
  SET_IN_TRAY_DOCUMENT_URL,
  SET_LOADING_STATE,
  SET_OPERATION_IN_PROGRESS_STATE,
  SET_PREFILL_INTRAY_DOCUMENT_ID,
  SET_PREFILL_NEW,
  SET_SHOW_SPLIT_VIEW,
  SET_SUBMITTING_STATE,
  SET_SUPPLIER_BLOCKING_STATE,
  UPDATE_BANK_STATEMENT_TEXT,
  UPDATE_SPEND_MONEY_HEADER,
  UPDATE_SPEND_MONEY_LINE,
  UPDATE_UPLOAD_PROGRESS,
  UPLOAD_ATTACHMENT,
  UPLOAD_ATTACHMENT_FAILED,
} from '../SpendMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getIsContactReportable,
  getIsCreating, getIsReportable, getIsSpendMoneyJobColumnEnabled, getShowBankStatementText,
} from './spendMoneyDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const defaultPrefillStatus = {
  selectedPayToContactId: false,
  description: false,
  date: false,
  isTaxInclusive: false,
};

const defaultLinePrefillStatus = {
  description: false,
  amount: false,
};

const getDefaultState = () => ({
  duplicateId: '',
  inTrayDocumentId: '',
  selectedBankAccountId: '',
  selectedDate: '',
  spendMoney: {
    id: '',
    uid: '',
    referenceId: '',
    originalReferenceId: '',
    date: '',
    isTaxInclusive: false,
    isReportable: undefined,
    description: '',
    selectedPayFromAccountId: '',
    selectedPayToContactId: '',
    originalExpenseAccountId: '',
    expenseAccountId: '',
    lines: [],
    payFromAccounts: [],
    payToContacts: [],
    electronicClearingAccountId: '',
    bankStatementText: '',
    originalBankStatementText: '',
  },
  newLine: {
    accountId: '',
    amount: '',
    quantity: '',
    description: '',
    taxCodeId: '',
    taxAmount: '',
    jobId: '',
  },
  accounts: [],
  taxCodes: [],
  jobs: [],
  totals: {
    subTotal: '$0.00',
    totalTax: '$0.00',
    totalAmount: '$0.00',
  },
  alert: undefined,
  modal: undefined,
  isLoading: LoadingState,
  isSubmitting: false,
  isSupplierBlocking: false,
  isPageEdited: false,
  businessId: '',
  region: '',
  pageTitle: '',
  attachments: [],
  inTrayDocument: {},
  showSplitView: false,
  prefillStatus: defaultPrefillStatus,
  showPrefillInfo: false,
});

const pageEdited = { isPageEdited: true };

const resetState = () => (getDefaultState());

const getDefaultTaxCodeId = ({ accountId, accounts }) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const getLinePrefillStatus = (key, currentStateLinePrefillStatus) => {
  const isPrefillField = Object.keys(defaultLinePrefillStatus).includes(key);
  return isPrefillField ? {
    ...currentStateLinePrefillStatus,
    [key]: false,
  } : currentStateLinePrefillStatus;
};

const updateSpendMoneyLine = (line, { lineKey, lineValue }, accounts) => {
  const isUpdateAccount = lineKey === 'accountId';

  const updatedLine = {
    ...line,
    taxCodeId: isUpdateAccount
      ? getDefaultTaxCodeId({ accountId: lineValue, accounts })
      : line.taxCodeId,
    prefillStatus: line.prefillStatus
      ? getLinePrefillStatus(lineKey, line.prefillStatus)
      : undefined,
    [lineKey]: lineValue,
  };
  return updatedLine;
};

const updateLine = (state, action) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    lines: state.spendMoney.lines.map((line, index) => (
      index === action.lineIndex ? updateSpendMoneyLine(line, action, state.accounts) : line
    )),
  },
});

const addLine = (state, action) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    lines: [
      ...state.spendMoney.lines,
      {
        ...state.newLine,
        ...action.line,
        taxCodeId: getDefaultTaxCodeId({
          accountId: action.line.accountId,
          accounts: state.accounts,
        }),
      },
    ],
  },
});

const deleteLine = (state, action) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    lines: state.spendMoney.lines.filter((item, index) => index !== action.index),
  },
});

const updateAllLinesWithExpenseAccount = (lines, accounts, expenseAccountId) => {
  const taxCodeId = getDefaultTaxCodeId({ accountId: expenseAccountId, accounts });
  return lines.map(line => ({
    ...line,
    accountId: expenseAccountId,
    taxCodeId,
  }));
};

const updateHeader = (state, { key, value }) => {
  const isReportable = key === 'selectedPayToContactId'
    ? getIsContactReportable(state, value)
    : getIsReportable(state);

  const isPrefillFields = Object.keys(defaultPrefillStatus).includes(key);

  return {
    ...state,
    ...pageEdited,
    spendMoney: {
      ...state.spendMoney,
      isReportable,
      [key]: value,
      lines: state.spendMoney.lines.length > 0 && key === 'expenseAccountId'
        ? updateAllLinesWithExpenseAccount(state.spendMoney.lines, state.accounts, value)
        : state.spendMoney.lines,
    },
    prefillStatus: isPrefillFields
      ? { ...state.prefillStatus, [key]: false }
      : state.prefillStatus,
  };
};

const getBankStatementText = (state, referenceId) => {
  const shouldSetBankstatementText = getShowBankStatementText(state);
  return shouldSetBankstatementText ? `Payment ${referenceId}` : '';
};

const loadNewSpendMoney = (state, action) => {
  const newState = {
    ...state,
    spendMoney: {
      ...state.spendMoney,
      ...action.spendMoney,
      date: action.spendMoney.date || formatIsoDate(new Date()),
      originalReferenceId: action.spendMoney.referenceId,
    },
    accounts: action.accounts,
    taxCodes: action.taxCodes,
    jobs: action.jobs,
    newLine: {
      ...state.newLine,
      ...action.newLine,
    },
    isLoading: false,
    pageTitle: action.pageTitle,
    inTrayDocument: { ...state.inTrayDocument, ...action.document },
    isSpendMoneyJobColumnEnabled: getIsSpendMoneyJobColumnEnabled(state),
  };

  const bankStatementText = getBankStatementText(newState, action.spendMoney.referenceId);

  return {
    ...newState,
    spendMoney: {
      ...newState.spendMoney,
      bankStatementText,
      originalBankStatementText: bankStatementText,
    },
  };
};

const loadSpendMoneyDetail = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    ...action.spendMoney,
    originalReferenceId: action.spendMoney.referenceId,
    originalBankStatementText: action.spendMoney.bankStatementText,
  },
  accounts: action.accounts,
  taxCodes: action.taxCodes,
  jobs: action.jobs,
  newLine: {
    ...state.newLine,
    ...action.newLine,
  },
  isLoading: false,
  pageTitle: action.pageTitle,
  attachments: action.attachments,
  isSpendMoneyJobColumnEnabled: getIsSpendMoneyJobColumnEnabled(state),
});

const loadReferenceId = (state, action) => {
  const bankStatementText = getBankStatementText(state, action.referenceId);

  return {
    ...state,
    spendMoney: {
      ...state.spendMoney,
      referenceId: action.referenceId,
      originalReferenceId: action.referenceId,
      bankStatementText,
      originalBankStatementText: bankStatementText || state.originalBankStatementText,
    },
  };
};

const loadSupplierExpenseAccount = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    expenseAccountId: action.response.expenseAccountId,
    lines: state.spendMoney.lines.length > 0
      ? updateAllLinesWithExpenseAccount(
        state.spendMoney.lines,
        state.accounts,
        action.response.expenseAccountId,
      )
      : state.spendMoney.lines,
  },
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setSupplierBlockingState = (state, action) => ({
  ...state,
  isSupplierBlocking: action.isSupplierBlocking,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
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
  spendMoney: {
    ...state.spendMoney,
    lines: state.spendMoney.lines.map((line, index) => {
      const { amount } = lines[index];
      return {
        ...line,
        amount: amount.valueOf(),
      };
    }),
  },
  totals: {
    ...state.totals,
    subTotal: formatCurrency(totals.subTotal.valueOf()),
    totalTax: formatCurrency(totals.totalTax.valueOf()),
    totalAmount: formatCurrency(totals.totalAmount.valueOf()),
  },
});

const resetTotals = state => ({
  ...state,
  totals: getDefaultState().totals,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const isMoreThan10MB = size => size > 10000000;

const buildAttachmentState = size => (
  isMoreThan10MB(size) ? { state: 'failed', error: 'File is more than 10MB' } : { state: 'queued' }
);

const addAttachments = (state, { files }) => ({
  ...state,
  attachments: [
    ...state.attachments,
    ...files.map(file => ({
      name: file.name,
      size: file.size,
      ...buildAttachmentState(file.size),
      file,
    })),
  ],
});

const updateAttachment = (state, file, partialAttachment) => ({
  ...state,
  attachments: state.attachments.map(attachment => (
    attachment.file === file ? { ...attachment, ...partialAttachment } : attachment
  )),
});

const uploadAttachment = (state, { id, name, file }) => (
  updateAttachment(state, file, { id, name, state: 'finished' })
);

const uploadAttachmentFailed = (state, { message, file }) => (
  updateAttachment(state, file, { error: message, state: 'failed' })
);

const uploadAttachmentProgress = (state, { file, uploadProgress }) => (
  updateAttachment(state, file, { state: 'loading', uploadProgress })
);

const setOperationInProgressState = (state, { id, isInProgress }) => ({
  ...state,
  attachments: state.attachments.map(attachment => (
    attachment.id === id ? { ...attachment, isInProgress } : attachment
  )),
});

const openRemoveAttachmentModal = (state, { id, modal }) => ({
  ...state,
  pendingDeleteId: id,
  modal: {
    ...state.modal,
    ...modal,
  },
});

const removeAttachmentByIndex = (state, { index }) => ({
  ...state,
  attachments: state.attachments.filter((attachment, i) => index !== i),
});

const removeAttachment = (state, { id }) => ({
  ...state,
  attachments: state.attachments.filter(attachment => attachment.id !== id),
});

const appendAlert = (state, { message }) => {
  if (state.alert) {
    return {
      ...state,
      alert: {
        ...state.alert,
        message: `${state.alert.message}; ${message}`,
      },
    };
  }
  return {
    ...state,
    alert: {
      type: 'danger',
      message,
    },
  };
};

const setShowSplitView = (state, { showSplitView }) => ({
  ...state,
  showSplitView,
});

const setInTrayDocumentUrl = (state, { inTrayDocumentUrl }) => ({
  ...state,
  inTrayDocument: {
    ...state.inTrayDocument,
    url: inTrayDocumentUrl,
  },
});

const clearInTrayDocumentUrl = state => ({
  ...state,
  inTrayDocument: {
    ...state.inTrayDocument,
    url: undefined,
  },
});

const getPrefilledLineFromInTray = (state, prefilledLine, expenseAccountId) => ({
  ...state.newLine,
  amount: prefilledLine.amount,
  description: prefilledLine.description || state.newLine.description,
  accountId: expenseAccountId || state.newLine.accountId,
  taxCodeId: expenseAccountId
    ? getDefaultTaxCodeId({ accountId: expenseAccountId, accounts: state.accounts })
    : state.newLine.taxCodeId,
  prefillStatus: {
    description: Boolean(prefilledLine.description),
    amount: Boolean(prefilledLine.amount),
  },
});

const prefillDataFromInTray = (state, action) => {
  const { spendMoney, document } = action.response;
  const {
    selectedPayToContactId,
    description,
    date,
    isTaxInclusive,
    originalExpenseAccountId,
    expenseAccountId,
    lines,
  } = state.spendMoney;
  return {
    ...state,
    isPageEdited: true,
    spendMoney: {
      ...state.spendMoney,
      selectedPayToContactId: spendMoney.selectedPayToContactId || selectedPayToContactId,
      description: spendMoney.description || description,
      date: spendMoney.date || date,
      isTaxInclusive: spendMoney.isTaxInclusive || isTaxInclusive,
      originalExpenseAccountId: spendMoney.expenseAccountId || originalExpenseAccountId,
      expenseAccountId: spendMoney.expenseAccountId || expenseAccountId,
      lines: spendMoney.lines
        ? spendMoney.lines.map(
          line => getPrefilledLineFromInTray(state, line, spendMoney.expenseAccountId),
        )
        : lines,
    },
    inTrayDocument: {
      ...state.inTrayDocument,
      ...document,
    },
    prefillStatus: {
      selectedPayToContactId: Boolean(spendMoney.selectedPayToContactId),
      description: Boolean(spendMoney.description),
      date: Boolean(spendMoney.date),
      isTaxInclusive: Boolean(spendMoney.isTaxInclusive),
    },
    showPrefillInfo: true,
  };
};

const hidePrefillInfo = state => ({
  ...state,
  showPrefillInfo: false,
});

const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accounts: [account, ...state.accounts],
  isPageEdited: true,
});

const contactIsSupplier = ({ contactType }) => contactType === 'Supplier';
const loadContactAfterCreate = (state, {
  intent, expenseAccountId, contactId, ...rest
}) => {
  if (getIsCreating(state) && contactIsSupplier(rest)) {
    return {
      ...state,
      spendMoney: {
        ...state.spendMoney,
        selectedPayToContactId: contactId,
        payToContacts: [rest, ...state.spendMoney.payToContacts],
        expenseAccountId,
        lines: state.spendMoney.lines.length > 0
          ? updateAllLinesWithExpenseAccount(
            state.spendMoney.lines,
            state.accounts,
            expenseAccountId,
          )
          : state.spendMoney.lines,
      },
    };
  }

  return {
    ...state,
    spendMoney: {
      ...state.spendMoney,
      selectedPayToContactId: contactId,
      payToContacts: [rest, ...state.spendMoney.payToContacts],
    },
  };
};

const resetBankStatementText = (state, { value }) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    bankStatementText: !value ? state.spendMoney.originalBankStatementText : value,
  },
  isPageEdited: true,
});

const updateBankStatementText = (state) => {
  const bankStatementText = getBankStatementText(state, state.spendMoney.referenceId);

  return {
    ...state,
    spendMoney: {
      ...state.spendMoney,
      bankStatementText,
      originalBankStatementText: bankStatementText || state.spendMoney.originalBankStatementText,
    },
    isPageEdited: true,
  };
};

const setDuplicateId = (state, action) => ({
  ...state,
  duplicateId: action.duplicateId,
});

const setPrefillNew = (state, action) => ({
  ...state,
  selectedBankAccountId: action.selectedBankAccountId,
  selectedDate: action.selectedDate,
});

const setPrefillInTrayDocumentId = (state, action) => ({
  ...state,
  inTrayDocumentId: action.inTrayDocumentId,
});

const handlers = {
  [UPDATE_SPEND_MONEY_HEADER]: updateHeader,
  [LOAD_NEW_SPEND_MONEY]: loadNewSpendMoney,
  [LOAD_SPEND_MONEY_DETAIL]: loadSpendMoneyDetail,
  [LOAD_NEW_DUPLICATE_SPEND_MONEY]: loadSpendMoneyDetail,
  [GET_TAX_CALCULATIONS]: getTaxCalculations,
  [LOAD_REFERENCE_ID]: loadReferenceId,
  [LOAD_SUPPLIER_EXPENSE_ACCOUNT]: loadSupplierExpenseAccount,
  [UPDATE_SPEND_MONEY_LINE]: updateLine,
  [ADD_SPEND_MONEY_LINE]: addLine,
  [DELETE_SPEND_MONEY_LINE]: deleteLine,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_SUPPLIER_BLOCKING_STATE]: setSupplierBlockingState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [RESET_TOTALS]: resetTotals,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [ADD_ATTACHMENTS]: addAttachments,
  [UPLOAD_ATTACHMENT]: uploadAttachment,
  [UPDATE_UPLOAD_PROGRESS]: uploadAttachmentProgress,
  [UPLOAD_ATTACHMENT_FAILED]: uploadAttachmentFailed,
  [OPEN_REMOVE_ATTACHMENT_MODAL]: openRemoveAttachmentModal,
  [REMOVE_ATTACHMENT_BY_INDEX]: removeAttachmentByIndex,
  [REMOVE_ATTACHMENT]: removeAttachment,
  [APPEND_ALERT_MESSAGE]: appendAlert,
  [SET_OPERATION_IN_PROGRESS_STATE]: setOperationInProgressState,
  [SET_SHOW_SPLIT_VIEW]: setShowSplitView,
  [SET_IN_TRAY_DOCUMENT_URL]: setInTrayDocumentUrl,
  [CLEAR_IN_TRAY_DOCUMENT_URL]: clearInTrayDocumentUrl,
  [PREFILL_DATA_FROM_IN_TRAY]: prefillDataFromInTray,
  [HIDE_PREFILL_INFO]: hidePrefillInfo,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [LOAD_CONTACT_AFTER_CREATE]: loadContactAfterCreate,
  [RESET_BANK_STATEMENT_TEXT]: resetBankStatementText,
  [UPDATE_BANK_STATEMENT_TEXT]: updateBankStatementText,
  [SET_DUPLICATE_ID]: setDuplicateId,
  [SET_PREFILL_NEW]: setPrefillNew,
  [SET_PREFILL_INTRAY_DOCUMENT_ID]: setPrefillInTrayDocumentId,
};
const spendMoneyReducer = createReducer(getDefaultState(), handlers);

export default spendMoneyReducer;
