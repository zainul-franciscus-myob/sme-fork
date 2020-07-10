import {
  SET_PAY_EVENTS,
  SET_PAY_EVENT_DETAILS,
  SET_SELECTED_PAY_EVENT,
} from '../ReportsIntents';
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

  describe('setSelectedPayEvent', () => {
    it('should set the selected pay event if it exists in the list', () => {
      const state = {
        payEvents: [{ id: '123' }, { id: '234' }, { id: '345' }],
      };

      const action = {
        intent: SET_SELECTED_PAY_EVENT,
        selectedPayEventId: '234',
      };

      const result = ReportsReducer(state, action);

      const expected = { id: '234' };

      expect(result.selectedPayEvent).toEqual(expected);
    });

    it('should set the selected pay event to null if it is not in the list', () => {
      const state = {
        payEvents: [{ id: '123' }, { id: '234' }],
      };

      const action = {
        intent: SET_SELECTED_PAY_EVENT,
        selectedPayEventId: '345',
      };

      const result = ReportsReducer(state, action);

      expect(result.selectedPayEvent).toEqual(undefined);
    });
  });

  describe('setPayEventDetails', () => {
    it('should merge the pay event details with the selected pay event object', () => {
      const state = {
        payEvents: [
          {
            id: '123',
            status: 'Pending',
          },
        ],
        selectedPayEvent: {
          id: '123',
          status: 'Pending',
          foo: 'bar',
        },
      };

      const action = {
        intent: SET_PAY_EVENT_DETAILS,
        response: {
          id: '123',
          bar: 'foo',
          status: 'Success',
        },
      };

      const result = ReportsReducer(state, action);

      const expected = {
        id: '123',
        foo: 'bar',
        bar: 'foo',
        status: 'Success',
      };

      expect(result.selectedPayEvent).toEqual(expected);
    });

    it('should update the matching payEvent object in the payEvents list with thew new status', () => {
      const state = {
        payEvents: [
          {
            id: '123',
            status: 'Pending',
          },
          {
            id: '321',
            status: 'Error',
          },
        ],
        selectedPayEvent: {
          id: '123',
          status: 'Pending',
          foo: 'bar',
        },
      };

      const action = {
        intent: SET_PAY_EVENT_DETAILS,
        response: {
          id: '123',
          bar: 'foo',
          status: 'Success',
        },
      };

      const result = ReportsReducer(state, action);

      const expected = [
        {
          id: '123',
          status: 'Success',
        },
        {
          id: '321',
          status: 'Error',
        },
      ];

      expect(result.payEvents).toEqual(expected);
    });

    it('should not update any pay events in the list if it the pay event is not in the list', () => {
      const state = {
        payEvents: [
          {
            id: '234',
            status: 'Pending',
          },
          {
            id: '321',
            status: 'Error',
          },
        ],
        selectedPayEvent: {
          id: '123',
          status: 'Pending',
          foo: 'bar',
        },
      };

      const action = {
        intent: SET_PAY_EVENT_DETAILS,
        response: {
          id: '123',
          bar: 'foo',
          status: 'Success',
        },
      };

      const result = ReportsReducer(state, action);

      expect(result.payEvents).toEqual(state.payEvents);
    });
  });
});
