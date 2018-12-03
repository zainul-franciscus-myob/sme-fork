import { getDefaultTaxCodeId } from './spendMoneySelectors';
import SpendMoneyIntents from './SpendMoneyIntents';
import SystemIntents from '../SystemIntents';

const initialState = {
  spendMoney: {
    id: '',
    referenceId: '',
    originalReferenceId: '',
    date: '',
    isTaxInclusive: false,
    isReportable: false,
    description: '',
    selectedPayFromAccount: '',
    selectedPayToContact: '',
    lines: [],
    payFromAccounts: [],
    payToContacts: [],
  },
  newLine: {
    accountId: '',
    amount: '',
    description: '',
    jobId: '',
    taxCodeId: '',
    taxAmount: '',
    jobs: [],
    accounts: [],
    taxCodes: [],
  },
  modalType: '',
  alertMessage: '',
  isLoading: true,
};

const spendMoneyReducer = (state = initialState, action) => {
  switch (action.intent) {
    case SystemIntents.RESET_STATE:
      return {
        ...initialState,
      };
    case SpendMoneyIntents.LOAD_NEW_SPEND_MONEY:
      return {
        ...state,
        spendMoney: { ...state.spendMoney, ...action.spendMoney },
        newLine: { ...state.newLine, ...action.newLine },
        isLoading: false,
      };
    case SpendMoneyIntents.OPEN_MODAL:
      return {
        ...state,
        modalType: action.modalType,
      };
    case SpendMoneyIntents.CLOSE_MODAL:
      return {
        ...state,
        modalType: '',
      };
    case SpendMoneyIntents.SET_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.alertMessage,
      };
    case SpendMoneyIntents.SET_LOADING_STATE:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
export default spendMoneyReducer;
