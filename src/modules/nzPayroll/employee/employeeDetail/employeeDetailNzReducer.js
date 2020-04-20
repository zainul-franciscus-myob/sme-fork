
import { LOAD_EMPLOYEE_DETAIL, SET_LOADING_STATE } from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  contactDetail: {
    firstName: '',
    lastName: '',
    isInactive: false,
    employeeNumber: '',
    country: '',
    address: '',
    suburb: '',
    state: '',
    postcode: '',
    phoneNumbers: [],
    email: '',
    notes: '',
  },
});

const resetState = () => getDefaultState();

const setInitialState = (state = getDefaultState(), { context }) => ({
  ...state,
  ...context,
});

const loadContactDetail = (state, action) => ({
  ...state.contactDetail,
  ...action.contactDetail,
});

const loadEmployeeDetail = (state, action) => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,
  contactDetail: loadContactDetail(state, action),
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_EMPLOYEE_DETAIL]: loadEmployeeDetail,
  [SET_LOADING_STATE]: setLoadingState,
};

const employeeDetailNzReducer = createReducer(getDefaultState(), handlers);

export default employeeDetailNzReducer;
