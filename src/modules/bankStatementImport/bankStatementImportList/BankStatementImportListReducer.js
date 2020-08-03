import {
  DELETE_BANK_STATEMENT,
  IMPORT_BANK_STATEMENT,
  LOAD_BANK_STATEMENT_IMPORT_LIST,
  RESET_FILTER_BAR_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_PENDING_DELETE_ID,
  SET_SORT_ORDER,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
  UPDATE_IMPORT_MODAL,
} from '../BankStatementImportIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalTypes from './ModalTypes';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  alert: undefined,
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  isSubmitting: false,
  filterOptions: {
    accountId: '',
  },
  sortOrder: 'desc',
  orderBy: 'ImportedDate',
  entries: [],
  businessId: '',
  region: '',
  modalType: undefined,
  importModal: undefined,
  pendingDeleteId: '',
});

const loadBankStatementImportList = (
  state,
  { accountOptions, filterOptions, entries }
) => ({
  ...state,
  accountOptions,
  filterOptions,
  entries,
});

const updateFilterBarOptions = (state, { key, value }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [key]: value,
  },
});

const resetFilterBarOptions = (state) => ({
  ...state,
  filterOptions: getDefaultState().filterOptions,
});

const sortAndFilterBankStatementImportList = (state, { entries }) => ({
  ...state,
  entries,
});

const setTableLoadingState = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const setSubmittingState = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const setSortOrder = (state, { orderBy, sortOrder }) => ({
  ...state,
  orderBy,
  sortOrder,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setInitalState = (state, { context }) => ({
  ...state,
  ...context,
});

const setModalType = (state, { modalType }) => ({
  ...state,
  modalType,
  importModal:
    modalType === ModalTypes.IMPORT
      ? {
          accountId: state.filterOptions.accountId,
        }
      : undefined,
});

const updateImportModal = (state, { key, value }) => ({
  ...state,
  importModal: {
    ...state.importModal,
    [key]: value,
  },
});

const importBankStatement = (state) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    accountId: state.importModal.accountId,
  },
});

const setPendingDeleteId = (state, { id }) => ({
  ...state,
  pendingDeleteId: id,
});

const deleteBankStatement = (state) => ({
  ...state,
  pendingDeleteId: '',
  entries: state.entries.filter((entry) => entry.id !== state.pendingDeleteId),
});

const resetState = () => getDefaultState();

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitalState,
  [RESET_STATE]: resetState,
  [LOAD_BANK_STATEMENT_IMPORT_LIST]: loadBankStatementImportList,
  [UPDATE_FILTER_BAR_OPTIONS]: updateFilterBarOptions,
  [RESET_FILTER_BAR_OPTIONS]: resetFilterBarOptions,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST]: sortAndFilterBankStatementImportList,
  [SET_ALERT]: setAlert,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_MODAL_TYPE]: setModalType,
  [UPDATE_IMPORT_MODAL]: updateImportModal,
  [IMPORT_BANK_STATEMENT]: importBankStatement,
  [SET_PENDING_DELETE_ID]: setPendingDeleteId,
  [DELETE_BANK_STATEMENT]: deleteBankStatement,
  [SET_SUBMITTING_STATE]: setSubmittingState,
};

const bankStatementImportListReducer = createReducer(
  getDefaultState(),
  handlers
);

export default bankStatementImportListReducer;
