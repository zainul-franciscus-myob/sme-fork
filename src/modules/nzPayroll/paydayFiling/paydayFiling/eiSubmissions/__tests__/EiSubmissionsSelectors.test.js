import {
  getPayrollYears,
  getSelectedPayrollYear,
} from '../EiSubmissionsSelector';

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
});
