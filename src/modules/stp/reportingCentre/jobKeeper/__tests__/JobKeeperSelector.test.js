import { getEmployeeBenefitReportContent } from '../JobKeeperSelector';

describe('JobKeeperSelector', () => {
  it('should return content for employee benefit report', () => {
    const state = {
      businessId: 'businessId',
      selectedPayrollYear: '2021',
      employees: [
        {
          employeeId: '1001',
          firstName: 'John',
          lastName: 'Doe',
          isSelected: true,
        },
        {
          employeeId: '1002',
          firstName: 'Jane',
          lastName: 'Doe',
          isSelected: true,
        },
        {
          employeeId: '1003',
          firstName: 'Jill',
          lastName: 'Doe',
          isSelected: false,
        },
      ],
    };
    const result = getEmployeeBenefitReportContent(state);

    expect(result.financialYear).toBe(state.selectedPayrollYear);
    expect(result.employeeIds.includes('1001')).toBeTruthy();
    expect(result.employeeIds.includes('1002')).toBeTruthy();
    expect(result.employeeIds.includes('1003')).toBeFalsy();
  });

  it('should return correct financial year for employee benefit report', () => {
    const state = {
      businessId: 'businessId',
      selectedPayrollYear: '',
      payrollYears: [
        {
          year: '2021',
        },
        {
          year: '2020',
        },
      ],
      employees: [
        {
          employeeId: '1001',
          firstName: 'John',
          lastName: 'Doe',
          isSelected: true,
        },
        {
          employeeId: '1002',
          firstName: 'Jane',
          lastName: 'Doe',
          isSelected: true,
        },
        {
          employeeId: '1003',
          firstName: 'Jill',
          lastName: 'Doe',
          isSelected: false,
        },
      ],
    };
    const result = getEmployeeBenefitReportContent(state);

    expect(result.financialYear).toBe(state.payrollYears[0].year);
    expect(result.employeeIds.includes('1001')).toBeTruthy();
    expect(result.employeeIds.includes('1002')).toBeTruthy();
    expect(result.employeeIds.includes('1003')).toBeFalsy();
  });
});
