import {
  SET_EMPLOYEES,
  SET_EMPLOYEE_TERMINATION_DATE,
  SET_NEW_EVENT_ID,
} from '../TerminationIntents';
import TerminationReducer from '../TerminationReducer';

describe('TerminationReducer', () => {
  describe('setEmployees', () => {
    it('should set the pay events and payroll years', () => {
      const state = {
        payrollYears: [],
        employees: [],
      };

      const action = {
        intent: SET_EMPLOYEES,
        response: {
          employees: [
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

      const result = TerminationReducer(state, action);

      expect(result.employees).toEqual(action.response.employees);
      expect(result.payrollYears).toEqual(action.response.payrollYears);
    });

    it('should set the selectedPayrollYear to the first in the list of payroll years', () => {
      const state = {
        payrollYears: [],
        selectedPayrollYear: '',
        employees: [],
      };

      const action = {
        intent: SET_EMPLOYEES,
        response: {
          employees: [],
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

      const result = TerminationReducer(state, action);

      expect(result.selectedPayrollYear).toEqual('2020');
    });

    it('should set the selectedPayrollYear to empty if payrollYear list is not present', () => {
      const state = {
        payrollYears: [],
        selectedPayrollYear: '',
        employees: [],
      };

      const action = {
        intent: SET_EMPLOYEES,
        response: {
          employees: [],
        },
      };

      const result = TerminationReducer(state, action);

      expect(result.selectedPayrollYear).toEqual('');
    });

    it('should set the selectedPayrollYear to empty if payrollYear list is empty', () => {
      const state = {
        payrollYears: [],
        selectedPayrollYear: '',
        employees: [],
      };

      const action = {
        intent: SET_EMPLOYEES,
        response: {
          employees: [],
          payrollYears: [],
        },
      };

      const result = TerminationReducer(state, action);

      expect(result.selectedPayrollYear).toEqual('');
    });
  });

  describe('setTerminationDate', () => {
    it('should set the termination date of the employee', () => {
      const state = {
        employees: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
      };

      const action = {
        intent: SET_EMPLOYEE_TERMINATION_DATE,
        employee: {
          id: '2',
        },
        terminationDate: '2020-01-01',
      };

      const result = TerminationReducer(state, action);

      const expected = {
        employees: [
          {
            id: '1',
          },
          {
            id: '2',
            terminationDate: '2020-01-01',
            isDirty: true,
          },
        ],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('setNewEventId', () => {
    it('should generate a new eventId', () => {
      const state = {
        eventId: '123',
      };

      const action = {
        intent: SET_NEW_EVENT_ID,
      };

      const result = TerminationReducer(state, action);

      expect(result.eventId).not.toEqual(state.eventId);
    });
  });
});
