import {
  ADD_ATTACHMENTS,
  ADD_SPEND_MONEY_LINE,
  APPEND_ALERT_MESSAGE,
  CLOSE_MODAL,
  DELETE_SPEND_MONEY_LINE,
  FORMAT_SPEND_MONEY_LINE,
  GET_CALCULATED_TOTALS,
  LOAD_NEW_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SPEND_MONEY_DETAIL,
  OPEN_MODAL,
  OPEN_REMOVE_ATTACHMENT_MODAL,
  REMOVE_ATTACHMENT,
  REMOVE_ATTACHMENT_BY_INDEX,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_OPERATION_IN_PROGRESS_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_SPEND_MONEY_HEADER,
  UPDATE_SPEND_MONEY_LINE,
  UPDATE_UPLOAD_PROGRESS,
  UPLOAD_ATTACHMENT,
  UPLOAD_ATTACHMENT_FAILED,
} from '../SpendMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getDefaultTaxCodeId, getIsContactReportable, getIsReportable } from './spendMoneyDetailSelectors';
import createReducer from '../../store/createReducer';
import formatIsoDate from '../../valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  spendMoney: {
    id: '',
    referenceId: '',
    originalReferenceId: '',
    date: '',
    isTaxInclusive: false,
    isReportable: undefined,
    description: '',
    selectedPayFromAccountId: '',
    selectedPayToContactId: '',
    lines: [],
    payFromAccounts: [],
    payToContacts: [],
  },
  newLine: {
    accountId: '',
    amount: '',
    description: '',
    taxCodeId: '',
    taxAmount: '',
    accounts: [],
    taxCodes: [],
  },
  totals: {
    netAmount: '$0.00',
    totalTax: '$0.00',
    totalAmount: '$0.00',
  },
  modalType: '',
  alertMessage: '',
  isLoading: true,
  isSubmitting: false,
  isPageEdited: false,
  businessId: '',
  region: '',
  pageTitle: '',
  attachments: [],
});

const pageEdited = { isPageEdited: true };

const resetState = () => (getDefaultState());

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

const updateLine = (state, action) => ({
  ...state,
  ...pageEdited,
  spendMoney: {
    ...state.spendMoney,
    lines: getLinesForUpdate(action, state.spendMoney.lines),
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
        taxCodeId: getDefaultTaxCodeId({ ...state.newLine, ...action.line }),
      },
    ],
  },
});

const formatStringNumber = num => parseFloat(num).toFixed(2).toString();
const formatLine = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    lines: state.spendMoney.lines.map(
      ({ amount, ...line }, index) => (
        {
          amount: index === action.index && amount ? formatStringNumber(amount) : amount,
          ...line,
        }
      ),
    ),
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

const updateHeader = (state, { key, value }) => {
  const isReportable = key === 'selectedPayToContactId'
    ? getIsContactReportable(state, value)
    : getIsReportable(state);

  return ({
    ...state,
    ...pageEdited,
    spendMoney: {
      ...state.spendMoney,
      isReportable,
      [key]: value,
    },
  });
};

const loadNewSpendMoney = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    ...action.spendMoney,
    date: formatIsoDate(new Date()),
    originalReferenceId: action.spendMoney.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  isLoading: false,
  pageTitle: action.pageTitle,
});

const loadSpendMoneyDetail = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    ...action.spendMoney,
    originalReferenceId: action.spendMoney.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  totals: action.totals,
  isLoading: false,
  pageTitle: action.pageTitle,
  attachments: action.attachments,
});

const loadReferenceId = (state, action) => ({
  ...state,
  spendMoney: {
    ...state.spendMoney,
    referenceId: action.referenceId,
    originalReferenceId: action.referenceId,
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

const openRemoveAttachmentModal = (state, { id }) => ({
  ...state,
  modalType: 'deleteAttachment',
  pendingDeleteId: id,
});

const removeAttachmentByIndex = (state, { index }) => ({
  ...state,
  attachments: state.attachments.filter((attachment, i) => index !== i),
});

const removeAttachment = (state, { id }) => ({
  ...state,
  attachments: state.attachments.filter(attachment => attachment.id !== id),
});

const appendAlert = (state, { alertMessage }) => ({
  ...state,
  alertMessage: state.alertMessage ? `${state.alertMessage}; ${alertMessage}` : alertMessage,
});

const handlers = {
  [UPDATE_SPEND_MONEY_HEADER]: updateHeader,
  [LOAD_NEW_SPEND_MONEY]: loadNewSpendMoney,
  [LOAD_SPEND_MONEY_DETAIL]: loadSpendMoneyDetail,
  [GET_CALCULATED_TOTALS]: getCalculateTotals,
  [LOAD_REFERENCE_ID]: loadReferenceId,
  [UPDATE_SPEND_MONEY_LINE]: updateLine,
  [ADD_SPEND_MONEY_LINE]: addLine,
  [DELETE_SPEND_MONEY_LINE]: deleteLine,
  [FORMAT_SPEND_MONEY_LINE]: formatLine,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
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
};
const spendMoneyReducer = createReducer(getDefaultState(), handlers);

export default spendMoneyReducer;
