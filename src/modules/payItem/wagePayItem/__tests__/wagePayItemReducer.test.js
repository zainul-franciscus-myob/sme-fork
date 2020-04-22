import {
  ADD_EMPLOYEE,
  ADD_EXEMPTION,
  MARK_WAGE_AS_JOBKEEPER,
  REMOVE_EMPLOYEE,
  REMOVE_EXEMPTION,
  SAVE_ORIGINAL_WAGE_JOBKEEPER,
  TOGGLE_JOB_KEEPER,
} from '../WagePayItemIntents';
import wagePayItemReducer from '../wagePayItemReducer';

describe('wagePayItemReducer', () => {
  describe('addEmployeeToSelectedList', () => {
    it('should add the selected employee to the selectedEmployees list', () => {
      const state = {
        wage: {
          selectedEmployees: [],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
      };

      const action = {
        intent: ADD_EMPLOYEE,
        key: '',
        value: '1',
      };

      const actual = wagePayItemReducer(state, action);

      const expected = {
        wage: {
          selectedEmployees: [
            {
              name: 'Calie Mory',
              id: '1',
            },
          ],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('removeEmployeeFromSelectedList', () => {
    it('should remove the selected employee from the selectedEmployees list', () => {
      const state = {
        wage: {
          selectedEmployees: [
            {
              name: 'Sylvia Belt',
              id: '2',
            },
          ],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
      };

      const action = {
        intent: REMOVE_EMPLOYEE,
        id: '2',
      };

      const actual = wagePayItemReducer(state, action);

      const expected = {
        wage: {
          selectedEmployees: [],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('addExemptionToSelectedList', () => {
    it('should add the selected exemption to the selectedExemptions list', () => {
      const state = {
        wage: {
          selectedExemptions: [],
        },
        exemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
      };

      const action = {
        intent: ADD_EXEMPTION,
        key: '',
        value: '33',
      };

      const actual = wagePayItemReducer(state, action);

      const expected = {
        wage: {
          selectedExemptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Wages',
            },
          ],
        },
        exemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('removeExemptionFromSelectedList', () => {
    it('should remove the selected exemption from the selectedExemptions list', () => {
      const state = {
        wage: {
          selectedExemptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Wages',
            },
          ],
        },
        exemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
      };

      const action = {
        intent: REMOVE_EXEMPTION,
        id: '33',
      };

      const actual = wagePayItemReducer(state, action);

      const expected = {
        wage: {
          selectedExemptions: [],
        },
        exemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('toggleJobKeeper', () => {
    describe('creating a pay item', () => {
      const state = {
        wage: {
          name: '',
          atoReportingCategory: '',
          payBasis: '',
          payRate: '',
          payRateMultiplier: '',
          fixedHourlyPayRate: '',
          autoAdjustBase: false,
          selectedEmployees: [],
          selectedExemptions: [],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
        isJobKeeper: false,
        payItem: 'new',
      };

      it('sets the wage pay item values when toggle on', () => {
        const action = {
          intent: TOGGLE_JOB_KEEPER,
          isJobKeeper: true,
        };

        const actual = wagePayItemReducer(state, action);

        expect(actual.isJobKeeper).toEqual(true);
        expect(actual.wage.name).toEqual('JOBKEEPER-TOPUP');
        expect(actual.wage.atoReportingCategory).toEqual('AllowanceOther');
        expect(actual.wage.payBasis).toEqual('Salary');
      });

      it('sets the wage pay item values to default values when toggle off', () => {
        const modifiedState = {
          ...state,
          isJobKeeper: true,
          wage: {
            ...state.wage,
            name: 'some name',
            atoReportingCategory: 'some category',
            payBasis: 'Hourly',
          },
        };
        const action = {
          intent: TOGGLE_JOB_KEEPER,
          isJobKeeper: false,
        };

        const actual = wagePayItemReducer(modifiedState, action);

        expect(actual.isJobKeeper).toEqual(false);
        expect(actual.wage).toEqual(state.wage);
      });
    });

    describe('updating a pay item', () => {
      const state = {
        wage: {
          name: '',
          atoReportingCategory: '',
          payBasis: '',
          payRate: '',
          payRateMultiplier: '',
          fixedHourlyPayRate: '',
          autoAdjustBase: false,
          selectedEmployees: [],
          selectedExemptions: [],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
        isJobKeeper: false,
      };

      it('sets the wage pay item values when toggle on', () => {
        const action = {
          intent: TOGGLE_JOB_KEEPER,
          isJobKeeper: true,
        };

        const actual = wagePayItemReducer(state, action);

        expect(actual.isJobKeeper).toEqual(true);
        expect(actual.wage.name).toEqual('JOBKEEPER-TOPUP');
        expect(actual.wage.atoReportingCategory).toEqual('AllowanceOther');
        expect(actual.wage.payBasis).toEqual('Salary');
      });

      it('sets the wage pay item values to original values when toggle off', () => {
        const modifiedState = {
          ...state,
          isJobKeeper: true,
          wage: {
            ...state.wage,
            name: 'some name',
            atoReportingCategory: 'some category',
            payBasis: 'Hourly',
          },
          originalWageValues: {
            name: 'original name',
            atoReportingCategory: 'original category',
            payBasis: 'original payBasis',
          },
        };
        const action = {
          intent: TOGGLE_JOB_KEEPER,
          isJobKeeper: false,
        };

        const actual = wagePayItemReducer(modifiedState, action);

        expect(actual.isJobKeeper).toEqual(false);
        expect(actual.wage.name).toEqual(modifiedState.originalWageValues.name);
        expect(actual.wage.atoReportingCategory)
          .toEqual(modifiedState.originalWageValues.atoReportingCategory);
        expect(actual.wage.payBasis).toEqual(modifiedState.originalWageValues.payBasis);
      });
    });
  });

  describe('SAVE_ORIGINAL_WAGE_JOBKEEPER', () => {
    it('should save original payitem values when fetching payitem', () => {
      const state = {
        wage: {
          name: '',
          atoReportingCategory: '',
          payBasis: '',
          payRate: '',
          payRateMultiplier: '',
          fixedHourlyPayRate: '',
          autoAdjustBase: false,
          selectedEmployees: [],
          selectedExemptions: [],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
        isJobKeeper: false,
        originalWageValues: {
          name: '',
          atoReportingCategory: '',
          payBasis: '',
        },
      };

      const action = {
        intent: SAVE_ORIGINAL_WAGE_JOBKEEPER,
        originalWageValues: {
          name: 'Allowance01',
          atoReportingCategory: 'STP',
          payBasis: 'fixed',
        },
      };

      const actual = wagePayItemReducer(state, action);

      expect(actual.originalWageValues.name).toEqual('Allowance01');
      expect(actual.originalWageValues.atoReportingCategory).toEqual('STP');
      expect(actual.originalWageValues.payBasis).toEqual('fixed');
    });
  });

  describe('MARK_WAGE_AS_JOBKEEPER', () => {
    it('should set isJobKeeper to true', () => {
      const state = {
        wage: {
          name: 'JOBKEEPER-TOPUP',
          atoReportingCategory: 'AllowanceOther',
          payBasis: 'Salary',
          payRate: '',
          payRateMultiplier: '',
          fixedHourlyPayRate: '',
          autoAdjustBase: false,
          selectedEmployees: [],
          selectedExemptions: [],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
        isJobKeeper: false,
        originalWageValues: {
          name: '',
          atoReportingCategory: '',
          payBasis: '',
        },
      };
      const action = {
        intent: MARK_WAGE_AS_JOBKEEPER,
      };

      const actual = wagePayItemReducer(state, action);

      expect(actual.isJobKeeper).toBeTruthy();
    });

    it('should not set isJobKeeper to true', () => {
      const state = {
        wage: {
          name: 'Allowance',
          atoReportingCategory: 'AllowanceOther',
          payBasis: 'Salary',
          payRate: '',
          payRateMultiplier: '',
          fixedHourlyPayRate: '',
          autoAdjustBase: false,
          selectedEmployees: [],
          selectedExemptions: [],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
        isJobKeeper: false,
        originalWageValues: {
          name: '',
          atoReportingCategory: '',
          payBasis: '',
        },
      };
      const action = {
        intent: MARK_WAGE_AS_JOBKEEPER,
      };

      const actual = wagePayItemReducer(state, action);

      expect(actual.isJobKeeper).toBeFalsy();
    });
  });
});
