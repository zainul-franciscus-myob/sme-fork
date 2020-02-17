import {
  CLOSE_MODAL,
  LOAD_NEW_TRANSFER_MONEY,
  LOAD_TRANSFER_MONEY_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_FORM,
} from '../TransferMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  transferMoneyId: '',
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
  loadingState: LoadingState.LOADING,
  modal: undefined,
  alertMessage: '',
  businessId: '',
  region: '',
});

const pageEdited = { isPageEdited: true };

const loadTransferMoneyDetail = (state, { transferMoney }) => ({
  ...state,
  transferMoney: {
    ...state.transferMoney,
    ...transferMoney,
    originalReferenceId: transferMoney.referenceId,
  },
});

const loadNewTransferMoney = (state, { transferMoney }) => ({
  ...state,
  transferMoney: {
    ...state.transferMoney,
    ...transferMoney,
    date: formatIsoDate(new Date()),
    originalReferenceId: transferMoney.referenceId,
  },
});

const updateForm = (state, action) => ({
  ...state,
  ...pageEdited,
  transferMoney: {
    ...state.transferMoney,
    [action.key]: action.value,
  },
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
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
};

const transferMoneyReducer = createReducer(getDefaultState(), handlers);

export default transferMoneyReducer;
