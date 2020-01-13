import { LOAD_TAX_LIST, SET_LOADING_STATE } from '../TaxIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  entries: [],
  loadingState: LoadingState.LOADING,
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

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_TAX_LIST]: loadTaxList,
  [SET_LOADING_STATE]: setLoadingState,
  [RESET_STATE]: resetState,
};
const taxListReducer = createReducer(getDefaultState(), handlers);

export default taxListReducer;
