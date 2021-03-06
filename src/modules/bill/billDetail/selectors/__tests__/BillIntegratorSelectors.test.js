import {
  CREATE_BILL,
  CREATE_PRE_CONVERSION_BILL_DETAIL,
  LOAD_BILL,
  LOAD_NEW_BILL,
  LOAD_NEW_BILL_DETAIL_FROM_ORDER,
  LOAD_NEW_DUPLICATE_BILL,
  UPDATE_BILL,
  UPDATE_PRE_CONVERSION_BILL_DETAIL,
} from '../../BillIntents';
import {
  getCalculateBillContent,
  getCalculateBillItemChangeContent,
  getCalculateBillLinesUrlParams,
  getDeletePreConversionBillUrlParams,
  getLinkInTrayContentWithoutIds,
  getLoadAddedAccountUrlParams,
  getLoadBillIntent,
  getLoadBillUrlParams,
  getSaveBillContent,
  getSaveBillIntent,
  getSaveBillUrlParams,
  getSavePreConversionBillContent,
  getSavePreConversionBillIntent,
  getSavePreConversionBillUrlParams,
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
        duplicateId: '2',
      };

      const actual = getLoadBillIntent(state);

      expect(actual).toEqual(LOAD_NEW_DUPLICATE_BILL);
    });

    it('returns LOAD_NEW_BILL_DETAIL_FROM_ORDER when creating bill from a purchase order', () => {
      const state = {
        billId: 'new',
        orderId: 1,
      };
      const actual = getLoadBillIntent(state);
      expect(actual).toEqual(LOAD_NEW_BILL_DETAIL_FROM_ORDER);
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

    it('returns businessId and orderId when creating without duplicate id', () => {
      const state = {
        businessId: 'a',
        billId: 'new',
        orderId: 2,
      };

      const actual = getLoadBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
        orderId: 2,
      });
    });

    it('returns LOAD_NEW_DUPLICATE_BILL when creating duplicate', () => {
      const state = {
        businessId: 'a',
        billId: 'new',
        duplicateId: '2',
      };

      const actual = getLoadBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
        duplicateId: '2',
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
      bill: {
        layout: 'item',
        stuff: 'stuff',
        supplierId: '1',
      },
    };

    it('append layout to bill', () => {
      const actual = getSaveBillContent(state);

      expect(actual).toEqual({
        stuff: 'stuff',
        supplierId: '1',
        layout: 'item',
      });
    });
  });

  describe('getSavePreConversionBillIntent', () => {
    it('returns create Intent when creating', () => {
      const state = {
        billId: 'new',
      };

      const actual = getSavePreConversionBillIntent(state);

      expect(actual).toEqual(CREATE_PRE_CONVERSION_BILL_DETAIL);
    });

    it('returns UPDATE intent when not creating', () => {
      const state = {
        billId: '1',
      };

      const actual = getSavePreConversionBillIntent(state);

      expect(actual).toEqual(UPDATE_PRE_CONVERSION_BILL_DETAIL);
    });
  });

  describe('getSavePreConversionBillUrlParams', () => {
    it('returns businessId and billId when not creating', () => {
      const state = {
        businessId: 'a',
        billId: 'b',
      };

      const actual = getSavePreConversionBillUrlParams(state);

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

      const actual = getSavePreConversionBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
      });
    });
  });

  describe('getSavePreConversionBillContent', () => {
    it('returns the right request body', () => {
      const bill = {
        supplierId: 'suppId',
        supplierAddress: 'suppAddr',
        issueDate: '01/01/2000',
        supplierInvoiceNumber: 'ROM001',
        billNumber: 'BIL001',
        isTaxInclusive: true,
        expirationTerm: 'OnADayOfTheMonth',
        expirationDays: '4',
      };
      const state = { bill };

      const actual = getSavePreConversionBillContent(state);
      expect(actual).toEqual(bill);
    });
  });

  describe('getDeletePreConversionBillUrlParams', () => {
    it('returns businessId and billId', () => {
      const state = {
        businessId: 'a',
        billId: 'b',
      };

      const actual = getDeletePreConversionBillUrlParams(state);

      expect(actual).toEqual({
        businessId: 'a',
        billId: 'b',
      });
    });
  });

  describe('getLoadAddedAccountUrlParams', () => {
    const state = {
      businessId: 'batman',
    };

    it('gets businessId and retruns it with accountId', () => {
      const actual = getLoadAddedAccountUrlParams(state, 'accountId');

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
        amountPaid: '10.00',
        lines,
      },
    };

    describe('getCalculateBillItemChangeContent', () => {
      it('should build payload for request', () => {
        const index = 0;
        const itemId = '3';

        const expected = {
          index,
          itemId,
          isTaxInclusive: true,
          amountPaid: '10.00',
          lines,
        };

        const actual = getCalculateBillItemChangeContent(state, {
          index,
          itemId,
        });

        expect(actual).toEqual(expected);
      });
    });

    describe('getCalculateBillContent', () => {
      it('should build payload for request', () => {
        const expected = {
          isTaxInclusive: true,
          amountPaid: '10.00',
          lines,
        };

        const actual = getCalculateBillContent(state);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getCalculateBillLinesUrlParams', () => {
    it('should return businessId as param', () => {
      const state = {
        businessId: 'someId',
      };
      const actual = getCalculateBillLinesUrlParams(state);

      expect(actual).toEqual({
        businessId: 'someId',
      });
    });
  });

  describe('getLinkInTrayContentWithoutIds', () => {
    const state = {
      inTrayDocumentId: 'abc',
      bill: {
        supplierId: '1',
        expenseAccountId: '2',
      },
    };

    it('should return expenseAccountId if isCreatingFromInTray', () => {
      const modifiedState = {
        ...state,
        billId: 'new',
        source: 'inTray',
      };

      const actual = getLinkInTrayContentWithoutIds(modifiedState);

      expect(actual).toEqual({
        inTrayDocumentId: 'abc',
        supplierId: '1',
        expenseAccountId: '2',
      });
    });

    it('should not return expenseAccountId if creating new not from in tray', () => {
      const modifiedState = {
        ...state,
        billId: 'new',
        source: 'notInTray',
      };

      const actual = getLinkInTrayContentWithoutIds(modifiedState);

      expect(actual).toEqual({
        inTrayDocumentId: 'abc',
        supplierId: '1',
      });
    });

    it('should not return expenseAccountId if linking an existing bill', () => {
      const modifiedState = {
        ...state,
        billId: '1',
      };

      const actual = getLinkInTrayContentWithoutIds(modifiedState);

      expect(actual).toEqual({
        inTrayDocumentId: 'abc',
        supplierId: '1',
      });
    });
  });
});
