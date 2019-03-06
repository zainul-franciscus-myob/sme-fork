import { LOAD_TAX_LIST, SET_LOADING_STATE } from '../TaxIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const initialState = {
  businessId: '',
  region: '',
  entries: [],
  isLoading: true,
};

const resetState = () => ({ ...initialState });

const loadTaxList = (state, action) => ({
  ...state,
  entries: action.entries,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
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
const taxListReducer = createReducer(initialState, handlers);

export default taxListReducer;
