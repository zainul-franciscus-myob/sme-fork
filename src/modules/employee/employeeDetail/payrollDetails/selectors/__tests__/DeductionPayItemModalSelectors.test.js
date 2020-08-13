import {
  getDeductionPayItemModalPayload,
  getExemptionAllocations,
  getFilteredEmployeeOptions,
  getFilteredExemptionOptions,
  getFormattedAmount,
  getFormattedPercentage,
  getShowEtpAlert,
} from '../DeductionPayItemModalSelectors';

describe('DeductionPayItemModalSelectors', () => {
  describe('getDeductionPayItemModalPayload', () => {
    it('should make the payload for the bff', () => {
      const state = {
        deductionPayItemModal: {
          deductionPayItem: {
            name: 'Union Fees',
            linkedPayableAccountId: '134',
            atoReportingCategory: 'NotSet',
            calculationBasis: 'Percent',
            calculationPercentage: '0.00',
            calculationPercentOfId: '33',
            calculationDollars: '0.00',
            calculationPer: 'PayPeriod',
            limit: 'NoLimit',
            limitPercentage: '0.00',
            limitPercentOfId: '33',
            limitDollars: '0.00',
            limitPer: 'PayPeriod',
            employees: [
              {
                name: 'Calie Mory',
                id: '1',
              },
            ],
            exemptions: [
              {
                name: 'Salary Sacrifice',
                id: '33',
                itemType: 'Tax',
              },
            ],
          },
          calculationPercentOfOptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Wages',
            },
          ],
          limitPercentOfOptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'WagesGroup',
            },
          ],
        },
      };

      const payload = getDeductionPayItemModalPayload(state);

      const expected = {
        name: 'Union Fees',
        linkedPayableAccountId: '134',
        atoReportingCategory: 'NotSet',
        calculationBasis: 'Percent',
        calculationPercentage: '0.00',
        calculationPercentOfId: '33',
        calculationPercentOfType: 'Wages',
        calculationDollars: '0.00',
        calculationPer: 'PayPeriod',
        limit: 'NoLimit',
        limitPercentage: '0.00',
        limitPercentOfId: '33',
        limitPercentOfType: 'WagesGroup',
        limitDollars: '0.00',
        limitPer: 'PayPeriod',
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
        ],
        exemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Tax',
          },
        ],
      };

      expect(payload).toEqual(expected);
    });
  });

  describe('getFormattedAmount', () => {
    it.each([
      ['', '0.00'],
      ['.', '0.00'],
      ['.1', '0.10'],
      ['.12', '0.12'],
      ['.123', '0.12'],
      ['1.', '1.00'],
      ['-1', '-1.00'],
    ])('should format %s to %s', (value, expected) => {
      const actual = getFormattedAmount(value);

      expect(actual).toEqual(expected);
    });
  });

  describe('getFormattedPercentage', () => {
    it.each([
      ['', '0.00'],
      ['.', '0.00'],
      ['.1', '0.10'],
      ['.12', '0.12'],
      ['.123', '0.123'],
      ['1.', '1.00'],
      ['-1', '-1.00'],
    ])('should format %s to %s', (value, expected) => {
      const actual = getFormattedPercentage(value);

      expect(actual).toEqual(expected);
    });
  });

  describe('getFilteredEmployees', () => {
    it('should not contain employees who has already been allocated', () => {
      const employees = [{ id: '1' }, { id: '2' }];
      const selectedEmployees = [{ id: '1' }];

      const actual = getFilteredEmployeeOptions.resultFunc(
        employees,
        selectedEmployees
      );

      expect(actual.find((item) => item.id === '1')).toBeFalsy();
      expect(actual.find((item) => item.id === '2')).toBeDefined();
    });
  });

  describe('getFilteredExemptions', () => {
    it('should not contain exemption that has already been added', () => {
      const exemptions = [{ id: '1' }, { id: '2' }];
      const selectedExemptions = [{ id: '1' }];

      const actual = getFilteredExemptionOptions.resultFunc(
        exemptions,
        selectedExemptions
      );

      expect(actual.find((item) => item.id === '1')).toBeFalsy();
      expect(actual.find((item) => item.id === '2')).toBeDefined();
    });
  });

  describe('isSelectedExemptionPayGWithholding', () => {
    it('should return true if selected exemption has PayG Withholding exemption', () => {
      const state = {
        deductionPayItemModal: {
          deductionPayItem: {
            exemptions: [
              {
                name: 'PAYG Withholding',
                id: '33',
                itemType: 'Tax',
              },
              {
                name: 'Salary Sacrifice',
                id: '33',
                itemType: 'Tax',
              },
            ],
          },
          exemptionOptions: [],
        },
      };

      const exemptionAllocations = getExemptionAllocations(state);
      expect(exemptionAllocations.isSelectedExemptionPayGWithholding).toEqual(
        true
      );
    });

    it('should return false if selected exemption does not have is PayG Withholding exemption', () => {
      const state = {
        deductionPayItemModal: {
          deductionPayItem: {
            exemptions: [
              {
                name: 'Salary Sacrifice',
                id: '33',
                itemType: 'Tax',
              },
            ],
          },
          exemptionOptions: [],
        },
      };

      const exemptionAllocations = getExemptionAllocations(state);
      expect(exemptionAllocations.isSelectedExemptionPayGWithholding).toEqual(
        false
      );
    });

    it('should return false if no exemption is selected', () => {
      const state = {
        deductionPayItemModal: {
          deductionPayItem: {
            exemptions: [],
          },
          exemptionOptions: [],
        },
      };

      const exemptionAllocations = getExemptionAllocations(state);
      expect(exemptionAllocations.isSelectedExemptionPayGWithholding).toEqual(
        false
      );
    });
  });

  describe('getShowEtpAlert', () => {
    it('should not show etp alert if new pay item', () => {
      const state = {
        deductionPayItemModal: {
          deductionPayItem: {
            id: 'new',
            atoReportingCategory: '',
          },
          originalDeductionPayItem: {
            atoReportingCategory: '',
          },
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });

    it('should not show etp alert if category not changed', () => {
      const state = {
        deductionPayItemModal: {
          deductionPayItem: {
            id: '1',
            atoReportingCategory: 'ETPTaxWithholding',
          },
          originalDeductionPayItem: {
            atoReportingCategory: 'ETPTaxWithholding',
          },
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });

    it('should show etp alert if update original/assigned pay item to ETP category', () => {
      const state = {
        deductionPayItemModal: {
          deductionPayItem: {
            id: '1',
            atoReportingCategory: 'ETPTaxWithholding',
          },
          originalDeductionPayItem: {
            atoReportingCategory: 'NotReportable',
          },
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(true);
    });

    it('should not show etp alert if update original/assigned pay item to non-ETP category', () => {
      const state = {
        deductionPayItemModal: {
          deductionPayItem: {
            id: '1',
            atoReportingCategory: 'NotReportable',
          },
          originalDeductionPayItem: {
            atoReportingCategory: 'ETPTaxWithholding',
          },
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });

    it('should not show etp alert if update un-assigned pay item to ETP category', () => {
      const state = {
        deductionPayItemModal: {
          deductionPayItem: {
            id: '1',
            atoReportingCategory: 'ETPTaxWithholding',
          },
          originalDeductionPayItem: {
            atoReportingCategory: 'NotSet',
          },
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });
  });
});
