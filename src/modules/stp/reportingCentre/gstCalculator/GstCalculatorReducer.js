import {
  SET_DIRTY_FLAG,
  SET_INITIAL_STATE,
  SET_LOADING_STATE,
  SET_TURNOVER_RESULT,
  UPDATE_FORM,
} from './GstCalculatorIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

export const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isDirty: false,
  formData: {
    exclusiveSalesYear1: '',
    freeSalesYear1: '',
    exclusiveSalesYear2: '',
    freeSalesYear2: '',
  },
  turnoverPercentage: '',
  turnoverAmount: '',
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setDirtyFlag = (state) => ({
  ...state,
  isDirty: true,
});

const updateForm = (state, { key, value }) => ({
  ...state,
  formData: {
    ...state.formData,
    [key]: value,
  },
});

const setTurnoverResult = (state, { response }) => {
  const resetEmptyToZero = (value) => value || 0;

  return {
    ...state,
    ...response,
    formData: {
      exclusiveSalesYear1: resetEmptyToZero(state.formData.exclusiveSalesYear1),
      freeSalesYear1: resetEmptyToZero(state.formData.freeSalesYear1),
      exclusiveSalesYear2: resetEmptyToZero(state.formData.exclusiveSalesYear2),
      freeSalesYear2: resetEmptyToZero(state.formData.freeSalesYear2),
    },
  };
};

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_DIRTY_FLAG]: setDirtyFlag,
  [UPDATE_FORM]: updateForm,
  [SET_TURNOVER_RESULT]: setTurnoverResult,
};

const gstCalculatorReducer = createReducer(getDefaultState(), handlers);

export default gstCalculatorReducer;
