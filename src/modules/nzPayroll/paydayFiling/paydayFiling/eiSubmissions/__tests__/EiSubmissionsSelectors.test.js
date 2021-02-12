import {
  getFilterEiSubmissionsParams,
  getIsTableLoading,
  getPayRuns,
  getPayrollYears,
  getSelectedPayrollYear,
} from '../EiSubmissionsSelector';
import formatDateTime from '../../../../../../common/valueFormatters/formatDate/formatDateTime';

describe('EiSubmissionSelectors', () => {
  describe('getPayrollYears', () => {
    it('should get payroll years', () => {
      const payrollYears = [
        {
          label: '2020/21',
          year: '2021',
          startDate: '2020-04-01',
          endDate: '2021-03-31',
        },
        {
          label: '2019/20',
          year: '2020',
          startDate: '2019-04-01',
          endDate: '2020-03-31',
        },
        {
          label: '2018/19',
          year: '2019',
          startDate: '2018-04-01',
          endDate: '2019-03-31',
        },
      ];

      const state = { eiSubmissions: { payrollYears } };

      const result = getPayrollYears(state);

      expect(result).toEqual(payrollYears);
    });
  });

  describe('getSelectedPayrollYear', () => {
    it('should get selected payroll year', () => {
      const selectedPayrollYear = '2021';

      const state = { eiSubmissions: { selectedPayrollYear } };

      const result = getSelectedPayrollYear(state);

      expect(result).toEqual(selectedPayrollYear);
    });
  });

  describe('getIsTableLoading', () => {
    it('should get the table loading state', () => {
      const isTableLoading = true;

      const state = { eiSubmissions: { isTableLoading } };

      const result = getIsTableLoading(state);

      expect(result).toEqual(true);
    });
  });

  describe('getFilterEiSubmissionsParams', () => {
    it('should get query params for filtered ei submissions', () => {
      const selectedPayrollYear = '2020';
      const payrollYears = [
        {
          label: '2020/21',
          year: '2021',
          startDate: '2020-04-01',
          endDate: '2021-03-31',
        },
        {
          label: '2019/20',
          year: '2020',
          startDate: '2019-04-01',
          endDate: '2020-03-31',
        },
        {
          label: '2018/19',
          year: '2019',
          startDate: '2018-04-01',
          endDate: '2019-03-31',
        },
      ];
      const state = { eiSubmissions: { selectedPayrollYear, payrollYears } };

      const expected = {
        startDate: '2019-04-01',
        endDate: '2020-03-31',
      };

      const result = getFilterEiSubmissionsParams(state);

      expect(result).toEqual(expected);
    });
  });

  describe('getPayRuns', () => {
    [
      {
        status: 'Not submitted',
        colour: 'orange',
      },
      {
        status: 'Submitting',
        colour: 'blue',
      },
      {
        status: 'Submitted',
        colour: 'green',
      },
      {
        status: 'Error',
        colour: 'red',
      },
      {
        status: 'Rejected',
        colour: 'red',
      },
    ].forEach(({ status, colour }) => {
      it(`should get payrun with status ${status}`, () => {
        const payRuns = [
          {
            id: '1234d3e7-4c5b-4a50-a114-3e652c123456',
            payPeriod: '01/10/2020 - 15/10/2020',
            payOnDate: '01/10/2020',
            dateRecorded: '2020-10-01T07:18:14.174Z',
            totalPaye: '3,400.00',
            totalGross: '13,340.00',
            employeeCount: 2,
            status,
            username: 'payday@mailinator.com',
            responseCode: '1',
            submissionKey: '',
            detail: 'Error code 1: Unauthorised delegation',
          },
        ];

        const expected = [
          {
            id: '1234d3e7-4c5b-4a50-a114-3e652c123456',
            payPeriod: '01/10/2020 - 15/10/2020',
            payOnDate: '01/10/2020',
            dateRecorded: formatDateTime('2020-10-01T07:18:14.174Z'),
            totalPaye: '3,400.00',
            totalGross: '13,340.00',
            employeeCount: 2,
            status: {
              label: status,
              colour,
            },
            username: 'payday@mailinator.com',
            responseCode: '1',
            submissionKey: '',
            detail: 'Error code 1: Unauthorised delegation',
          },
        ];

        const state = { eiSubmissions: { payRuns } };

        const result = getPayRuns(state);

        expect(result).toEqual(expected);
      });
    });
  });
});
