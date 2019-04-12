import {
  LOAD_USER_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_USER_LIST,
} from '../UserIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  alert: undefined,
  businessId: '',
  entries: [],
  isLoading: true,
  isTableLoading: false,
  region: '',
});

const loadUserList = (state, action) => ({
  ...state,
  entries: action.entries,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const resetState = () => (getDefaultState());

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const sortUserList = (state, action) => ({
  ...state,
  entries: action.entries,
});

const handlers = {
  [LOAD_USER_LIST]: loadUserList,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [SORT_USER_LIST]: sortUserList,
};

const userListReducer = createReducer(getDefaultState(), handlers);

export default userListReducer;
