import {
  DELETE_BANK_FEED,
  LOAD_BANK_FEEDS,
  SET_ACCOUNT_TO_BE_DELETED,
  SET_ALERT,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_IS_TABLE_LOADING,
  SET_MODAL_TYPE,
  UPDATE_BANK_ACCOUNT_LINKED_ACCOUNT,
  UPDATE_CREDIT_CARD_LINKED_ACCOUNT,
} from './BankFeedsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import BankFeedTypes from './BankFeedTypes';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  alert: undefined,
  modalType: '',
  isLoading: false,
  isTableLoading: false,
  isSubmitting: false,
  region: '',
  businessId: '',
  serialNumber: '',
  bankFeeds: {
    bankAccounts: [],
    creditCards: [],
  },
  accountToBeDeleted: undefined,
});


const resetState = () => getDefaultState();

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setIsLoading = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setIsTableLoading = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setIsSubmitting = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setModalType = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const loadBankFeeds = (state, { bankFeeds, serialNumber }) => ({
  ...state,
  bankFeeds: {
    bankAccounts: bankFeeds.bankAccounts,
    creditCards: bankFeeds.creditCards,
  },
  serialNumber,
});

const updateBankAccountLinkedAccount = (state, action) => ({
  ...state,
  bankFeeds: {
    ...state.bankFeeds,
    bankAccounts: state.bankFeeds.bankAccounts.map(
      bankAccount => (bankAccount.id === action.key
        ? {
          ...bankAccount,
          linkedAccountId: action.value,
        } : bankAccount),
    ),
  },
});

const updateCreditCardLinkedAccount = (state, action) => ({
  ...state,
  bankFeeds: {
    ...state.bankFeeds,
    creditCards: state.bankFeeds.creditCards.map(
      creditCardAccount => (creditCardAccount.id === action.key
        ? {
          ...creditCardAccount,
          linkedAccountId: action.value,
        } : creditCardAccount),
    ),
  },
});

const setAccountToBeDeleted = (state, action) => ({
  ...state,
  accountToBeDeleted: {
    accountType: action.bankFeedAccountType,
    id: action.bankFeedId,
  },
});

const removeAccount = (accounts, id) => accounts.filter(account => account.id !== id);
const deleteBankFeed = (state) => {
  const accountTypeToBeDeleted = state.accountToBeDeleted.accountType;
  const accountIdToBeDeleted = state.accountToBeDeleted.id;

  const currentBankAccounts = state.bankFeeds.bankAccounts;
  const currentCreditCards = state.bankFeeds.creditCards;

  return {
    ...state,
    bankFeeds: {
      ...state.bankFeeds,
      bankAccounts: accountTypeToBeDeleted === BankFeedTypes.BANK_ACCOUNT
        ? removeAccount(currentBankAccounts, accountIdToBeDeleted)
        : currentBankAccounts,
      creditCards: accountTypeToBeDeleted === BankFeedTypes.CREDIT_CARD
        ? removeAccount(currentCreditCards, accountIdToBeDeleted)
        : currentCreditCards,
    },
  };
};

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_IS_LOADING]: setIsLoading,
  [SET_IS_TABLE_LOADING]: setIsTableLoading,
  [SET_IS_SUBMITTING]: setIsSubmitting,
  [SET_ALERT]: setAlert,
  [SET_MODAL_TYPE]: setModalType,
  [LOAD_BANK_FEEDS]: loadBankFeeds,
  [UPDATE_BANK_ACCOUNT_LINKED_ACCOUNT]: updateBankAccountLinkedAccount,
  [UPDATE_CREDIT_CARD_LINKED_ACCOUNT]: updateCreditCardLinkedAccount,
  [SET_ACCOUNT_TO_BE_DELETED]: setAccountToBeDeleted,
  [DELETE_BANK_FEED]: deleteBankFeed,
};

const bankFeedsReducer = createReducer(getDefaultState(), handlers);

export default bankFeedsReducer;
