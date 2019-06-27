import { getPurchases, getSupplierReturnPurchasePayload, getTotalAmountApplied } from '../SupplierReturnPurchaseSelector';

describe('SupplierReturnPurchaseSelector', () => {
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
  });
});
