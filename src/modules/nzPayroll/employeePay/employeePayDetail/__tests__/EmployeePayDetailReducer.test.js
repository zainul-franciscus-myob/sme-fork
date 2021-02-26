import {
  CLOSE_DELETE_MODAL,
  DELETE_EMPLOYEE_PAY_DETAIL_FAILED,
  OPEN_DELETE_MODAL,
  SET_EMPLOYEE_PAY_DETAIL,
  SET_LOADING_STATE,
} from '../EmployeePayDetailIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import LoadingState from '../../../../../components/PageView/LoadingState';
import employeePayDetailReducer from '../employeePayDetailReducer';
import employeePayDetails from '../../mappings/data/loadEmployeePayDetail';

describe('Employee Pay Detail Reducer', () => {
  it('Should Set Employee Pay Details with SET_EMPLOYEE_PAY_DETAIL', () => {
    const state = {
      employeePay: { balance: 0 },
    };

    const action = {
      intent: SET_EMPLOYEE_PAY_DETAIL,
      response: employeePayDetails,
    };

    const actual = employeePayDetailReducer(state, action);
    expect(actual.employeePay.balance).toEqual('-$31,954.87');
  });

  it('Should set to default state and context with SET_INITIAL_STATE', () => {
    const state = {
      employeePay: { employeeId: 1 },
    };
    const context = { businessId: '1', region: 'nz' };

    const action = { intent: SET_INITIAL_STATE, context };

    const actual = employeePayDetailReducer(state, action);

    expect(actual.businessId).toEqual('1');
  });

  it('Should reset to default state with RESET_STATE', () => {
    const state = {
      employeePay: { employeeId: 1 },
    };

    const action = { intent: RESET_STATE };

    const actual = employeePayDetailReducer(state, action);

    expect(actual.employeePay.employeeId).toEqual(0);
  });

  it('Should reset to default state with SET_LOADING_STATE', () => {
    const state = {
      employeePay: { employeeId: 1 },
      loadingState: LoadingState.LOADING,
    };

    const action = {
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_FAIL,
    };

    const actual = employeePayDetailReducer(state, action);

    expect(actual.loadingState).toEqual(LoadingState.LOADING_FAIL);
  });

  it('should populate delete modal display flag if intent OPEN_DELETE_MODAL dispatched', () => {
    const state = {
      employeePay: { employeeId: 1 },
      loadingState: LoadingState.LOADING,
    };

    const action = {
      intent: OPEN_DELETE_MODAL,
      displayDeleteConfirmation: true,
    };

    const actual = employeePayDetailReducer(state, action);
    expect(actual.displayDeleteConfirmation).toEqual(true);
  });

  it('should populate delete modal display flag if intent CLOSE_DELETE_MODAL dispatched', () => {
    const state = {
      employeePay: { employeeId: 1 },
      loadingState: LoadingState.LOADING,
    };

    const action = {
      intent: CLOSE_DELETE_MODAL,
      displayDeleteConfirmation: false,
    };

    const actual = employeePayDetailReducer(state, action);
    expect(actual.displayDeleteConfirmation).toEqual(false);
  });

  it('should show alert message if intent DELETE_EMPLOYEE_PAY_DETAIL_FAILED dispatched', () => {
    const state = {
      employeePay: { employeeId: 1 },
      loadingState: LoadingState.LOADING,
    };

    const action = {
      intent: DELETE_EMPLOYEE_PAY_DETAIL_FAILED,
      message: 'failed message',
    };

    const actual = employeePayDetailReducer(state, action);
    expect(actual.alert).toMatchObject({
      type: 'danger',
      message: 'failed message',
    });
  });
});
