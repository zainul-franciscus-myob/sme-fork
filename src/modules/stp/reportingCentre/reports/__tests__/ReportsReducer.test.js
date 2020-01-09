import { SET_PAY_EVENTS } from '../ReportsIntents';
import ReportsReducer from '../ReportsReducer';

describe('ReportsReducer', () => {
  describe('setPayEvents', () => {
    it('should set the pay events and payroll years', () => {
      const state = {
        payrollYears: [],
        payEvents: [],
      };

      const action = {
        intent: SET_PAY_EVENTS,
        response: {
          payEvents: [
            {
              id: '1',
            },
            {
              id: '2',
            },
          ],
          payrollYears: [
            {
              year: '2020',
            },
            {
              year: '2019',
            },
          ],
        },
      };

      const result = ReportsReducer(state, action);

      expect(result.payEvents).toEqual(action.response.payEvents);
      expect(result.payrollYears).toEqual(action.response.payrollYears);
    });

    it('should set the selectedPayrollYear to the first in the list of payroll years', () => {
      const state = {
        payrollYears: [],
        selectedPayrollYear: '',
        payEvents: [],
      };

      const action = {
        intent: SET_PAY_EVENTS,
        response: {
          payEvents: [],
          payrollYears: [
            {
              year: '2020',
            },
            {
              year: '2019',
            },
          ],
        },
      };

      const result = ReportsReducer(state, action);

      expect(result.selectedPayrollYear).toEqual('2020');
    });

    it('should set the selectedPayrollYear to empty if payrollYear list is not present', () => {
      const state = {
        payrollYears: [],
        selectedPayrollYear: '',
        payEvents: [],
      };

      const action = {
        intent: SET_PAY_EVENTS,
        response: {
          payEvents: [],
        },
      };

      const result = ReportsReducer(state, action);

      expect(result.selectedPayrollYear).toEqual('');
    });

    it('should set the selectedPayrollYear to empty if payrollYear list is empty', () => {
      const state = {
        payrollYears: [],
        selectedPayrollYear: '',
        payEvents: [],
      };

      const action = {
        intent: SET_PAY_EVENTS,
        response: {
          payEvents: [],
          payrollYears: [],
        },
      };

      const result = ReportsReducer(state, action);

      expect(result.selectedPayrollYear).toEqual('');
    });
  });
});
