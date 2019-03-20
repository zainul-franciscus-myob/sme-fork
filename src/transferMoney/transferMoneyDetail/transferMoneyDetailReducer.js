import dateFormat from 'dateformat';

import {
  CLOSE_MODAL,
  FORMAT_AMOUNT,
  LOAD_NEW_TRANSFER_MONEY,
  LOAD_TRANSFER_MONEY_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_FORM,
} from '../TransferMoneyIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  transferMoney: {
    referenceId: '',
    originalReferenceId: '',
    date: '',
    amount: '',
    selectedTransferFromAccountId: '',
    selectedTransferToAccountId: '',
    description: '',
    accounts: [],
  },
  isSubmitting: false,
  isPageEdited: false,
  isLoading: true,
  modalType: '',
  alertMessage: '',
  businessId: '',
  region: '',
});

const pageEdited = { isPageEdited: true };
const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');
const isDateOptionChange = filterName => filterName === 'date';
const formatStringNumber = num => parseFloat(num).toFixed(2).toString();

const loadTransferMoneyDetail = (state, { transferMoney }) => ({
  ...state,
  transferMoney: {
    ...state.transferMoney,
    ...transferMoney,
    date: convertToDateString(Date.now()),
    originalReferenceId: transferMoney.referenceId,
  },
  isLoading: false,
});

const loadNewTransferMoney = (state, { transferMoney }) => ({
  ...state,
  transferMoney: {
    ...state.transferMoney,
    ...transferMoney,
    date: convertToDateString(Date.now()),
    originalReferenceId: transferMoney.referenceId,
  },
  isLoading: false,
});

const updateForm = (state, action) => ({
  ...state,
  ...pageEdited,
  transferMoney: {
    ...state.transferMoney,
    [action.key]: isDateOptionChange(action.key)
      ? convertToDateString(action.value)
      : action.value,
  },
});

const formatAmount = state => ({
  ...state,
  transferMoney: {
    ...state.transferMoney,
    amount: formatStringNumber(state.transferMoney.amount),
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

const resetState = () => (getDefaultState());

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_TRANSFER_MONEY_DETAIL]: loadTransferMoneyDetail,
  [LOAD_NEW_TRANSFER_MONEY]: loadNewTransferMoney,
  [UPDATE_FORM]: updateForm,
  [FORMAT_AMOUNT]: formatAmount,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
};

const transferMoneyReducer = createReducer(getDefaultState(), handlers);

export default transferMoneyReducer;
