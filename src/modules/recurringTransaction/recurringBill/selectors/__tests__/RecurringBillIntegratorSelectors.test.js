import {
  getCalculateLineContent,
  getCreateOrUpdateRecurringBillContent,
  getCreateOrUpdateRecurringBillUrlParams,
  getLoadAccountUrlParams,
  getLoadBillLineContent,
  getLoadItemParams,
  getLoadRecurringBillUrlParams,
} from '../RecurringBillIntegratorSelectors';

describe('IntegratorSelectors', () => {
  describe('getLoadRecurringBillUrlParams', () => {
    it('returns businessId and recurringTransactionId when not creating', () => {
      const state = {
        businessId: 'a',
        recurringTransactionId: '1',
      };

      const actual = getLoadRecurringBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
        recurringTransactionId: '1',
      });
    });
  });

  describe('getSaveRecurringBillUrlParams', () => {
    it('returns businessId and recurringTransactionId when not creating', () => {
      const state = {
        businessId: 'a',
        recurringTransactionId: 'b',
      };

      const actual = getCreateOrUpdateRecurringBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
        recurringTransactionId: 'b',
      });
    });

    it('returns businessId when creating', () => {
      const state = {
        businessId: 'a',
        recurringTransactionId: 'new',
      };

      const actual = getCreateOrUpdateRecurringBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
      });
    });
  });

  describe('getSaveRecurringBillContent', () => {
    const state = {
      schedule: {
        something: 'something',
      },
      bill: {
        layout: 'item',
        stuff: 'stuff',
        supplierId: '1',
      },
    };

    it('append layout to bill', () => {
      const actual = getCreateOrUpdateRecurringBillContent(state);

      expect(actual).toEqual({
        schedule: {
          something: 'something',
        },
        bill: {
          stuff: 'stuff',
          supplierId: '1',
          layout: 'item',
        },
      });
    });
  });

  describe('getLoadAddedAccountUrlParams', () => {
    const state = {
      businessId: 'batman',
    };

    it('gets businessId and retruns it with accountId', () => {
      const actual = getLoadAccountUrlParams(state, 'accountId');

      expect(actual).toEqual({
        accountId: 'accountId',
        businessId: 'batman',
      });
    });
  });

  describe('get line totals calculate request payload', () => {
    const lines = [
      {
        id: '1',
        units: '2',
        itemId: '3',
        description: 'Cooler Large',
        unitPrice: '520',
        discount: '10',
        taxCodeId: '2',
        amount: '850.9111',
        accountId: '92',
      },
    ];

    const state = {
      bill: {
        layout: 'someLayout',
        isTaxInclusive: true,
        lines,
      },
    };

    describe('getCalculateRecurringBillItemChangeContent', () => {
      it('should build payload for request', () => {
        const index = 0;
        const itemId = '3';

        const expected = {
          index,
          itemId,
          isTaxInclusive: true,
          lines,
        };

        const actual = getLoadBillLineContent(state, {
          index,
          itemId,
        });

        expect(actual).toEqual(expected);
      });
    });

    describe('getCalculateRecurringBillContent', () => {
      it('should build payload for request', () => {
        const expected = {
          isTaxInclusive: true,
          lines,
        };

        const actual = getCalculateLineContent(state);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getCalculateRecurringBillLinesUrlParams', () => {
    it('should return businessId as param', () => {
      const state = {
        businessId: 'someId',
      };
      const actual = getLoadItemParams(state);

      expect(actual).toEqual({
        businessId: 'someId',
      });
    });
  });
});
