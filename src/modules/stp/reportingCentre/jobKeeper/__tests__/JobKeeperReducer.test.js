import {
  SELECT_ALL_EMPLOYEES,
  SELECT_EMPLOYEE,
  SET_JOB_KEEPER_INITIAL,
  SET_LOADING_STATE,
  TOGGLE_EMPLOYEE_BENEFIT_REPORT_MODAL,
  UPDATE_EMPLOYEE_ROW,
} from '../JobKeeperIntents';
import LoadingState from '../../../../../components/PageView/LoadingState';
import createReducer from '../JobKeeperReducer';

describe('JobKeeperReducer', () => {
  describe('updateEmployeeRow', () => {
    let state = {};
    beforeEach(() => {
      const sampleEmployee = {
        employeeId: 0,
        firstFortnight: '04',
        finalFortnight: null,
      };
      state = {
        employees: [{ ...sampleEmployee }],
        initialEmployees: [{ ...sampleEmployee }],
      };
    });

    it('update tier, should NOT autofill firstFortnight to 14 for JK2', () => {
      const action = {
        intent: UPDATE_EMPLOYEE_ROW,
        key: 'tier',
        value: '01',
        rowId: 0,
      };
      const result = createReducer(state, action);

      expect(result.employees[0].firstFortnight).toBe('04');
      expect(result.employees[0].finalFortnight).toBe(null);
      expect(result.employees[0].tier).toBe('01');
    });

    it('update firstFortnight to JK2 option, should NOT autofill finalFortnight to 14 for JK2', () => {
      const action = {
        intent: UPDATE_EMPLOYEE_ROW,
        key: 'firstFortnight',
        value: '16',
        rowId: 0,
      };
      const result = createReducer(state, action);

      expect(result.employees[0].firstFortnight).toBe('16');
      expect(result.employees[0].finalFortnight).toBe(null);
      expect(result.employees[0].tier).toBeUndefined();
    });
    it('update firstFortnight to another JK1 option, return correct firstFortnight for JK1', () => {
      const action = {
        intent: UPDATE_EMPLOYEE_ROW,
        key: 'firstFortnight',
        value: '05',
        rowId: 0,
      };
      const result = createReducer(state, action);

      expect(result.employees[0].firstFortnight).toBe('05');
      expect(result.employees[0].finalFortnight).toBe(null);
      expect(result.employees[0].tier).toBeUndefined();
    });
    it('update finalFortnight to JK2 option, return correct finalFortnight for JK2', () => {
      const action = {
        intent: UPDATE_EMPLOYEE_ROW,
        key: 'finalFortnight',
        value: '15',
        rowId: 0,
      };
      const result = createReducer(state, action);

      expect(result.employees[0].firstFortnight).toBe('04');
      expect(result.employees[0].finalFortnight).toBe('15');
      expect(result.employees[0].tier).toBeUndefined();
    });

    it('update finalFortnight to another JK1 option, return correct finalFortnight for JK1', () => {
      const action = {
        intent: UPDATE_EMPLOYEE_ROW,
        key: 'finalFortnight',
        value: '06',
        rowId: 0,
      };
      const result = createReducer(state, action);

      expect(result.employees[0].firstFortnight).toBe('04');
      expect(result.employees[0].finalFortnight).toBe('06');
      expect(result.employees[0].tier).toBeUndefined();
    });
  });

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
          },
        ],
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
          },
        ],
      },
    };

    const result = createReducer({}, action);

    expect(result.employees[0].allowClearFirstFortnight).toBeTruthy();
    expect(result.employees[0].allowClearFinalFortnight).toBeTruthy();
  });

  it('should set isEmployeeBenefitReportOpen to true', () => {
    const action = {
      intent: TOGGLE_EMPLOYEE_BENEFIT_REPORT_MODAL,
      isEmployeeBenefitReportModalOpen: true,
    };

    const result = createReducer({}, action);

    expect(result.isEmployeeBenefitReportModalOpen).toBeTruthy();
  });

  it('should set isSelect to true for selected employee', () => {
    const action = {
      intent: SELECT_EMPLOYEE,
      item: {
        employeeId: '100001',
      },
      value: true,
    };

    const state = {
      employees: [
        {
          employeeId: '100001',
          payId: 'effa0c73-65c4-409d-a20c-623fbe0c8b17',
          firstName: 'Alf',
          lastName: 'Galang',
          firstFortnight: '02',
          finalFortnight: null,
          tier: '01',
        },
        {
          employeeId: '100002',
          payId: '73f25da3-32ef-4ad9-a5cb-74e241b0506b',
          firstName: 'Sarah',
          lastName: 'Boss',
          firstFortnight: '02',
          finalFortnight: '03',
          tier: '02',
        },
      ],
    };

    const result = createReducer(state, action);

    expect(result.employees[0].isSelected).toBeTruthy();
    expect(result.employees[1].isSelected).toBeFalsy();
  });

  it('should set select true for all employees', () => {
    const action = {
      intent: SELECT_ALL_EMPLOYEES,
      isSelected: true,
    };

    const state = {
      employees: [
        {
          employeeId: '100001',
          payId: 'effa0c73-65c4-409d-a20c-623fbe0c8b17',
          firstName: 'Alf',
          lastName: 'Galang',
          firstFortnight: '02',
          finalFortnight: null,
          tier: '01',
        },
        {
          employeeId: '100002',
          payId: '73f25da3-32ef-4ad9-a5cb-74e241b0506b',
          firstName: 'Sarah',
          lastName: 'Boss',
          firstFortnight: '02',
          finalFortnight: '03',
          tier: '02',
        },
      ],
    };

    const result = createReducer(state, action);

    result.employees.forEach((employee) => {
      expect(employee.isSelected).toBe(true);
    });
  });

  it('should set select false for all employees', () => {
    const action = {
      intent: SELECT_ALL_EMPLOYEES,
      isSelected: false,
    };

    const state = {
      employees: [
        {
          employeeId: '100001',
          payId: 'effa0c73-65c4-409d-a20c-623fbe0c8b17',
          firstName: 'Alf',
          lastName: 'Galang',
          firstFortnight: '02',
          finalFortnight: null,
          tier: '01',
        },
        {
          employeeId: '100002',
          payId: '73f25da3-32ef-4ad9-a5cb-74e241b0506b',
          firstName: 'Sarah',
          lastName: 'Boss',
          firstFortnight: '02',
          finalFortnight: '03',
          tier: '02',
        },
      ],
    };

    const result = createReducer(state, action);

    result.employees.forEach((employee) => {
      expect(employee.isSelected).toBe(false);
    });
  });

  it('sets the loading state', () => {
    const action = {
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_SUCCESS,
    };

    const result = createReducer({}, action);

    expect(result.loadingState).toEqual(LoadingState.LOADING_SUCCESS);
  });
});
