import { LOAD_ONLINETAX_CONFIG, SET_LOADING_STATE } from './onlineTaxIntent';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import LoadingState from '../../components/PageView/LoadingState';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING_SUCCESS,
  businessId: '',
  region: '',
  isRegisteredForGst: true,
  isCustomizedForNonGstEnabled: true,
});

const setInitalState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadOnlineTaxConfig = (state, { isRegisteredForGst }) => ({
  ...state,
  isRegisteredForGst,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const resetState = () => getDefaultState();

const handlers = {
  [SET_INITIAL_STATE]: setInitalState,
  [RESET_STATE]: resetState,
  [LOAD_ONLINETAX_CONFIG]: loadOnlineTaxConfig,
  [SET_LOADING_STATE]: setLoadingState,
};

const onlineTaxReducer = createReducer(getDefaultState(), handlers);

export default onlineTaxReducer;
