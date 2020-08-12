import { getSaveWagePayItemPayload } from '../wagePayItemSelector';

describe('wagePayItemSelector', () => {
  describe('getSaveWagePayItemPayload', () => {
    it('should make the payload with override account', () => {
      const state = {
        wage: {
          name: 'My wage',
          atoReportingCategory: 'NotReportable',
          payBasis: 'Salary',
          payRate: 'RegularRate',
          payRateMultiplier: '1.0000',
          fixedHourlyPayRate: '0.0000',
          accountId: '134',
          autoAdjustBase: false,
          selectedEmployees: [
            {
              name: 'Calie Mory',
              id: '1',
            },
            {
              name: 'Sylvia Belt',
              id: '2',
            },
          ],
          selectedExemptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Deduction',
            },
            {
              name: 'PAYG Withholding',
              id: '34',
              itemType: 'Tax',
            },
          ],
        },
        overrideAccount: true,
      };

      const payload = getSaveWagePayItemPayload(state);

      const expected = {
        name: 'My wage',
        atoReportingCategory: 'NotReportable',
        payBasis: 'Salary',
        payRate: 'RegularRate',
        payRateMultiplier: '1.0000',
        fixedHourlyPayRate: '0.0000',
        accountId: '134',
        autoAdjustBase: false,
        employeeIds: ['1', '2'],
        exemptions: [
          {
            id: '33',
            type: 'Deduction',
          },
          {
            id: '34',
            type: 'Tax',
          },
        ],
      };

      expect(payload).toEqual(expected);
    });

    it('should make the payload without override account', () => {
      const state = {
        wage: {
          name: 'My wage',
          atoReportingCategory: 'NotReportable',
          payBasis: 'Salary',
          payRate: 'RegularRate',
          payRateMultiplier: '1.0000',
          fixedHourlyPayRate: '0.0000',
          accountId: '134',
          autoAdjustBase: false,
          selectedEmployees: [
            {
              name: 'Calie Mory',
              id: '1',
            },
            {
              name: 'Sylvia Belt',
              id: '2',
            },
          ],
          selectedExemptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Deduction',
            },
            {
              name: 'PAYG Withholding',
              id: '34',
              itemType: 'Tax',
            },
          ],
        },
        overrideAccount: false,
      };

      const payload = getSaveWagePayItemPayload(state);

      const expected = {
        name: 'My wage',
        atoReportingCategory: 'NotReportable',
        payBasis: 'Salary',
        payRate: 'RegularRate',
        payRateMultiplier: '1.0000',
        fixedHourlyPayRate: '0.0000',
        accountId: '',
        autoAdjustBase: false,
        employeeIds: ['1', '2'],
        exemptions: [
          {
            id: '33',
            type: 'Deduction',
          },
          {
            id: '34',
            type: 'Tax',
          },
        ],
      };

      expect(payload).toEqual(expected);
    });
  });
});
