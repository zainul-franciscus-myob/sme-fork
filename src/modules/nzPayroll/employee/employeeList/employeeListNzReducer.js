
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
});

const setInitialState = (state, { context }) => ({ ...state, ...context });

const resetState = () => (getDefaultState());

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
};

const employeeListNzReducer = createReducer(getDefaultState(), handlers);

export default employeeListNzReducer;
