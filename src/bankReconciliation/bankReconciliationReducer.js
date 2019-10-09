import {
  CLOSE_MODAL,
  FORMAT_AMOUNT,
  LOAD_BANK_RECONCILIATION,
  OPEN_MODAL,
  SELECT_ALL,
  SELECT_ROW,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_RECONCILIATION,
  UPDATE_HEADER_OPTION,
  UPDATE_RESULT,
} from './BankReconciliationIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import { getIsAllSelected } from './BankReconciliationSelectors';
import createReducer from '../store/createReducer';
import formatIsoDate from '../valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  isLoading: true,
  isTableLoading: false,
  isSubmitting: false,
  isModalActive: false,
  alert: undefined,
  statementDate: formatIsoDate(new Date()),
  selectedAccountId: '',
  closingBankStatementBalance: '',
  calculatedClosingBalance: 0,
  lastReconcileDate: '',
  entries: [],
  accounts: [],
});

const resetState = () => (getDefaultState());

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const loadBankReconciliation = (state, { intent, ...rest }) => ({
  ...state,
  ...rest,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const openModal = state => ({
  ...state,
  isModalActive: true,
});

const closeModal = state => ({
  ...state,
  isModalActive: false,
});

const updateHeaderOption = (state, action) => ({
  ...state,
  [action.key]: action.value,
});

const formatAmount = value => (Number(value) || 0).toFixed(2);
const updateAmount = (state, { key, value }) => ({
  ...state,
  [key]: formatAmount(value),
});

const getAdjustmentForRow = ({ withdrawal, deposit }, value) => {
  if (withdrawal === 0 || deposit === 0) {
    return 0;
  }
  return value ? (-withdrawal || deposit) : (withdrawal || -deposit);
};
const selectRow = (state, { index, value }) => {
  const balanceAdjustment = getAdjustmentForRow(state.entries[index], value);

  return {
    ...state,
    calculatedClosingBalance: state.calculatedClosingBalance + balanceAdjustment,
    entries: state.entries.map(
      (entry, i) => (
        i === index
          ? {
            ...entry,
            isChecked: value,
          }
          : entry
      ),
    ),
  };
};

const getAdjustmentForEntries = (entries, isSelect) => entries
  .reduce((total, entry) => total + getAdjustmentForRow(entry, isSelect), 0);

const selectAll = (state) => {
  const isAllSelected = getIsAllSelected(state);
  const entriesAffected = isAllSelected
    ? state.entries : state.entries.filter(entry => !entry.isChecked);
  const balanceAdjustment = getAdjustmentForEntries(entriesAffected, !isAllSelected);

  return {
    ...state,
    calculatedClosingBalance: state.calculatedClosingBalance + balanceAdjustment,
    entries: state.entries.map(entry => ({
      ...entry,
      isChecked: !isAllSelected,
    })),
  };
};

const flipSortOrder = sortOrder => (sortOrder === 'desc' ? 'asc' : 'desc');
const setSortOrder = (state, { orderBy }) => ({
  ...state,
  orderBy,
  sortOrder: orderBy === state.orderBy ? flipSortOrder(state.sortOrder) : 'asc',
});

const updateReconciliationResult = state => ({
  ...state,
  lastReconcileDate: formatIsoDate(new Date()),
  entries: state.entries.filter(entry => !entry.isChecked),
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_BANK_RECONCILIATION]: loadBankReconciliation,
  [SORT_AND_FILTER_BANK_RECONCILIATION]: loadBankReconciliation,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [UPDATE_HEADER_OPTION]: updateHeaderOption,
  [FORMAT_AMOUNT]: updateAmount,
  [SELECT_ROW]: selectRow,
  [SELECT_ALL]: selectAll,
  [SET_SORT_ORDER]: setSortOrder,
  [UPDATE_RESULT]: updateReconciliationResult,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const bankReconciliationDetailReducer = createReducer(getDefaultState(), handlers);

export default bankReconciliationDetailReducer;
