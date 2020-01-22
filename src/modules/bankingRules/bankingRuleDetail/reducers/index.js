import {
  CLOSE_MODAL,
  LOAD_BANKING_RULE,
  LOAD_NEW_BANKING_RULE,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_IS_PAGE_EDITED,
  SET_LOADING_STATE,
  UPDATE_FORM,
} from '../BankingRuleDetailIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../../SystemIntents';
import allocationHandlers from './allocationHandlers';
import conditionHandlers from './conditionHandlers';
import createReducer from '../../../../store/createReducer';
import getDefaultState from './getDefaultState';

const resetState = () => (getDefaultState());

const setInitalState = (state, action) => ({
  ...getDefaultState(),
  businessId: action.context.businessId,
  bankingRuleId: action.context.bankingRuleId,
  region: action.context.region,
  ruleType: action.context.ruleType ? action.context.ruleType : state.ruleType,
});

const loadBankingRuleDetail = (state, action) => ({
  ...state,
  ...action.bankingRule,
});

const isContact = key => key === 'contactId';
const updateContactId = (state, action) => {
  const contact = state.contacts.find(({ id }) => id === action.value);

  return {
    ...state,
    contactId: contact.id,
    isPaymentReportable: contact.isPaymentReportable,
  };
};
const updateForm = (state, action) => {
  if (action.key === 'allocationType') {
    return {
      ...state,
      [action.key]: action.value,
      allocations: [],
    };
  }

  if (isContact(action.key)) {
    return updateContactId(state, action);
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
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitalState,
  [SET_LOADING_STATE]: setLoadingState,
  [CLOSE_MODAL]: closeModal,
  [OPEN_MODAL]: openModal,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [SET_IS_PAGE_EDITED]: setIsPagedEdited,
  [UPDATE_FORM]: updateForm,
  [LOAD_NEW_BANKING_RULE]: loadBankingRuleDetail,
  [LOAD_BANKING_RULE]: loadBankingRuleDetail,
  ...allocationHandlers,
  ...conditionHandlers,
};

const bankingRuleDetailReducer = createReducer(getDefaultState(), handlers);

export default bankingRuleDetailReducer;
