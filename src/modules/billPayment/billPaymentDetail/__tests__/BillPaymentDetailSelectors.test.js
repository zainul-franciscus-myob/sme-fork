import { getSaveBillPaymentPayload, getShouldLoadBillList } from '../BillPaymentDetailSelectors';

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
      const actual = getShouldLoadBillList(key, value, state);

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
      const actual = getShouldLoadBillList(key, value, state);

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
      const actual = getShouldLoadBillList(key, value, state);

      expect(actual).toBe(expected);
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
        suppliers: [{ id: '102', displayName: 'Name, Supplier' }],
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
        supplierName: 'Name, Supplier',
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
        suppliers: [{ id: '102', displayName: 'Name, Supplier' }],
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

      const expected = [
        {
          paidAmount: '200.00',
          id: '355',
          discountAmount: '20.05',
        },
      ];

      const actual = getSaveBillPaymentPayload(state).entries;
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
