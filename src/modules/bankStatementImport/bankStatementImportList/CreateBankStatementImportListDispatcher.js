import {
  DELETE_BANK_STATEMENT,
  IMPORT_BANK_STATEMENT,
  LOAD_BANK_STATEMENT_IMPORT_LIST,
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

const CreateBankStatementImportListDispatcher = store => ({
  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setInitialState: context => store.dispatch({
    intent: SET_INITIAL_STATE,
    context,
  }),

  setLoadingState: loadingState => store.dispatch({
    intent: SET_LOADING_STATE,
    loadingState,
  }),

  setSubmittingState: isSubmitting => store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  }),

  setAlert: alert => store.dispatch({
    intent: SET_ALERT,
    alert,
  }),

  dismissAlert: () => store.dispatch({
    intent: SET_ALERT,
  }),

  setModalType: modalType => store.dispatch({
    intent: SET_MODAL_TYPE,
    modalType,
  }),

  setPendingDeleteId: id => store.dispatch({
    intent: SET_PENDING_DELETE_ID,
    id,
  }),

  loadBankStatementImportList: response => store.dispatch({
    intent: LOAD_BANK_STATEMENT_IMPORT_LIST,
    ...response,
  }),

  sortAndFilterBankStatementImportList: (entries) => store.dispatch({
    intent: SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST,
    entries,
  }),

  importBankStatement: () => store.dispatch({
    intent: IMPORT_BANK_STATEMENT,
  }),

  setTableLoadingState: isTableLoading => store.dispatch({
    intent: SET_TABLE_LOADING_STATE,
    isTableLoading,
  }),

  setSortOrder: (orderBy, sortOrder) => store.dispatch({
    intent: SET_SORT_ORDER,
    orderBy,
    sortOrder,
  }),

  updateFilterBarOptions: ({ key, value }) => store.dispatch({
    intent: UPDATE_FILTER_BAR_OPTIONS,
    key,
    value,
  }),

  updateImportModal: ({ key, value }) => store.dispatch({
    intent: UPDATE_IMPORT_MODAL,
    key,
    value,
  }),

  deleteBankStatement: () => store.dispatch({
    intent: DELETE_BANK_STATEMENT,
  }),
});

export default CreateBankStatementImportListDispatcher;
