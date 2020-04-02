import {
  CLOSE_MODAL,
  LOAD_CUSTOMER_STATEMENTS,
  OPEN_MODAL,
  SELECT_CUSTOMER_STATEMENT,
  SET_ALERT,
  SET_ARE_ACTIONS_DISABLED,
  SET_IS_DOWNLOADING_DEFAULT_PDF,
  SET_LOADING_STATE,
  SET_MODAL_ALERT_MESSAGE,
  SET_MODAL_SUBMITTING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CUSTOMER_STATEMENTS,
  TOGGLE_ALL_CUSTOMER_STATEMENTS,
  UNSELECT_ALL_CUSTOMER_STATEMENTS,
  UPDATE_EMAIL_OPTIONS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_TEMPLATE_ADDITIONAL_OPTIONS,
  UPDATE_TEMPLATE_OPTION,
} from './CustomerStatementIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createCustomerStatementListDispatcher = store => ({
  setLoadingState: loadingState => store.dispatch({
    intent: SET_LOADING_STATE,
    loadingState,
  }),

  setTableLoadingState: isTableLoading => store.dispatch({
    intent: SET_TABLE_LOADING_STATE,
    isTableLoading,
  }),

  setAreActionsDisabled: areActionsDisabled => store.dispatch({
    intent: SET_ARE_ACTIONS_DISABLED,
    areActionsDisabled,
  }),

  loadCustomerStatementList: payload => store.dispatch({
    intent: LOAD_CUSTOMER_STATEMENTS,
    payload,
  }),

  sortAndFilterCustomerStatementList: (payload) => store.dispatch({
    intent: SORT_AND_FILTER_CUSTOMER_STATEMENTS,
    payload,
  }),

  updateFilterOptions: ({ key, value }) => store.dispatch({
    intent: UPDATE_FILTER_OPTIONS,
    key,
    value,
  }),

  updateTemplateAdditionalOptions: ({ key, value }) => store.dispatch({
    intent: UPDATE_TEMPLATE_ADDITIONAL_OPTIONS,
    key,
    value,
  }),

  toggleAllCustomerStatements: () => store.dispatch({
    intent: TOGGLE_ALL_CUSTOMER_STATEMENTS,
  }),

  unselectAllCustomerStatements: () => store.dispatch({
    intent: UNSELECT_ALL_CUSTOMER_STATEMENTS,
  }),

  selectCustomerStatement: index => store.dispatch({
    intent: SELECT_CUSTOMER_STATEMENT,
    index,
  }),

  setSortOrder: (orderBy, newSortOrder) => store.dispatch({
    intent: SET_SORT_ORDER,
    sortOrder: newSortOrder,
    orderBy,
  }),

  updateTemplateOption: ({ value }) => store.dispatch({
    intent: UPDATE_TEMPLATE_OPTION,
    value,
  }),

  updateEmailOption: ({ key, value }) => store.dispatch({
    intent: UPDATE_EMAIL_OPTIONS,
    key,
    value,
  }),

  openModal: type => store.dispatch({
    intent: OPEN_MODAL,
    type,
  }),

  closeModal: () => store.dispatch({
    intent: CLOSE_MODAL,
  }),

  setModalSubmittingState: isModalSubmitting => store.dispatch({
    intent: SET_MODAL_SUBMITTING_STATE,
    isModalSubmitting,
  }),

  setModalAlertMessage: alertMessage => store.dispatch({
    intent: SET_MODAL_ALERT_MESSAGE,
    alertMessage,
  }),

  setAlert: alert => store.dispatch({
    intent: SET_ALERT,
    alert,
  }),

  setIsDownloadingDefaultPDF: isDownloadingDefaultPDF => store.dispatch({
    intent: SET_IS_DOWNLOADING_DEFAULT_PDF,
    isDownloadingDefaultPDF,
  }),

  setInitialState: (context, settings) => store.dispatch({
    intent: SET_INITIAL_STATE,
    context,
    settings,
  }),

  resetState: () => store.dispatch({
    intent: RESET_STATE,
  }),
});

export default createCustomerStatementListDispatcher;
