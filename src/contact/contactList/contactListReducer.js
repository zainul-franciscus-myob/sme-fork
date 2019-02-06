import {
  LOAD_CONTACT_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
} from '../ContactIntents';
import {
  RESET_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';


const getInitialState = () => ({
  entries: [],
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
});

const resetState = () => (getInitialState());

const loadContactList = (state, action) => ({
  ...state,
  entries: action.entries,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const handlers = {
  [LOAD_CONTACT_LIST]: loadContactList,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [RESET_STATE]: resetState,
};

const contactListReducer = createReducer(getInitialState(), handlers);

export default contactListReducer;
