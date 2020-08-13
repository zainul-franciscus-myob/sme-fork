import {
  getSaveWagePayItemPayload,
  getShowEtpAlert,
} from '../wagePayItemSelector';

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

  describe('getShowEtpAlert', () => {
    it('should not show etp alert if new pay item', () => {
      const state = {
        wage: {
          payItemId: 'new',
          atoReportingCategory: '',
        },
        originalWageValues: {
          atoReportingCategory: '',
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });

    it('should not show etp alert if category not changed', () => {
      const state = {
        wage: {
          payItemId: '1',
          atoReportingCategory: 'ETPTaxableComponent',
        },
        originalWageValues: {
          atoReportingCategory: 'ETPTaxableComponent',
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });

    it('should show etp alert if update original/assigned pay item to ETP category', () => {
      const state = {
        wage: {
          payItemId: '1',
          atoReportingCategory: 'ETPTaxableComponent',
        },
        originalWageValues: {
          atoReportingCategory: 'NotReportable',
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(true);
    });

    it('should show etp alert if update original/assigned pay item to another ETP category', () => {
      const state = {
        wage: {
          payItemId: '1',
          atoReportingCategory: 'ETPTaxableComponent',
        },
        originalWageValues: {
          atoReportingCategory: 'ETPTaxFreeComponent',
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(true);
    });

    it('should not show etp alert if update original/assigned pay item to non-ETP category', () => {
      const state = {
        wage: {
          payItemId: '1',
          atoReportingCategory: 'NotReportable',
        },
        originalWageValues: {
          atoReportingCategory: 'ETPTaxFreeComponent',
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });

    it('should not show etp alert if update un-assigned pay item to ETP category', () => {
      const state = {
        wage: {
          payItemId: '1',
          atoReportingCategory: 'ETPTaxFreeComponent',
        },
        originalWageValues: {
          atoReportingCategory: 'NotSet',
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });
  });
});
