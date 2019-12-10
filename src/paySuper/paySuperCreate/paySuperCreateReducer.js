import { addDays, addMonths } from 'date-fns';

import {
  CLOSE_MODAL,
  LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
  OPEN_MODAL,
  SELECT_ALL_SUPER_PAYMENTS,
  SELECT_ITEM_SUPER_PAYMENT,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_SUPER_PAYMENTS,
  UPDATE_APPLIED_FILTER_OPTIONS,
  UPDATE_AUTHORISATION_CODE,
  UPDATE_AUTHORISATION_INFORMATION,
  UPDATE_BATCH_PAYMENT_ID,
  UPDATE_DETAIL_HEADER_FIELDS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SELECTED_ACCOUNT_ID,
} from './paySuperCreateIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addDays(addMonths(new Date(), -3), 1);

const getDefaultState = () => ({
  isLoading: true,
  isTableLoading: true,
  superPayments: [],
  selectedAccountId: '',
  orderBy: 'DateOccurred',
  paySuperDescription: '',
  referenceNumber: '',
  dateOfPayment: '',
  accounts: [],
  batchPaymentId: '',
  authorisationInfo: {
    authorisationId: '',
    authorisationEmail: '',
    authorisationCode: '',
  },
  filterOptions: {
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
  },
  appliedFilterOptions: {
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
  },
  sortOrder: 'desc',
  alert: undefined,
  modal: undefined,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadAccountsAndSuperPayments = (state, action) => ({
  ...state,
  accounts: action.response.accounts || [],
  referenceNumber: action.response.referenceNumber || '',
  paySuperDescription: action.response.paySuperDescription || '',
  dateOfPayment: action.response.dateOfPayment || '',
  superPayments: action.response.superPayments
    ? action.response.superPayments.map(e => ({
      ...e,
      isSelected: false,
    })) : [],
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
  },
});

const updateAppliedFilterOptions = (state, action) => ({
  ...state,
  appliedFilterOptions: {
    ...action.filterOptions,
  },
});

const updateSelectedAccountId = (state, action) => ({
  ...state,
  selectedAccountId: action.value,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const sortAndFilterSuperPayments = (state, action) => ({
  ...state,
  superPayments: action.entries,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
});

const selectAllSuperPayments = (state, action) => ({
  ...state,
  superPayments: state.superPayments.map(e => ({
    ...e,
    isSelected: action.isSelected,
  })),
});

const selectSuperPaymentItem = (state, action) => ({
  ...state,
  superPayments: state.superPayments.map(e => (
    e === action.item ? { ...action.item, isSelected: action.isSelected } : e
  )),
});

const updateDetailHeaderFields = (state, action) => ({
  ...state,
  [action.key]: action.value,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const resetState = () => (getDefaultState());

const updateBatchPaymentId = (state, { batchPaymentId }) => ({
  ...state,
  batchPaymentId,
});

const updateAuthorisationInfo = (state, { response }) => ({
  ...state,
  authorisationInfo: {
    ...state.authorisationInfo,
    authorisationId: response.authorisationId,
    authorisationEmail: response.authorisationEmail,
  },
});

const updateAuthorisationCode = (state, { authorisationCode }) => ({
  ...state,
  authorisationInfo: {
    ...state.authorisationInfo,
    authorisationCode,
  },
});

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const closeModal = state => ({
  ...state,
  modal: undefined,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_ALERT]: setAlert,
  [LOAD_ACCOUNTS_AND_SUPER_PAYMENTS]: loadAccountsAndSuperPayments,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [RESET_STATE]: resetState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [UPDATE_APPLIED_FILTER_OPTIONS]: updateAppliedFilterOptions,
  [UPDATE_SELECTED_ACCOUNT_ID]: updateSelectedAccountId,
  [SET_SORT_ORDER]: setSortOrder,
  [SORT_AND_FILTER_SUPER_PAYMENTS]: sortAndFilterSuperPayments,
  [SELECT_ALL_SUPER_PAYMENTS]: selectAllSuperPayments,
  [SELECT_ITEM_SUPER_PAYMENT]: selectSuperPaymentItem,
  [UPDATE_DETAIL_HEADER_FIELDS]: updateDetailHeaderFields,
  [UPDATE_BATCH_PAYMENT_ID]: updateBatchPaymentId,
  [UPDATE_AUTHORISATION_INFORMATION]: updateAuthorisationInfo,
  [UPDATE_AUTHORISATION_CODE]: updateAuthorisationCode,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const paySuperCreateReducer = createReducer(getDefaultState(), handlers);

export default paySuperCreateReducer;
