import {
  ADD_RECEIVE_MONEY_LINE,
  CLOSE_MODAL,
  DELETE_RECEIVE_MONEY_LINE,
  GET_TAX_CALCULATIONS,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_CONTACT_OPTIONS,
  LOAD_DUPLICATE_RECEIVE_MONEY,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
  OPEN_MODAL,
  RESET_TOTALS,
  SET_ALERT,
  SET_CONTACT_LOADING_STATE,
  SET_CONTACT_OPTIONS_LOADING_STATE,
  SET_DUPLICATE_ID,
  SET_JOB_LOADING_STATE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
  UPDATE_RECEIVE_MONEY_HEADER,
  UPDATE_RECEIVE_MONEY_LINE,
} from '../ReceiveMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getDefaultTaxCodeId,
  getUpdatedContactOptions,
} from './selectors/receiveMoneyDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  receiveMoney: {
    id: '',
    referenceId: '',
    originalReferenceId: '',
    date: '',
    isTaxInclusive: false,
    isReportable: false,
    description: '',
    selectedDepositIntoAccountId: '',
    selectedPayFromContactId: '',
    lines: [],
  },
  receiveMoneyId: '', // the 'id' extracted from the URL
  duplicateId: '',
  newLine: {
    accountId: '',
    amount: '',
    units: '',
    jobId: '',
    description: '',
    taxCodeId: '',
    lineJobOptions: [],
  },
  totals: {
    subTotal: '$0.00',
    totalTax: '$0.00',
    totalAmount: '$0.00',
  },
  depositIntoAccountOptions: [],
  payFromContactOptions: {
    pagination: {
      hasNextPage: false,
      offset: 0,
    },
    preSelectedIds: [],
    entries: [],
  },
  accountOptions: [],
  jobOptions: [],
  taxCodeOptions: [],
  modal: undefined,
  alertMessage: '',
  alert: undefined,
  loadingState: LoadingState.LOADING,
  isContactLoading: false,
  isContactOptionsLoading: true,
  pageTitle: '',
  isSubmitting: false,
  isLineEdited: false,
  isPageEdited: false,
  businessId: '',
  region: '',
  isJobLoading: false,
  startOfFinancialYearDate: '',
  viewedAccountToolTip: false,
});

const pageEdited = { isPageEdited: true };

const resetState = () => getDefaultState();

const buildLineJobOptions = ({ action, jobId }) =>
  action.jobOptions
    ? action.jobOptions.filter((job) => job.isActive || job.id === jobId)
    : [];

const loadReceiveMoneyDetail = (state, action) => ({
  ...state,
  receiveMoney: {
    ...state.receiveMoney,
    ...action.receiveMoney,
    originalReferenceId: action.receiveMoney.referenceId,
    lines: action.receiveMoney.lines.map((line) => ({
      ...line,
      lineJobOptions: buildLineJobOptions({ action, jobId: line.jobId }),
    })),
  },
  newLine: {
    ...state.newLine,
    ...action.newLine,
    lineJobOptions: buildLineJobOptions({ action }),
  },
  totals: action.totals,
  pageTitle: action.pageTitle,
  depositIntoAccountOptions: action.depositIntoAccountOptions,
  payFromContactOptions: action.payFromContactOptions
    ? {
        ...state.payFromContactOptions,
        preSelectedIds: action.payFromContactOptions.preSelectedIds,
        entries: action.payFromContactOptions.entries,
      }
    : state.payFromContactOptions,
  accountOptions: action.accountOptions,
  jobOptions: action.jobOptions,
  taxCodeOptions: action.taxCodeOptions,
  startOfFinancialYearDate: action.startOfFinancialYearDate,
});

const updateLine = (state, action) => ({
  ...state,
  ...pageEdited,
  isLineEdited: action.lineKey === 'amount',
  receiveMoney: {
    ...state.receiveMoney,
    lines: state.receiveMoney.lines.map((line, index) => {
      if (index === action.lineIndex) {
        return {
          ...line,
          taxCodeId:
            action.lineKey === 'accountId'
              ? getDefaultTaxCodeId({
                  accountId: action.lineValue,
                  accountOptions: state.accountOptions,
                })
              : line.taxCodeId,
          [action.lineKey]: action.lineValue,
        };
      }
      return line;
    }),
  },
});

const addLine = (state) => ({
  ...state,
  ...pageEdited,
  receiveMoney: {
    ...state.receiveMoney,
    lines: [...state.receiveMoney.lines, state.newLine],
  },
});

const deleteLine = (state, action) => ({
  ...state,
  ...pageEdited,
  receiveMoney: {
    ...state.receiveMoney,
    lines: state.receiveMoney.lines.filter(
      (item, index) => index !== action.index
    ),
  },
});

