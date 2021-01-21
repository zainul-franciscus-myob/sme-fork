import {
  getIsLineAmountsTaxInclusive,
  getIsReportableDisabled,
  getLinesForTaxCalculation,
  getRedirectUrl,
  getShouldShowAbn,
  getShowBankStatementText,
  getUniqueSelectedJobIds,
} from '../RecurringSpendMoneySelectors';

describe('RecurringSpendMoneySelectors', () => {
  describe('getIsReportableDisabled', () => {
    it.each([
      ['Customer', true],
      ['Supplier', false],
      ['Employee', true],
      ['Other', true],
    ])(
      'when contact type is %s, it should return %s',
      (contactType, expected) => {
        const id = '1';

        const actual = getIsReportableDisabled.resultFunc(id, contactType);

        expect(actual).toEqual(expected);
      }
    );

    it('should be disabled if contact has not been selected', () => {
      const id = '';
      const contactType = 'Supplier';

      const actual = getIsReportableDisabled.resultFunc(id, contactType);

      expect(actual).toBeTruthy();
    });
  });

  describe('getIsLineAmountsTaxInclusive', () => {
    it('should flip isLineAmountsTaxInclusive if the user is toggling the tax inclusive button', () => {
      const isTaxInclusive = true;
      const isSwitchingTaxInclusive = true;

      const actual = getIsLineAmountsTaxInclusive(
        isTaxInclusive,
        isSwitchingTaxInclusive
      );

      expect(actual).toEqual(false);
    });

    it('should not flip isLineAmountsTaxInclusive if the user is toggling the tax inclusive button', () => {
      const isTaxInclusive = true;
      const isSwitchingTaxInclusive = false;

      const actual = getIsLineAmountsTaxInclusive(
        isTaxInclusive,
        isSwitchingTaxInclusive
      );

      expect(actual).toEqual(true);
    });
  });

  describe('getLinesForTaxCalculation', () => {
    it('should format lines to be useable by the tax calculator', () => {
      const state = {
        spendMoney: {
          lines: [
            {
              id: '1',
              lineSubTypeId: '6',
            },
          ],
        },
      };

      const actual = getLinesForTaxCalculation(state);

      expect(actual[0].lineTypeId).toEqual('6');
    });
  });

  describe('getShowBankStatementText', () => {
    it('should show bank statement text when selected pay to account id matches electronic cleared account id', () => {
      const state = {
        spendMoney: {
          payFromAccountId: '1',
        },
        electronicClearingAccountId: '1',
      };

      const showBankStatementText = getShowBankStatementText(state);

      expect(showBankStatementText).toEqual(true);
    });

    it("should not show bank statement text when selected pay to account id doesn't match electronic cleared account id", () => {
      const state = {
        spendMoney: {
          payFromAccountId: '2',
        },
        electronicClearingAccountId: '1',
      };

      const showBankStatementText = getShowBankStatementText(state);

      expect(showBankStatementText).toEqual(false);
    });
  });

  describe('getShouldShowAbn', () => {
    it('should show ABN for 🦘 business', () => {
      const state = {
        abn: '1234',
        region: 'au',
      };
      const shouldShowAbn = getShouldShowAbn(state);

      expect(shouldShowAbn).toEqual(true);
    });

    it('should show ABN for 🇳🇿 business', () => {
      const state = {
        abn: '1234',
        region: 'nz',
      };
      const shouldShowAbn = getShouldShowAbn(state);

      expect(shouldShowAbn).toEqual(false);
    });
  });

  describe('getUniqueSelectedJobIds', () => {
    it('should return unique ids only', () => {
      const state = {
        spendMoney: { lines: [{ jobId: 123 }, { jobId: 123 }, { jobId: 1 }] },
      };
      const uniqueIds = getUniqueSelectedJobIds(state);

      expect(uniqueIds).toEqual([123, 1]);
    });

    it('should return empty when no lines', () => {
      const state = {
        spendMoney: { lines: [] },
      };
      const uniqueIds = getUniqueSelectedJobIds(state);

      expect(uniqueIds).toEqual([]);
    });
  });

  describe('getRedirectUrl', () => {
    it('should return recurring transaction list URL if there is no no modal url', () => {
      const actual = getRedirectUrl.resultFunc('', '/#/au/123/transactionList');

      expect(actual).toEqual('/#/au/123/transactionList');
    });

    it('should return modal url if there is modal url', () => {
      const actual = getRedirectUrl.resultFunc(
        'modalUrl',
        '/#/au/123/transactionList'
      );

      expect(actual).toEqual('modalUrl');
    });
  });
});
