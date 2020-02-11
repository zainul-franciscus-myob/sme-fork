import {
  CLOSE_MODAL,
  FORMAT_AMOUNT,
  LOAD_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT,
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
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getIsAllSelected, getSelectedAccount } from './BankReconciliationSelectors';
import LoadingState from '../../components/PageView/LoadingState';
import createReducer from '../../store/createReducer';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  isSubmitting: false,
  alert: undefined,
  modal: undefined,
  statementDate: formatIsoDate(new Date()),
  selectedAccountId: '',
  closingBankStatementBalance: '',
  calculatedClosingBalance: 0,
  lastReconcileDate: '',
  entries: [],
  accounts: [],
});

const resetState = () => (getDefaultState());

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setInitialState = (state, action) => {
  const { bankAccount, ...rest } = action.context;

  return {
    ...state,
    ...rest,
    selectedAccountId: bankAccount || '',
  };
};

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

const openModal = (state, { modal }) => ({
  ...state,
  modal,
});

const closeModal = state => ({
  ...state,
  modal: undefined,
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

const getAdjustmentForRow = ({ withdrawal, deposit }, value, accountType) => {
  if (withdrawal === 0 || deposit === 0) {
    return 0;
  }
  const amount = (-1 * withdrawal) || deposit;

  const isNotLiability = accountType !== 'Liability';
  const accountModifier = isNotLiability ? 1 : -1;
  const valueModifier = value ? 1 : -1;

  return amount * accountModifier * valueModifier;
};
const selectRow = (state, { index, value }) => {
  const balanceAdjustment = getAdjustmentForRow(
    state.entries[index],
    value,
    getSelectedAccount(state).accountType,
  );

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

const getAdjustmentForEntries = (entries, isSelect, accountType) => entries
  .reduce((total, entry) => total + getAdjustmentForRow(entry, isSelect, accountType), 0);

const selectAll = (state) => {
  const isAllSelected = getIsAllSelected(state);
  const entriesAffected = isAllSelected
    ? state.entries : state.entries.filter(entry => !entry.isChecked);
  const balanceAdjustment = getAdjustmentForEntries(
    entriesAffected,
    !isAllSelected,
    getSelectedAccount(state).accountType,
  );

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
  lastReconcileDate: state.statementDate,
  entries: state.entries.filter(entry => !entry.isChecked),
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_BANK_RECONCILIATION]: loadBankReconciliation,
  [LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT]: loadBankReconciliation,
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
