import { LOAD_TAX_LIST, SET_ALERT, SET_LOADING_STATE } from '../TaxIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  entries: [],
  loadingState: LoadingState.LOADING,
  alert: undefined,
});

const resetState = () => ({ ...getDefaultState() });

const loadTaxList = (state, action) => ({
  ...state,
  entries: action.entries,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_TAX_LIST]: loadTaxList,
  [SET_LOADING_STATE]: setLoadingState,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
};
const taxListReducer = createReducer(getDefaultState(), handlers);

export default taxListReducer;
