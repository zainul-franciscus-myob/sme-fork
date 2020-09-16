import {
  getAreModifiedEmployeesValid,
  getEmployeeBenefitReportContent,
  isTierBlankOrSuggested,
} from '../JobKeeperSelector';

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

  describe('isTierBlankOrSuggested', () => {
    ['', NaN, undefined, null].forEach((value) => {
      it(`return true when teir is: ${value}`, () => {
        expect(isTierBlankOrSuggested(value)).toBe(true);
      });
    });
    it(`return false when teir is not empty`, () => {
      expect(isTierBlankOrSuggested('01')).toBe(false);
    });
  });
  describe('getAreModifiedEmployeesValid', () => {
    const state = {};
    beforeEach(() => {
      state.employees = [
        {
          lastName: 'Foo',
          payId: 1,
          firstFortnight: '15',
          finalFortnight: '14',
          tier: '01',
          isDirty: false,
        },
        {
          lastName: 'Baz',
          payId: 2,
          firstFortnight: '20',
          finalFortnight: null,
          isDirty: false,
        },
        {
          lastName: 'Baz',
          payId: 3,
          firstFortnight: '04',
          finalFortnight: '20',
          isDirty: false,
        },
      ];
    });

    it('should return false when tier is not selected for start fortnight >= 14', () => {
      state.employees[1].isDirty = true;
      expect(getAreModifiedEmployeesValid(state)).toBe(false);
    });
    it('should return true when tier is selected for start fortnight >= 14 and end fortnight > 14', () => {
      state.employees[0].isDirty = true;
      expect(getAreModifiedEmployeesValid(state)).toBe(true);
    });
    it('should return false when tier is not selected for end fortnight >= 14', () => {
      state.employees[2].isDirty = true;
      expect(getAreModifiedEmployeesValid(state)).toBe(false);
    });
  });
});
