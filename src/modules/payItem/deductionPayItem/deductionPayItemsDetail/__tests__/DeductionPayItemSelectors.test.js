import { getSaveDeductionPayItemPayload } from '../DeductionPayItemSelectors';

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
});
