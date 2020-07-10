import {
  getFilteredEmployees,
  getFilteredExemptions,
  getFilteredLinkedWages,
  getLeavePayItemPayload,
} from '../leavePayItemSelectors';

describe('leavePayItemSelectors', () => {
  describe('getFilteredEmployees', () => {
    it('should not contain employees who have already been allocated to a leave pay item', () => {
      const employees = [{ id: '1' }, { id: '2' }];
      const selectedEmployees = [{ id: '1' }];

      const actual = getFilteredEmployees.resultFunc(
        employees,
        selectedEmployees
      );

      const expected = [{ id: '2' }];

      expect(actual).toEqual(expected);
    });
  });

  describe('getFilteredExemptions', () => {
    it('should not contain exemptions that have already been allocated to a leave pay item', () => {
      const exemptionOptions = [{ id: '1' }, { id: '2' }];
      const selectedExemptions = [{ id: '1' }];

      const actual = getFilteredExemptions.resultFunc(
        exemptionOptions,
        selectedExemptions
      );

      const expected = [{ id: '2' }];

      expect(actual).toEqual(expected);
    });
  });

  describe('getFilteredLinkedWages', () => {
    it('should not contain linked wages that have already been allocated to a leave pay item', () => {
      const linkedWagesOptions = [{ id: '1' }, { id: '2' }];
      const selectedLinkedWages = [{ id: '1' }];

      const actual = getFilteredLinkedWages.resultFunc(
        linkedWagesOptions,
        selectedLinkedWages
      );

      const expected = [{ id: '2' }];

      expect(actual).toEqual(expected);
    });
  });

  describe('getLeavePayItemPayload', () => {
    it('should create the payload for a create and update of a leave pay item', () => {
      const state = {
        leavePayItem: {
          name: 'Annual Leave',
          printOnPaySlip: false,
          carryRemainingLeave: true,
          calculationBasisType: 'PercentOfPayrollCategory',
          calculationBasisPercentage: '5.00',
          calculationBasisPayItemId: '2',
          calculationBasisAmount: '75.00',
          calculationBasisPeriod: 'Month',
          selectedExemptions: [
            {
              id: '51',
              name: 'Exemption 1',
              mappedType: 'Wages',
            },
          ],
          selectedEmployees: [
            {
              name: 'Pritchett, Jay',
              id: '21',
            },
          ],
          selectedLinkedWages: [
            {
              id: '51',
              name: 'Exemption 1',
            },
          ],
        },
        calculationBasisPercentOfOptions: [
          {
            id: '2',
            name: 'Gross hours',
            mappedType: 'HourlyGroup',
          },
          {
            id: '3',
            name: 'Federal hours',
            mappedType: 'Wages',
          },
        ],
      };

      const actual = getLeavePayItemPayload(state);

      const expected = {
        name: 'Annual Leave',
        printOnPaySlip: false,
        carryRemainingLeave: true,
        calculationBasisType: 'PercentOfPayrollCategory',
        calculationBasisPercentage: '5.00',
        calculationBasisPayItemId: '2',
        calculationBasisPayItemType: 'HourlyGroup',
        calculationBasisAmount: '75.00',
        calculationBasisPeriod: 'Month',
        selectedExemptions: [
          {
            id: '51',
            name: 'Exemption 1',
            mappedType: 'Wages',
          },
        ],
        selectedEmployees: ['21'],
        selectedLinkedWages: ['51'],
      };

      expect(actual).toEqual(expected);
    });

    it('should set calculationBasisPayItemType to undefined if calculationBasisPayItemId cannot be found', () => {
      const state = {
        leavePayItem: {
          calculationBasisPayItemId: '',
          selectedExemptions: [],
          selectedEmployees: [],
          selectedLinkedWages: [],
        },
        calculationBasisPercentOfOptions: [
          {
            id: '2',
            name: 'Gross hours',
            mappedType: 'HourlyGroup',
          },
        ],
      };

      const actual = getLeavePayItemPayload(state);

      expect(actual.calculationBasisPayItemType).toEqual(undefined);
    });
  });
});
