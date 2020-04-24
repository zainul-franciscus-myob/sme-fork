import {
  MARK_WAGE_AS_JOBKEEPER,
  TOGGLE_JOB_KEEPER,
} from '../../../../EmployeeIntents';
import employeeDetailsReducer from '../../../employeeDetailReducer';

describe('wagePayItemReducer', () => {
  describe('toggleJobKeeper', () => {
    describe('creating a pay item', () => {
      const state = {
        wagePayItemModal: {
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
          id: 'new',
        },
      };

      it('sets the wage pay item values when toggle on', () => {
        const action = {
          intent: TOGGLE_JOB_KEEPER,
          isJobKeeper: true,
        };

        const actual = employeeDetailsReducer(state, action);

        expect(actual.wagePayItemModal.isJobKeeper).toEqual(true);
        expect(actual.wagePayItemModal.wage.name).toEqual('JOBKEEPER-TOPUP');
        expect(actual.wagePayItemModal.wage.atoReportingCategory).toEqual('AllowanceOther');
        expect(actual.wagePayItemModal.wage.payBasis).toEqual('Salary');
      });

      it('sets the wage pay item values to default values when toggle off', () => {
        const modifiedState = {
          wagePayItemModal: {
            ...state.wagePayItemModal,
            isJobKeeper: true,
            wage: {
              ...state.wagePayItemModal.wage,
              name: 'some name',
              atoReportingCategory: 'some category',
              payBasis: 'Hourly',
            },
          },
        };
        const action = {
          intent: TOGGLE_JOB_KEEPER,
          isJobKeeper: false,
        };

        const actual = employeeDetailsReducer(modifiedState, action);

        expect(actual.wagePayItemModal.isJobKeeper).toEqual(false);
        expect(actual.wagePayItemModal.wage).toEqual(state.wagePayItemModal.wage);
      });
    });

    describe('updating a pay item', () => {
      const state = {
        wagePayItemModal: {
          id: '1',
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
        },
      };

      it('returns the original state', () => {
        const action = {
          intent: TOGGLE_JOB_KEEPER,
          isJobKeeper: true,
        };

        const actual = employeeDetailsReducer(state, action);

        expect(actual).toEqual(state);
      });
    });
  });

  describe('MARK_WAGE_AS_JOBKEEPER', () => {
    it('should set isJobKeeper to true', () => {
      const state = {
        wagePayItemModal: {
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
        },
      };
      const action = {
        intent: MARK_WAGE_AS_JOBKEEPER,
      };

      const actual = employeeDetailsReducer(state, action);

      expect(actual.wagePayItemModal.isJobKeeper).toBeTruthy();
    });

    it('should not set isJobKeeper to true', () => {
      const state = {
        wagePayItemModal: {
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
        },
      };
      const action = {
        intent: MARK_WAGE_AS_JOBKEEPER,
      };

      const actual = employeeDetailsReducer(state, action);

      expect(actual.wagePayItemModal.isJobKeeper).toBeFalsy();
    });
  });
});
