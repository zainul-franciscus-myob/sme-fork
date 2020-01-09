import {
  CLOSE_MODAL,
  LOAD_BANKING_RULE_INVOICE,
  LOAD_NEW_BANKING_RULE_INVOICE,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_IS_PAGE_EDITED,
  SET_LOADING_STATE,
  UPDATE_FORM,
} from './BankingRuleInvoiceIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  bankingRuleId: '',
  region: '',
  title: '',
  name: '',
  isInactiveRule: false,
  applyToAllAccounts: '',
  accountId: '',
  customerId: '',
  conditions: {
    containsWords: {
      id: undefined,
      value: '',
    },
    exactWords: {
      id: undefined,
      value: '',
    },
    equalAmounts: {
      id: undefined,
      value: '',
    },
  },
  bankAccounts: [],
  customers: [],
  loadingState: LoadingState.LOADING,
  isPageEdited: false,
  alertMessage: '',
  modal: undefined,
});

const resetState = () => (getDefaultState());

const setInitalState = (state, action) => ({
  ...getDefaultState(),
  businessId: action.context.businessId,
  bankingRuleId: action.context.bankingRuleId,
  region: action.context.region,
});

const loadBankingRuleInvoice = (state, action) => ({
  ...state,
  ...action.bankingRule,
});

const isCondition = key => ['exactWords', 'containsWords', 'equalAmounts'].includes(key);
const updateForm = (state, action) => {
  if (isCondition(action.key)) {
    return {
      ...state,
      conditions: {
        ...state.conditions,
        [action.key]: {
          ...state.conditions[action.key],
          value: action.value,
        },
      },
    };
  }

  return {
    ...state,
    [action.key]: action.value,
  };
};

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const closeModal = state => ({
  ...state,
  modal: undefined,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const setIsPagedEdited = state => ({
  ...state,
  isPageEdited: true,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitalState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [SET_IS_PAGE_EDITED]: setIsPagedEdited,
  [LOAD_NEW_BANKING_RULE_INVOICE]: loadBankingRuleInvoice,
  [LOAD_BANKING_RULE_INVOICE]: loadBankingRuleInvoice,
  [UPDATE_FORM]: updateForm,
};

const bankingRuleInvoiceReducer = createReducer(getDefaultState(), handlers);

export default bankingRuleInvoiceReducer;
