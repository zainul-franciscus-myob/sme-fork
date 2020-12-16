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
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  alert: undefined,
  businessId: '',
  entries: [],
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  region: '',
  isCurrentUserOnlineAdmin: false,
  sortOrder: 'asc',
  orderBy: 'UserName',
  selectedUserIndex: '',
  modal: {},
  isSubmitting: false,
  filterOptions: {
    keywords: '',
    invitationAccepted: true,
    accessRemoved: false,
    invitationSent: true,
    invitationCancelled: false,
    invitationExpired: false,
    showInactive: false,
  },
  showStatusFilterOptions: false,
});

const stringCompare = (a, b) => {
  const nameA = a ? a.toUpperCase() : ''; // ignore upper and lowercase
  const nameB = b ? b.toUpperCase() : ''; // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
};

const sort = (column) => {
  const sortFns = {
    Type: (a, b) => stringCompare(a.type, b.type),
    UserName: (a, b) => stringCompare(a.name, b.name),
    Email: (a, b) => stringCompare(a.email, b.email),
    Status: (a, b) => stringCompare(a.status, b.status),
  };
  return sortFns[column];
};

const applySort = (entries, sortFn, sortOrder) => {
  const result = entries.slice();
  result.sort(sortFn);
  return sortOrder === 'desc' ? result.reverse() : result;
};

const loadUserList = (state, { intent, ...data }) => ({
  ...state,
  ...data,
  sortOrder: state.sortOrder,
  orderBy: state.orderBy,
  entries: applySort(data.entries, sort(state.orderBy), state.sortOrder),
});

const resetState = () => getDefaultState();

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const sortUserList = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
  entries: applySort(action.entries, sort(action.orderBy), action.sortOrder),
});

const openModal = (state, action) => ({
  ...state,
  modal: {
    ...action.modal,
  },
});

const closeModal = (state) => ({
  ...state,
  modal: {
    type: '',
  },
});

const setSelectedUserIndex = (state, action) => ({
  ...state,
  selectedUserIndex: action.selectedUserIndex,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const updateFilterOptions = (state, { key, value }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [key]: value,
  },
});

const setShowStatusFilterOptions = (state, { value }) => ({
  ...state,
  showStatusFilterOptions: value,
});

const handlers = {
  [LOAD_USER_LIST]: loadUserList,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SORT_USER_LIST]: sortUserList,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_USER_INDEX]: setSelectedUserIndex,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_USER_LIST_FILTER_OPTIONS]: updateFilterOptions,
  [SET_SHOW_STATUS_FILTER_OPTIONS]: setShowStatusFilterOptions,
};

const userListReducer = createReducer(getDefaultState(), handlers);

export default userListReducer;
