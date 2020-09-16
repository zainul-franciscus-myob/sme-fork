import {
  SELECT_ALL_EMPLOYEES,
  SELECT_EMPLOYEE,
  SET_JOB_KEEPER_INITIAL,
  TOGGLE_EMPLOYEE_BENEFIT_REPORT_MODAL,
  UPDATE_EMPLOYEE_ROW,
} from '../JobKeeperIntents';
import createReducer, {
  computeAutoFillingFinalFortnightForJobKeeper2,
  computeAutoFillingFirstFortnightForJobKeeper2,
} from '../JobKeeperReducer';

describe('JobKeeperReducer', () => {
  describe('computeAutoFillingFirstFortnightForJobKeeper2', () => {
    [
      null,
      undefined,
      {},
      { firstFortnight: '01' },
      { finalFortnight: '01' },
    ].forEach((value) => {
      it(`return null for invalid initial state ${JSON.stringify(
        value
      )}`, () => {
        const firstFortnight = '13';
        expect(
          computeAutoFillingFinalFortnightForJobKeeper2(value, firstFortnight)
        ).toBe(null);
      });
    });
    it('return 14 for state that has a gap between end JK1 and start JK2', () => {
      const initialState = { firstFortnight: '02', finalFortnight: null };
      let firstFortnight = '17';
      expect(
        computeAutoFillingFinalFortnightForJobKeeper2(
          initialState,
          firstFortnight
        )
      ).toBe('14');
      firstFortnight = '15';
      expect(
        computeAutoFillingFinalFortnightForJobKeeper2(
          initialState,
          firstFortnight
        )
      ).toBe('14');
    });
    it('return null for state that has no gap between end JK1 and start JK2', () => {
      let firstFortnight = '17';
      expect(
        computeAutoFillingFinalFortnightForJobKeeper2(
          { firstFortnight: '02', finalFortnight: '09' },
          firstFortnight
        )
      ).toBe(null);
      firstFortnight = '14';
      expect(
        computeAutoFillingFinalFortnightForJobKeeper2(
          { firstFortnight: '02', finalFortnight: null },
          firstFortnight
        )
      ).toBe(null);
    });
  });

  describe('computeAutoFillingFirstFortnightForJobKeeper2', () => {
    it('should return 14 when tier is selected and there is a gap between JK1 and JK2: i.e: current firstForgnith < 14', () => {
      expect(computeAutoFillingFirstFortnightForJobKeeper2('01', '12')).toBe(
        '14'
      );
    });

    it('should return original firstFortnights when tier is not selected', () => {
      expect(computeAutoFillingFirstFortnightForJobKeeper2('', '12')).toBe(
        '12'
      );
    });
    it('should return original firstFortnights when it is already a JK2 week (>14', () => {
      expect(computeAutoFillingFirstFortnightForJobKeeper2('02', '17')).toBe(
        '17'
      );
    });
  });

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
        isJobKeeper2Enabled: true,
      };
    });
    describe('when feature toggle is on', () => {
      it('return correct firstFortnight (14) for JK2 when select tier', () => {
        const action = {
          intent: UPDATE_EMPLOYEE_ROW,
          key: 'tier',
          value: '01',
          rowId: 0,
        };
        const result = createReducer(state, action);

        expect(result.employees[0].firstFortnight).toBe('14');
      });

      it('return correct endfortnight (14) for JK2 when select firstFortnight for JK2 result in a gap', () => {
        const action = {
          intent: UPDATE_EMPLOYEE_ROW,
          key: 'firstFortnight',
          value: '16',
          rowId: 0,
        };
        const result = createReducer(state, action);

        expect(result.employees[0].finalFortnight).toBe('14');
      });
    });
    describe('when feature toggle is off', () => {
      it('should not automatically update firstFortnight or finalFortnight for JK2', () => {
        state.isJobKeeper2Enabled = false;
        let action = {
          intent: UPDATE_EMPLOYEE_ROW,
          key: 'tier',
          value: '01',
          rowId: 0,
        };
        let result = createReducer(state, action);

        expect(result.employees[0].firstFortnight).toBe('04');

        action = {
          intent: UPDATE_EMPLOYEE_ROW,
          key: 'firstFortnight',
          value: '16',
          rowId: 0,
        };
        result = createReducer(state, action);

        expect(result.employees[0].finalFortnight).toBe(null);
      });
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
});
