import {
  CLOSE_MODAL,
  LOAD_USER_LIST,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SHOW_STATUS_FILTER_OPTIONS,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  SET_USER_INDEX,
  SET_USER_LIST_FILTER_OPTIONS,
  SORT_USER_LIST,
} from '../UserIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createUserListDispatcher = (store) => ({
  setInitialState: (context) =>
    store.dispatch({ intent: SET_INITIAL_STATE, context }),

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  openModal: (modal) => store.dispatch({ intent: OPEN_MODAL, modal }),

  closeModal: () => store.dispatch({ intent: CLOSE_MODAL }),

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },

  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },

  dismissAlert: () =>
    store.dispatch({
      intent: SET_ALERT,
      alertMessage: undefined,
    }),

  setAlert: ({ type, message }) =>
    store.dispatch({ intent: SET_ALERT, alert: { type, message } }),

  loadUserList: (content) =>
    store.dispatch({
      intent: LOAD_USER_LIST,
      ...content,
    }),

  sortUserList: (entries, sortOrder, orderBy) =>
    store.dispatch({
      intent: SORT_USER_LIST,
      entries,
      sortOrder,
      orderBy,
    }),

  setSelectedUserIndex: (selectedUserIndex) =>
    store.dispatch({
      intent: SET_USER_INDEX,
      selectedUserIndex,
    }),

  setFilterOptions: ({ key, value }) =>
    store.dispatch({
      intent: SET_USER_LIST_FILTER_OPTIONS,
      key,
      value,
    }),

  setShowStatusFilterOptions: (value) =>
    store.dispatch({
      intent: SET_SHOW_STATUS_FILTER_OPTIONS,
      value,
    }),
});

export default createUserListDispatcher;
