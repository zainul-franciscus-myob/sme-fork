import {
  LOAD_REMITTANCE_ADVICE_LIST,
  SELECT_ALL_REMITTANCE_ADVICE_LIST,
  SELECT_REMITTANCE_ADVICE,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SORT_AND_FILTER_REMITTANCE_ADVICE_LIST,
} from './RemittanceAdviceIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import LoadingState from '../../components/PageView/LoadingState';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  remittanceAdviceList: [],
  supplierOptions: [],
  alertMessage: '',
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  alert: undefined,
  sortOrder: 'desc',
  orderBy: 'paymentDate',
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadRemittanceAdviceList = (state, { payload }) => ({
  ...state,
  remittanceAdviceList: payload.remittanceAdviceList,
});

const selectRemittanceAdvice = (state, { id }) => ({
  ...state,
  remittanceAdviceList: state.remittanceAdviceList.map((remittanceAdvice) =>
    remittanceAdvice.id === id
      ? { ...remittanceAdvice, isSelected: !remittanceAdvice.isSelected }
      : remittanceAdvice
  ),
});

const areAllSelected = (entries) => entries.every((entry) => entry.isSelected);

const selectAllRemittanceAdvices = (state) => {
  const isSelected = !areAllSelected(state.remittanceAdviceList);
  return {
    ...state,
    remittanceAdviceList: state.remittanceAdviceList.map(
      (remittanceAdvice) => ({ ...remittanceAdvice, isSelected })
    ),
  };
};

const sortAndFilterRemittanceAdviceList = (state, { payload }) => ({
  ...state,
  remittanceAdviceList: payload.remittanceAdviceList,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const resetState = () => getDefaultState();

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_REMITTANCE_ADVICE_LIST]: loadRemittanceAdviceList,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [SELECT_REMITTANCE_ADVICE]: selectRemittanceAdvice,
  [SELECT_ALL_REMITTANCE_ADVICE_LIST]: selectAllRemittanceAdvices,
  [SORT_AND_FILTER_REMITTANCE_ADVICE_LIST]: sortAndFilterRemittanceAdviceList,
};

const remittanceAdviceListReducer = createReducer(getDefaultState(), handlers);

export default remittanceAdviceListReducer;
