import { getPayrollEntries } from '../DashboardPayrollSelectors';

describe('DashboardPayrollSelectors', () => {
  describe('getPayrollEntries', () => {
    it('should transform entry', () => {
      const state = {
        payroll: {
          isPayrollSetup: true,
          entries: [
            {
              id: '1',
              dateFrom: '2020-05-19',
              dateTo: '2020-05-25',
              isDraft: true,
              dateOfPayment: '',
              amount: '',
            },
            {
              id: '2',
              dateFrom: '2020-05-26',
              dateTo: '2020-06-01',
              isDraft: false,
              dateOfPayment: '2020-05-27',
              amount: '$16,134.77',
            },
            {
              id: '3',
              dateFrom: '2020-12-26',
              dateTo: '2021-01-01',
              isDraft: false,
              dateOfPayment: '2020-05-27',
              amount: '$16,134.77',
            },
          ],
        },
      };

      const expected = [
        {
          id: '1',
          date: 'Tue 19 - Mon 25 May',
          isDraft: true,
          formatedPaymentDate: '',
          amount: '',
        },
        {
          id: '2',
          date: 'Tue 26 May - Mon 1 Jun',
          isDraft: false,
          formatedPaymentDate: 'Date of payment Wed 27 May',
          amount: '$16,134.77',
        },
        {
          id: '3',
          date: 'Sat 26 Dec - Fri 1 Jan',
          isDraft: false,
          formatedPaymentDate: 'Date of payment Wed 27 May',
          amount: '$16,134.77',
        },
      ];

      const actual = getPayrollEntries(state);

      expect(actual).toEqual(expected);
    });
  });
});
