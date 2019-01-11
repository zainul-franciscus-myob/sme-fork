import ReceiveMoneyIntents from '../ReceiveMoneyIntents';
import SystemIntents from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const initialState = {
  receiveMoney: {
    id: '',
    referenceId: '',
    originalReferenceId: '',
    date: '',
    isTaxInclusive: false,
    isReportable: false,
    description: '',
    selectedDepostiIntoAccountId: '',
    selectedPayFromContactId: '',
    lines: [],
    depostiIntoAccounts: [],
    payFromContacts: [],
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
    netAmount: '0.00',
    totalTax: '0.00',
    totalAmount: '0.00',
  },
  modalType: '',
  alertMessage: '',
  isLoading: true,
  isSubmitting: false,
  isPageEdited: false,
};

const resetState = () => (initialState);
const formatStringNumber = num => parseFloat(num).toFixed(2).toString();
const formatLine = (state, action) => ({
  ...state,
  receiveMoney: {
    ...state.receiveMoney,
    lines: state.receiveMoney.lines.map(
      ({ amount, ...line }, index) => (
        {
          amount: index === action.index && amount ? formatStringNumber(amount) : amount,
          ...line,
        }
      ),
    ),
  },
});

const loadReceiveMoneyDetail = (state, action) => ({
  ...state,
  receiveMoney: {
    ...state.receiveMoney,
    ...action.receiveMoney,
    originalReferenceId: action.receiveMoney.referenceId,
  },
  newLine: { ...state.newLine, ...action.newLine },
  totals: action.totals,
  isLoading: false,
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

const handlers = {
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_DETAIL]: loadReceiveMoneyDetail,
  [ReceiveMoneyIntents.FORMAT_RECEIVE_MONEY_LINE]: formatLine,
  [ReceiveMoneyIntents.SET_LOADING_STATE]: setLoadingState,
  [ReceiveMoneyIntents.SET_SUBMITTING_STATE]: setSubmittingState,
  [ReceiveMoneyIntents.SET_ALERT_MESSAGE]: setAlertMessage,
  [ReceiveMoneyIntents.OPEN_MODAL]: openModal,
  [ReceiveMoneyIntents.CLOSE_MODAL]: closeModal,
  [SystemIntents.RESET_STATE]: resetState,
};
const receiveMoneyReducer = createReducer(initialState, handlers);

export default receiveMoneyReducer;
