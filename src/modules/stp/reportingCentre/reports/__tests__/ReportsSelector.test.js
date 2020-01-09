import { getFilterPayEventsParams, getPayEvents } from '../ReportsSelector';

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
});
