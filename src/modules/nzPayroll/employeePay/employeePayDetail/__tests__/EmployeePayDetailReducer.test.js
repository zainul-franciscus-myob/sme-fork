import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import {
  SET_EMPLOYEE_PAY_DETAIL,
  SET_LOADING_STATE,
} from '../EmployeePayDetailIntents';
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
});
