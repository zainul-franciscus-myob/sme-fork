import {
  CREATE_BILL, LOAD_BILL, LOAD_NEW_BILL, LOAD_NEW_DUPLICATE_BILL, UPDATE_BILL,
} from '../../BillIntents';
import {
  getLoadAddedAccountUrlParams,
  getLoadBillIntent,
  getLoadBillUrlParams,
  getSaveBillContent,
  getSaveBillIntent,
  getSaveBillUrlParams,
} from '../BillIntegratorSelectors';

describe('IntegratorSelectors', () => {
  describe('getLoadBillIntent', () => {
    it('returns LOAD_BILL when not creating', () => {
      const state = {
        billId: '1',
      };

      const actual = getLoadBillIntent(state);

      expect(actual).toEqual(LOAD_BILL);
    });

    it('returns LOAD_NEW_BILL when creating', () => {
      const state = {
        billId: 'new',
      };

      const actual = getLoadBillIntent(state);

      expect(actual).toEqual(LOAD_NEW_BILL);
    });

    it('returns LOAD_NEW_DUPLICATE_BILL when creating duplicate', () => {
      const state = {
        billId: 'new',
        duplicatedBillId: '2',
      };

      const actual = getLoadBillIntent(state);

      expect(actual).toEqual(LOAD_NEW_DUPLICATE_BILL);
    });
  });

  describe('getLoadBillUrlParams', () => {
    it('returns businessId and billId when not creating', () => {
      const state = {
        businessId: 'a',
        billId: '1',
      };

      const actual = getLoadBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
        billId: '1',
      });
    });

    it('returns LOAD_NEW_BILL when creating', () => {
      const state = {
        businessId: 'a',
        billId: 'new',
      };

      const actual = getLoadBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
      });
    });

    it('returns LOAD_NEW_DUPLICATE_BILL when creating duplicate', () => {
      const state = {
        businessId: 'a',
        billId: 'new',
        duplicatedBillId: '2',
      };

      const actual = getLoadBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
        duplicatedBillId: '2',
      });
    });
  });

  describe('getSaveBillIntent', () => {
    it('returns CREATE_BILL when creating', () => {
      const state = {
        billId: 'new',
      };

      const actual = getSaveBillIntent(state);

      expect(actual).toEqual(CREATE_BILL);
    });

    it('returns UPDATE_BILL when not creating', () => {
      const state = {
        billId: '1',
      };

      const actual = getSaveBillIntent(state);

      expect(actual).toEqual(UPDATE_BILL);
    });
  });

  describe('getSaveBillUrlParams', () => {
    it('returns businessId and billId when not creating', () => {
      const state = {
        businessId: 'a',
        billId: 'b',
      };

      const actual = getSaveBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
        billId: 'b',
      });
    });

    it('returns businessId when creating', () => {
      const state = {
        businessId: 'a',
        billId: 'new',
      };

      const actual = getSaveBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
      });
    });
  });

  describe('getSaveBillContent', () => {
    const state = {
      layout: 'item',
      bill: {
        stuff: 'stuff',
        supplierId: '1',
      },
      supplierOptions: [
        {
          id: '1',
          displayName: 'mayank',
        },
      ],
    };

    it('append layout and supplierName to bill', () => {
      const actual = getSaveBillContent(state);

      expect(actual).toEqual({
        stuff: 'stuff',
        supplierId: '1',
        supplierName: 'mayank',
        layout: 'item',
      });
    });

    it('returns empty supplier name when no supplier selected', () => {
      const modifiedState = {
        ...state,
        bill: {
          ...state.bill,
          supplierId: '',
        },
      };

      const actual = getSaveBillContent(modifiedState);

      expect(actual.supplierName).toEqual('');
    });
  });
  describe('getLoadAddedAccountUrlParams', () => {
    const state = {
      businessId: 'batman',
    };

    it('gets businessId and retruns it with accountId', () => {
      const actual = getLoadAddedAccountUrlParams(state, 'accountId');

      expect(actual).toEqual({
        accountId: 'accountId', businessId: 'batman',
      });
    });
  });
});
