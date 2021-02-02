import {
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  SET_SELECTED_PAYROLL_YEAR,
} from '../../PaydayFilingIntents';
import paydayFilingReducer from '../../PaydayFilingReducer';

describe('eiSubmissionsReducer', () => {
  describe('setSelectedPayrollYear', () => {
    it('setSelectedPayrollYear should update selected payroll year', () => {
      const state = {};

      const expected = {
        eiSubmissions: {
          selectedPayrollYear: '2021',
        },
      };

      const action = {
        intent: SET_SELECTED_PAYROLL_YEAR,
        selectedPayrollYear: '2021',
      };

      expect(paydayFilingReducer(state, action)).toMatchObject(expected);
    });
  });

  describe('setInitialEiSubmissionsAndPayrollOptions', () => {
    it('setInitialEiSubmissionsAndPayrollOptions should update ei submission and payroll options', () => {
      const state = {};

      const expected = {
        eiSubmissions: {
          payrollYears: [
            {
              label: '2020/21',
              year: '2021',
              startDate: '2020-04-01',
              endDate: '2021-03-31',
            },
          ],
          selectedPayrollYear: '2021',
        },
      };

      const action = {
        intent: LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
        response: {
          payrollYears: [
            {
              label: '2020/21',
              year: '2021',
              startDate: '2020-04-01',
              endDate: '2021-03-31',
            },
          ],
          selectedPayrollYear: '2021',
        },
      };

      expect(paydayFilingReducer(state, action)).toMatchObject(expected);
    });
  });
});
