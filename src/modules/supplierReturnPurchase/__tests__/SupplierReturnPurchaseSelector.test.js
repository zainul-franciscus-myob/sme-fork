import {
  getPageTitle, getPurchases, getSupplierReturnPurchasePayload, getTotalAmountApplied,
} from '../SupplierReturnPurchaseSelector';

describe('SupplierReturnPurchaseSelector', () => {
  describe('getPageTitle', () => {
    it('returns the right page title for create', () => {
      const state = {
        supplierReturnPurchase: {
          referenceId: '',
        },
        supplierReturnId: 1,
      };

      const actual = getPageTitle(state);
      const expected = 'Apply supplier debit to purchase';

      expect(actual).toEqual(expected);
    });

    it('returns the right page title for read', () => {
      const state = {
        supplierReturnPurchase: {
          referenceId: '123',
        },
      };

      const actual = getPageTitle(state);
      const expected = 'Supplier debit applied to purchase 123';

      expect(actual).toEqual(expected);
    });
  });

  describe('getTotalAmountApplied', () => {
    it('should calculate a positive total amount applied', () => {
      const state = {
        supplierReturnId: '1',
        supplierReturnPurchase: {
          purchases: [
            {
              amountApplied: '50.55',
            },
          ],
        },
      };

      const actual = getTotalAmountApplied(state);

      expect(actual).toEqual('$50.55');
    });

    it('should calculate a negative total amount applied', () => {
      const state = {
        supplierReturnId: '1',
        supplierReturnPurchase: {
          purchases: [
            {
              amountApplied: '100.55',
            },
          ],
        },
      };

      const actual = getTotalAmountApplied(state);

      expect(actual).toEqual('$100.55');
    });

    it('should handle if amount applied is a hypen', () => {
      const state = {
        supplierReturnId: '1',
        supplierReturnPurchase: {
          purchases: [
            {
              amountApplied: '-',
            },
          ],
          debitAmount: '55.55',
        },
      };

      const actual = getTotalAmountApplied(state);

      expect(actual).toEqual('$0.00');
    });
  });

  describe('getPurchases', () => {
    it('should calculate the owed amount for a purchase', () => {
      const state = {
        supplierReturnId: '1',
        supplierReturnPurchase: {
          purchases: [
            {
              amount: '100.00',
              discount: '45.12',
            },
          ],
        },
      };

      const actual = getPurchases(state);

      expect(actual[0].owed).toEqual('54.88');
    });

    it('should handle if discount is a hyphen for a purchase', () => {
      const state = {
        supplierReturnId: '1',
        supplierReturnPurchase: {
          purchases: [
            {
              amount: '100.00',
              discount: '-',
            },
          ],
        },
      };

      const actual = getPurchases(state);

      expect(actual[0].owed).toEqual('100.00');
    });

    [
      {
        status: 'Open',
        labelColour: 'light-grey',
      },
      {
        status: 'Closed',
        labelColour: 'green',
      },
    ].forEach((test) => {
      it(`returns ${test.labelColour} colour for ${test.status} status`, () => {
        const state = {
          supplierReturnPurchase: {
            purchases: [
              {
                status: test.status,
              },
            ],
          },
        };

        const actual = getPurchases(state);

        expect(actual[0].statusLabelColour).toEqual(test.labelColour);
      });
    });
  });

  describe('getSupplierReturnPurchasePayload', () => {
    it('should filter out purchases that have an amountApplied that are empty', () => {
      const state = {
        supplierReturnId: '1',
        supplierReturnPurchase: {
          purchases: [
            {
              id: '1',
              discount: '',
              amountApplied: '100.00',
            },
            {
              amountApplied: '',
            },
          ],
        },
      };

      const actual = getSupplierReturnPurchasePayload(state);

      expect(actual.purchases[0].amountApplied).toEqual('100.00');
    });

    it('should include the referenceId if it\'s different to the original', () => {
      const state = {
        supplierReturnPurchase: {
          referenceId: 'hi',
          originalReferenceId: 'not hi',
          purchases: [],
        },
      };

      const actual = getSupplierReturnPurchasePayload(state);

      expect(actual.referenceId).toEqual('hi');
    });

    it('should not include the referenceId if it\'s the same as the original', () => {
      const state = {
        supplierReturnPurchase: {
          referenceId: 'hi',
          originalReferenceId: 'hi',
          purchases: [],
        },
      };

      const actual = getSupplierReturnPurchasePayload(state);

      expect(actual.referenceId).toBeUndefined();
    });
  });
});
