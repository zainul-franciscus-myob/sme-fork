import {
  getFilterPayEventsParams,
  getIsSelectedPayEvent,
  getLoadPayEventDetailsUrlParams,
  getPayEvents,
  getSelectedPayEvent,
} from '../ReportsSelector';

describe('ReportsSelected', () => {
  describe('getFilterPayEventsParams', () => {
    it('should return the params to filter the pay events', () => {
      const state = {
        payrollYears: [
          {
            label: '2019/20',
            year: '2020',
            startDate: '2019-07-01',
            endDate: '2020-06-30',
          },
          {
            label: '2018/19',
            year: '2019',
            startDate: '2018-07-01',
            endDate: '2019-06-30',
          },
        ],
        selectedPayrollYear: '2019',
      };

      const result = getFilterPayEventsParams(state);

      const expected = {
        startDate: '2018-07-01',
        endDate: '2019-06-30',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getPayEvents', () => {
    it('should format the recordedDate', () => {
      const state = {
        payEvents: [
          {
            id: '1',
            recordedDate: '2019-07-11T00:03:52.174Z',
            status: 'Accepted',
          },
        ],
      };

      const result = getPayEvents(state);

      expect(result[0].recordedDate).toEqual('11/07/2019 12:03am');
    });

    it('should get the correct status object', () => {
      const state = {
        payEvents: [
          {
            id: '1',
            recordedDate: '2019-07-11T00:03:52.174Z',
            status: 'Not sent',
          },
          {
            id: '2',
            recordedDate: '2019-07-11T00:03:52.174Z',
            status: 'Sending',
          },
          {
            id: '3',
            recordedDate: '2019-07-11T00:03:52.174Z',
            status: 'Sent',
          },
          {
            id: '4',
            recordedDate: '2019-07-11T00:03:52.174Z',
            status: 'Accepted',
          },
          {
            id: '5',
            recordedDate: '2019-07-11T00:03:52.174Z',
            status: 'Accepted with errors',
          },
          {
            id: '6',
            recordedDate: '2019-07-11T00:03:52.174Z',
            status: 'Failed',
          },
          {
            id: '7',
            recordedDate: '2019-07-11T00:03:52.174Z',
            status: 'Rejected',
          },
        ],
      };

      const result = getPayEvents(state);

      const expected = {
        'Not sent': {
          label: 'Not sent',
          color: 'orange',
        },
        Sending: {
          label: 'Sending',
          color: 'blue',
        },
        Sent: {
          label: 'Sent',
          color: 'blue',
        },
        Accepted: {
          label: 'Accepted',
          color: 'green',
        },
        'Accepted with errors': {
          label: 'Accepted with errors',
          color: 'orange',
        },
        Failed: {
          label: 'Failed',
          color: 'red',
        },
        Rejected: {
          label: 'Rejected',
          color: 'red',
        },
      };

      expect(result[0].status).toEqual(expected['Not sent']);
      expect(result[1].status).toEqual(expected.Sending);
      expect(result[2].status).toEqual(expected.Sent);
      expect(result[3].status).toEqual(expected.Accepted);
      expect(result[4].status).toEqual(expected['Accepted with errors']);
      expect(result[5].status).toEqual(expected.Failed);
      expect(result[6].status).toEqual(expected.Rejected);
    });
  });

  describe('getSelectedPayEvent', () => {
    it('should return the selected pay event', () => {
      const state = {
        selectedPayEvent: {
          employeeCount: 2,
          gross: '13,340.00',
          id: 'e84cd3e7-4c5b-4a50-a114-3e652c634657',
          payPeriod: '30/06/2019 - 30/06/2019',
          paymentDate: '30/06/2019',
          recordedDate: '2019-07-11T00:03:52.174Z',
          declarationDate: '2019-07-11T00:03:51.679Z',
          status: 'Rejected',
          tax: '3,400.00',
          declaredBy: 'Batman',
          employeeErrors: [
            {
              id: 'b1219f48-d86b-4e3f-a551-a5901172f214',
              name: 'Alfred Butler',
              errors: [
                {
                  code: 'CMN.ATO.GEN.XML03',
                  text: 'A field contains invalid data (such as letters in numeric or date field).',
                },
              ],
            },
          ],
          employerErrors: [
            {
              code: 'CMN.ATO.GEN.XML03',
              text: 'A field contains invalid data (such as letters in numeric or date field).',
            },
          ],
          payRunErrors: [
            {
              code: 'CMN.ATO.PAYEVNT.000199',
              text: "The date entered for Pay/Update Date must not be later than today's date",
            },
          ],
          mismatchedAbns: { abnWithStp: '30086760269', abnWithPayEvent: '30086760270' },
          eventType: 'Pay event',
        },
      };

      const result = getSelectedPayEvent(state);

      const expected = {
        ...state.selectedPayEvent,
        declarationDate: '11/07/2019 12:03am',
        recordedDate: '11/07/2019 12:03am',
        status: {
          color: 'red',
          label: 'Rejected',
        },
      };

      expect(result).toEqual(expected);
    });

    it('should return an empty object if no pay event is selected', () => {
      const state = {
        selectedPayEvent: null,
      };

      const result = getSelectedPayEvent(state);

      expect(result).toEqual({});
    });
  });

  describe('getLoadPayEventDetailsUrlParams', () => {
    it('should get the Url params to load the pay event details', () => {
      const state = {
        businessId: '123',
        selectedPayEvent: {
          id: '321',
        },
      };

      const result = getLoadPayEventDetailsUrlParams(state);

      const expected = {
        businessId: '123',
        payEventId: '321',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getIsSelectedPayEvent', () => {
    it('should return true if the id matches the selected pay event id', () => {
      const state = {
        selectedPayEvent: {
          id: '123',
        },
      };

      const result = getIsSelectedPayEvent(state, '123');

      expect(result).toEqual(true);
    });

    it('should return false if the id does not match the selected pay event id', () => {
      const state = {
        selectedPayEvent: {
          id: '321',
        },
      };

      const result = getIsSelectedPayEvent(state, '123');

      expect(result).toEqual(false);
    });
  });
});
