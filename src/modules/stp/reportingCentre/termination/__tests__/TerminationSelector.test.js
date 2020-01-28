import {
  getEmployees,
  getEtpCountText,
  getFilterEmployeesParams,
  getStpDeclarationContext,
  getTerminateEmployeesContent,
  getUnterminateEmployeeContent,
  hasTerminationDate,
} from '../TerminationSelector';

describe('TerminationSelector', () => {
  describe('getEmployees', () => {
    it('should return the employees list with an employeeLink', () => {
      const state = {
        region: 'au',
        businessId: '123',
        employees: [
          {
            id: '1',
            name: 'test1',
          },
          {
            id: '2',
            name: 'test2',
          },
        ],
      };

      const result = getEmployees(state);

      const expected = [
        {
          id: '1',
          name: 'test1',
          employeeLink: '/#/au/123/stp/employeeEtp/1',
        },
        {
          id: '2',
          name: 'test2',
          employeeLink: '/#/au/123/stp/employeeEtp/2',
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('getFilterEmployeesParams', () => {
    it('should get the filter employees params', () => {
      const state = {
        selectedPayrollYear: 2020,
      };

      const result = getFilterEmployeesParams(state);

      const expected = {
        year: 2020,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getStpDeclarationContext', () => {
    it('should get the declaration context', () => {
      const state = {
        businessId: '123',
        eventId: '321',
      };

      const result = getStpDeclarationContext(state);

      const expected = {
        businessId: '123',
        eventId: '321',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('hasTerminationDate', () => {
    it.each([
      ['should return true when terminationDate exists and not edited', '2020-01-01', false, true],
      ['should return false when termindationDate exists but is edited', '2020-01-01', true, false],
      ['should return false when termindationDate does not exist and is not edited', '', false, false],
      ['should return false when termindationDate does not exist and is edited', '', true, false],
    ])('%s', (_, terminationDate, isDirty, expected) => {
      const employee = {
        terminationDate,
        isDirty,
      };

      const result = hasTerminationDate(employee);

      expect(result).toEqual(expected);
    });
  });

  describe('getTerminateEmployeesContent', () => {
    it('should get the termination employees content and only include selected and edited employees', () => {
      const state = {
        eventId: '123',
        employees: [
          {
            id: '1',
            name: 'test1',
            isSelected: false,
            isDirty: false,
          },
          {
            id: '2',
            name: 'test2',
            isSelected: false,
            isDirty: true,
          },
          {
            id: '3',
            name: 'test3',
            isSelected: true,
            isDirty: true,
          },
          {
            id: '4',
            name: 'test4',
            isSelected: true,
            isDirty: false,
          },
        ],
      };

      const result = getTerminateEmployeesContent(state);

      const expected = {
        eventId: '123',
        employees: [
          {
            id: '3',
            isDirty: true,
            isSelected: true,
            name: 'test3',
          },
        ],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getUnterminateEmployeeContent', () => {
    it('should get the unterminate employee content', () => {
      const state = {
        eventId: '123',
      };

      const employee = {
        id: '1',
        name: 'test',
        terminationDate: '2020-01-01',
      };

      const result = getUnterminateEmployeeContent(state, employee);

      const expected = {
        eventId: '123',
        employees: [
          {
            id: '1',
            name: 'test',
            terminationDate: null,
          },
        ],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getEtpCountText', () => {
    it.each([
      ['should return text for no ETPs', 0, 'No payments'],
      ['should return text 1 ETP', 1, '1 payment'],
      ['should return text 2 ETPs', 2, '2 payments'],
      ['should return text 3 ETPs', 3, '3 payments'],
    ])('%s', (_, etpCount, expected) => {
      const result = getEtpCountText(etpCount);

      expect(result).toEqual(expected);
    });
  });
});
