import { getLoadBillListParams, getSaveBillPaymentPayload, getShouldLoadBillList } from '../BillPaymentDetailSelectors';

describe('BillPaymentSelector', () => {
  describe('getShouldLoadBillList', () => {
    it('Should load pay list if a supplier is selected', () => {
      const key = 'supplierId';
      const value = '1';
      const state = {
        supplierId: '',
        showPaidBills: false,
      };

      const expected = true;
      const actual = getShouldLoadBillList({ key, value })(state);

      expect(actual).toBe(expected);
    });

    it('Should load pay list if showPaidBills is selected and a supplierId had been selected', () => {
      const key = 'showPaidBills';
      const value = true;
      const state = {
        supplierId: '1',
        showPaidBills: false,
      };

      const expected = true;
      const actual = getShouldLoadBillList({ key, value })(state);

      expect(actual).toBe(expected);
    });

    it('Should not load pay list if showPaidBills is selected and a supplierId has not been selected', () => {
      const key = 'showPaidBills';
      const value = true;
      const state = {
        supplierId: '',
        showPaidBills: false,
      };

      const expected = false;
      const actual = getShouldLoadBillList({ key, value })(state);

      expect(actual).toBe(expected);
    });
  });

  describe('getLoadBillListParams', () => {
    it('Should calculate correct params when a supplier is selected', () => {
      const key = 'supplierId';
      const value = '1';
      const state = {
        businessId: '123',
        supplierId: '',
        showPaidBills: false,
      };

      const expected = {
        urlParams: {
          businessId: '123',
          supplierId: '1',
        },
        params: {
          showPaidBills: false,
        },
      };
      const actual = getLoadBillListParams({ key, value })(state);
      expect(actual).toEqual(expected);
    });

    it('Should calculate correct params when showPaidBills is selected', () => {
      const key = 'showPaidBills';
      const value = true;
      const state = {
        businessId: '123',
        supplierId: '1',
        showPaidBills: false,
      };

      const expected = {
        urlParams: {
          businessId: '123',
          supplierId: '1',
        },
        params: {
          showPaidBills: true,
        },
      };
      const actual = getLoadBillListParams({ key, value })(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getSaveBillPaymentPayload', () => {
    it('Should return create payload when creating', () => {
      const state = {
        billPaymentId: 'new',
        date: '2018-11-26',
        referenceId: '000012',
        description: 'Payment to Thi and Cameo',
        accountId: '37',
        supplierId: '102',
        entries: [
          {
            paidAmount: '100.05',
            id: '356',
            discountAmount: '20.85',
          },
        ],
      };

      const expected = {
        date: '2018-11-26',
        referenceId: '000012',
        description: 'Payment to Thi and Cameo',
        accountId: '37',
        supplierId: '102',
        entries: [
          {
            paidAmount: '100.05',
            id: '356',
            discountAmount: '20.85',
          },
        ],
      };

      const actual = getSaveBillPaymentPayload(state);
      expect(actual).toEqual(expected);
    });


    it('Should return create payload of entries with paidAmount applied when creating', () => {
      const state = {
        billPaymentId: 'new',
        date: '2018-11-26',
        referenceId: '000012',
        description: 'Payment to Thi and Cameo',
        accountId: '37',
        supplierId: '102',
        entries: [
          {
            paidAmount: '',
            id: '356',
            discountAmount: '20.85',
          },
          {
            paidAmount: '200.00',
            id: '355',
            discountAmount: '20.05',
          },
        ],
      };

      const expected = {
        date: '2018-11-26',
        referenceId: '000012',
        description: 'Payment to Thi and Cameo',
        accountId: '37',
        supplierId: '102',
        entries: [
          {
            paidAmount: '200.00',
            id: '355',
            discountAmount: '20.05',
          },
        ],
      };

      const actual = getSaveBillPaymentPayload(state);
      expect(actual).toEqual(expected);
    });

    it('Should return update payload when updating', () => {
      const state = {
        billPaymentId: '1',
        date: '2018-11-26',
        referenceId: '000012',
        description: 'Payment to Thi and Cameo',
        accountId: '37',
        supplierId: '102',
        entries: [
          {
            paidAmount: '100.05',
            id: '356',
            discountAmount: '20.85',
          },
        ],
      };

      const expected = {
        date: '2018-11-26',
        referenceId: '000012',
        description: 'Payment to Thi and Cameo',
        accountId: '37',
      };

      const actual = getSaveBillPaymentPayload(state);
      expect(actual).toEqual(expected);
    });
  });
});
