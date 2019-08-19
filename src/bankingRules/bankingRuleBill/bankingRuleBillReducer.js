import {
  LOAD_BANKING_RULE_BILL,
  LOAD_NEW_BANKING_RULE_BILL,
  SET_ALERT_MESSAGE,
  SET_IS_PAGE_EDITED,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  UPDATE_FORM,
} from './BankingRuleBillIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  bankingRuleId: '',
  region: '',
  title: '',
  name: '',
  isInactiveRule: false,
  applyToAllAccounts: '',
  accountId: '',
  supplierId: '',
  conditions: {
    containsWords: {
      id: undefined,
      value: '',
    },
    exactWords: {
      id: undefined,
      value: '',
    },
  },
  bankAccounts: [],
  suppliers: [],
  isLoading: false,
  isPageEdited: false,
  alertMessage: '',
  modalType: '',
});

const resetState = () => (getDefaultState());

const setInitalState = (state, action) => ({
  ...getDefaultState(),
  businessId: action.context.businessId,
  bankingRuleId: action.context.bankingRuleId,
  region: action.context.region,
});

const loadBankingRuleBill = (state, action) => ({
  ...state,
  ...action.bankingRule,
});

const updateForm = (state, action) => {
  if (action.key === 'exactWords' || action.key === 'containsWords') {
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

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setModalType = (state, action) => ({
  ...state,
  modalType: action.modalType,
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
  [SET_MODAL_TYPE]: setModalType,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [SET_IS_PAGE_EDITED]: setIsPagedEdited,
  [LOAD_NEW_BANKING_RULE_BILL]: loadBankingRuleBill,
  [LOAD_BANKING_RULE_BILL]: loadBankingRuleBill,
  [UPDATE_FORM]: updateForm,
};

const bankingRuleBillReducer = createReducer(getDefaultState(), handlers);

export default bankingRuleBillReducer;
