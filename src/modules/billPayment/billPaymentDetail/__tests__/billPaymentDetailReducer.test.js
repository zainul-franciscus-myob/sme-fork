import {
  LOAD_BILL_LIST,
} from '../../BillPaymentIntents';
import billPaymentDetailReducer from '../billPaymentDetailReducer';

describe('billPaymentDetailReducer', () => {
  describe('LOAD_BILL_LIST', () => {
    const action = {
      intent: LOAD_BILL_LIST,
      entries: [
        {
          id: '1',
          billNumber: '0000023',
          status: 'Open',
          date: '27/03/2019',
          billAmount: '250.05',
          discountAmount: '',
          paidAmount: '',
        },
        {
          id: '378',
          billNumber: '0000024',
          status: 'Open',
          date: '27/03/2019',
          billAmount: '2500.05',
          discountAmount: '',
          paidAmount: '',
        },
      ],
    };

    it('loads entries', () => {
      const state = {
        entries: [],
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.entries).toEqual(action.entries);
    });

    it('applies payment amount when has matching bill id', () => {
      const state = {
        applyPaymentToBillId: '1',
        paymentAmount: '200',
        entries: [],
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.entries).toContainEqual(expect.objectContaining({
        id: '1',
        paidAmount: '200',
      }));
    });

    it('keeps the previous paidAmount and discountAmount', () => {
      const state = {
        entries: [
          {
            ...action.entries[0],
            paidAmount: '300',
            discountAmount: '200',
          },
        ],
      };

      const actual = billPaymentDetailReducer(state, action);

      expect(actual.entries).toContainEqual(expect.objectContaining({
        id: '1',
        paidAmount: '300',
        discountAmount: '200',
      }));
    });
  });
});