const updateHeader = (state, action) => ({
  ...state,
  ...pageEdited,
  receiveMoney: {
    ...state.receiveMoney,
    [action.key]: action.value,
  },
});

const loadNewReceiveMoney = (state, action) => ({
  ...state,
  receiveMoney: {
    ...state.receiveMoney,
    ...action.receiveMoney,
    date: formatIsoDate(new Date()),
    originalReferenceId: action.receiveMoney.referenceId,
  },
  newLine: {
    ...state.newLine,
    ...action.newLine,
    lineJobOptions: buildLineJobOptions({ action }),
  },
  pageTitle: action.pageTitle,
  depositIntoAccountOptions: action.depositIntoAccountOptions,
  accountOptions: action.accountOptions,
  jobOptions: action.jobOptions,
  taxCodeOptions: action.taxCodeOptions,
  startOfFinancialYearDate: action.startOfFinancialYearDate,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlert = (state, { alert }) => ({ ...state, alert });

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const closeModal = (state) => ({
  ...state,
  modal: undefined,
});

const getTaxCalculations = (state, action) => ({
  ...state,
  isLineEdited: false,
  receiveMoney: {
    ...state.receiveMoney,
    lines: action.lines.map((line) => ({
      ...line,
      amount: line.amount.valueOf(),
    })),
  },
  totals: action.totals,
});

const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accountOptions: [account, ...state.accountOptions],
  isPageEdited: true,
});

const setContactLoadingState = (state, { isContactLoading }) => ({
  ...state,
  isContactLoading,
});

const loadContactAfterCreate = (state, { intent, ...contact }) => ({
  ...state,
  receiveMoney: {
    ...state.receiveMoney,
    selectedPayFromContactId: contact.id,
  },
  payFromContactOptions: {
    ...state.payFromContactOptions,
    preSelectedIds: [...state.payFromContactOptions.preSelectedIds, contact.id],
    entries: getUpdatedContactOptions(state, contact),
  },
  isPageEdited: true,
});

const setContactOptionsLoadingState = (state, { isLoading }) => ({
  ...state,
  isContactOptionsLoading: isLoading,
});

const loadContactOptions = (state, { pagination, entries }) => ({
  ...state,
  payFromContactOptions: {
    ...state.payFromContactOptions,
    pagination,
    entries: [
      ...state.payFromContactOptions.entries,
      ...entries.filter(
        (option) =>
          !state.payFromContactOptions.preSelectedIds.includes(option.id)
      ),
    ],
  },
});

const loadJobAfterCreate = (state, { intent, ...job }) => ({
  ...state,
  receiveMoney: {
    ...state.receiveMoney,
    lines: state.receiveMoney.lines.map((line) => ({
      ...line,
      lineJobOptions: [job, ...line.lineJobOptions],
    })),
  },
  newLine: {
    ...state.newLine,
    lineJobOptions: [job, ...state.newLine.lineJobOptions],
  },
  isPageEdited: true,
});

const setJobLoadingState = (state, { isJobLoading }) => ({
  ...state,
  isJobLoading,
});

const resetTotals = (state) => ({
  ...state,
  totals: getDefaultState().totals,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setDuplicateId = (state, action) => ({
  ...state,
  duplicateId: action.duplicateId,
});

const setViewedAccountToolTipState = (state, { viewedAccountToolTip }) => ({
  ...state,
  viewedAccountToolTip,
});

const handlers = {
  [LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
  [LOAD_NEW_RECEIVE_MONEY]: loadNewReceiveMoney,
  [LOAD_DUPLICATE_RECEIVE_MONEY]: loadReceiveMoneyDetail,
  [GET_TAX_CALCULATIONS]: getTaxCalculations,
  [UPDATE_RECEIVE_MONEY_HEADER]: updateHeader,
  [UPDATE_RECEIVE_MONEY_LINE]: updateLine,
  [ADD_RECEIVE_MONEY_LINE]: addLine,
  [DELETE_RECEIVE_MONEY_LINE]: deleteLine,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [RESET_TOTALS]: resetTotals,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [SET_CONTACT_LOADING_STATE]: setContactLoadingState,
  [LOAD_CONTACT_AFTER_CREATE]: loadContactAfterCreate,
  [SET_CONTACT_OPTIONS_LOADING_STATE]: setContactOptionsLoadingState,
  [LOAD_CONTACT_OPTIONS]: loadContactOptions,
  [LOAD_JOB_AFTER_CREATE]: loadJobAfterCreate,
  [SET_JOB_LOADING_STATE]: setJobLoadingState,
  [SET_DUPLICATE_ID]: setDuplicateId,
  [SET_VIEWED_ACCOUNT_TOOL_TIP_STATE]: setViewedAccountToolTipState,
};
const receiveMoneyReducer = createReducer(getDefaultState(), handlers);

export default receiveMoneyReducer;
