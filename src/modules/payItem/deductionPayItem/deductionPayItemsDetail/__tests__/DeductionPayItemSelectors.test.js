import {
  getExemptionAllocations,
  getSaveDeductionPayItemPayload,
  getShowEtpAlert,
} from '../DeductionPayItemSelectors';

describe('deductionPayItemSelector', () => {
  describe('getSaveDeductionPayItemPayload', () => {
    it('should make the payload for the bff', () => {
      const state = {
        details: {
          name: 'Union Fees',
          linkedPayableAccountId: '134',
          atoReportingCategory: 'NotSet',
        },
        information: {
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
        employeeAllocations: {
          selectedEmployees: [
            {
              name: 'Calie Mory',
              id: '1',
            },
          ],
        },
        exemptionAllocations: {
          selectedExemptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Tax',
            },
          ],
        },
      };

      const payload = getSaveDeductionPayItemPayload(state);

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
        selectedEmployees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
        ],
        selectedExemptions: [
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

  describe('isSelectedExemptionPayGWithholding', () => {
    it('should return true if selected exemption has PayG Withholding exemption', () => {
      const state = {
        exemptionAllocations: {
          selectedExemptions: [
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
          exemptions: [],
        },
      };

      const exemptionAllocations = getExemptionAllocations(state);
      expect(exemptionAllocations.isSelectedExemptionPayGWithholding).toEqual(
        true
      );
    });

    it('should return false if selected exemption does not have is PayG Withholding exemption', () => {
      const state = {
        exemptionAllocations: {
          selectedExemptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Tax',
            },
          ],
          exemptions: [],
        },
      };

      const exemptionAllocations = getExemptionAllocations(state);
      expect(exemptionAllocations.isSelectedExemptionPayGWithholding).toEqual(
        false
      );
    });

    it('should return false if no exemption is selected', () => {
      const state = {
        exemptionAllocations: {
          selectedExemptions: [],
          exemptions: [],
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
        details: {
          payItemId: 'new',
          atoReportingCategory: '',
          originalDeductionDetails: {
            atoReportingCategory: '',
          },
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });

    it('should not show etp alert if category not changed', () => {
      const state = {
        details: {
          payItemId: '1',
          atoReportingCategory: 'ETPTaxWithholding',
          originalDeductionDetails: {
            atoReportingCategory: 'ETPTaxWithholding',
          },
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });

    it('should show etp alert if update original/assigned pay item to ETP category', () => {
      const state = {
        details: {
          payItemId: '1',
          atoReportingCategory: 'ETPTaxWithholding',
          originalDeductionDetails: {
            atoReportingCategory: 'NotReportable',
          },
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(true);
    });

    it('should not show etp alert if update original/assigned pay item to non-ETP category', () => {
      const state = {
        details: {
          payItemId: '1',
          atoReportingCategory: 'NotReportable',
          originalDeductionDetails: {
            atoReportingCategory: 'ETPTaxWithholding',
          },
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });

    it('should not show etp alert if update un-assigned pay item to ETP category', () => {
      const state = {
        details: {
          payItemId: '1',
          atoReportingCategory: 'ETPTaxWithholding',
          originalDeductionDetails: {
            atoReportingCategory: 'NotSet',
          },
        },
      };

      const result = getShowEtpAlert(state);

      expect(result).toEqual(false);
    });
  });
});
