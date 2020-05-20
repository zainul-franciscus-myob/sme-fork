import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_COPY_ALERT_STATE, SET_COPY_ALERT_TEXT, SET_LOADING_STATE } from './BankFeedsConnectIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  applicationPreference: 'online',
  businessId: '',
  copyAlertState: false,
  copyAlertText: '',
  userEmail: 'company@email.com',
  bankFeedLoadEmail: 'bankfeedloads@myob.com',
  loadingState: LoadingState.LOADING,
  referenceNumber: '12345678',
  region: '',
});

const resetState = () => getDefaultState();

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setCopyAlertState = (state) => ({
  ...state,
  copyAlertState: !state.copyAlertState,
});

const setCopyAlertText = (state, { copyAlertText }) => ({
  ...state,
  copyAlertText,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_COPY_ALERT_STATE]: setCopyAlertState,
  [SET_COPY_ALERT_TEXT]: setCopyAlertText,
};

const BankFeedsConnectReducer = createReducer(getDefaultState(), handlers);

export default BankFeedsConnectReducer;
