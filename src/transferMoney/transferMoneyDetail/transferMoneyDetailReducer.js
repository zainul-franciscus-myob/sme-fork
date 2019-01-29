import dateFormat from 'dateformat';

import SystemIntents from '../../SystemIntents';
import TransferMoneyIntents from '../TransferMoneyIntents';
import createReducer from '../../store/createReducer';

const initialState = {
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
};

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

const resetState = () => (initialState);

const handlers = {
  [TransferMoneyIntents.SET_LOADING_STATE]: setLoadingState,
  [TransferMoneyIntents.LOAD_TRANSFER_MONEY_DETAIL]: loadTransferMoneyDetail,
  [TransferMoneyIntents.LOAD_NEW_TRANSFER_MONEY]: loadNewTransferMoney,
  [TransferMoneyIntents.UPDATE_FORM]: updateForm,
  [TransferMoneyIntents.FORMAT_AMOUNT]: formatAmount,
  [TransferMoneyIntents.SET_SUBMITTING_STATE]: setSubmittingState,
  [TransferMoneyIntents.SET_ALERT_MESSAGE]: setAlertMessage,
  [TransferMoneyIntents.OPEN_MODAL]: openModal,
  [TransferMoneyIntents.CLOSE_MODAL]: closeModal,
  [SystemIntents.RESET_STATE]: resetState,
};

const transferMoneyReducer = createReducer(initialState, handlers);

export default transferMoneyReducer;
