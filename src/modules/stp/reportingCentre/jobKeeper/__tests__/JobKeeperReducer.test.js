import { SET_JOB_KEEPER_INITIAL } from '../JobKeeperIntents';
import createReducer from '../JobKeeperReducer';

describe('JobKeeperReducer', () => {
  it('sets the allowClear to false when there is an initial value', () => {
    const action = {
      intent: SET_JOB_KEEPER_INITIAL,
      response: {
        employees: [
          {
            employeeId: '100001',
            payId: 'effa0c73-65c4-409d-a20c-623fbe0c8b17',
            firstName: 'Alf',
            lastName: 'Galang',
            firstFortnight: '02',
            finalFortnight: '04',
          }],
      },
    };

    const result = createReducer({}, action);

    expect(result.employees[0].allowClearFirstFortnight).toBeFalsy();
    expect(result.employees[0].allowClearFinalFortnight).toBeFalsy();
  });

  it('sets the allowClear to true when there is no initial value', () => {
    const action = {
      intent: SET_JOB_KEEPER_INITIAL,
      response: {
        employees: [
          {
            employeeId: '100001',
            payId: 'effa0c73-65c4-409d-a20c-623fbe0c8b17',
            firstName: 'Alf',
            lastName: 'Galang',
            firstFortnight: null,
            finalFortnight: null,
          }],
      },
    };

    const result = createReducer({}, action);

    expect(result.employees[0].allowClearFirstFortnight).toBeTruthy();
    expect(result.employees[0].allowClearFinalFortnight).toBeTruthy();
  });
});
