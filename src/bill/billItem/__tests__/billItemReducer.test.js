import dateFormat from 'dateformat';

import {
  FORMAT_LINE_AMOUNT, REMOVE_LINE, TABLE_ROW_CHANGE, UPDATE_BILL_OPTION,
} from '../BillItemIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import billItemReducer from '../billItemReducer';


describe('billItemReducer', () => {
  const reducer = billItemReducer;

  describe('setInitialState', () => {
    it('use issueDate from payload when read', () => {
      const state = {};
      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          context: {
            billId: '123',
          },
          payload: {
            bill: {
              issueDate: '2019-09-09',
            },
          },
        },
      };

      const actual = reducer(state, action);

      const expectedBill = {
        issueDate: '2019-09-09',
      };

      expect(actual.bill).toEqual(expectedBill);
    });

    it('use todays date when creating', () => {
      const state = {};
      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          context: {
            billId: 'newItem',
          },
          payload: {
            bill: {},
          },
        },
      };

      const actual = reducer(state, action);

      const expectedBill = {
        issueDate: dateFormat(Number(Date.now()), 'yyyy-mm-dd'),
      };

      expect(actual.bill).toEqual(expectedBill);
    });
  });

  describe('changeTableRow', () => {
    it('should update a value in a table row by key', () => {
      const state = {
        bill: {
          lines: [{}],
        },
      };
      const action = {
        intent: TABLE_ROW_CHANGE,
        index: 0,
        key: 'unitPrice',
        value: '1234',
      };
      const expectedState = {
        bill: {
          lines: [
            {
              unitPrice: '1234',
            },
          ],
        },
        isPageEdited: true,
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should update displayDiscount when discount is changed', () => {
      const state = {
        bill: {
          lines: [{}],
        },
      };
      const action = {
        intent: TABLE_ROW_CHANGE,
        index: 0,
        key: 'discount',
        value: '1234',
      };
      const expectedState = {
        bill: {
          lines: [
            {
              discount: '1234',
              displayDiscount: '1234',
            },
          ],
        },
        isPageEdited: true,
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should update displayAmount when amount is changed', () => {
      const state = {
        bill: {
          lines: [{}],
        },
      };
      const action = {
        intent: TABLE_ROW_CHANGE,
        index: 0,
        key: 'amount',
        value: '1234',
      };
      const expectedState = {
        bill: {
          lines: [
            {
              amount: '1234',
              displayAmount: '1234',
            },
          ],
        },
        isPageEdited: true,
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('removeLine', () => {
    it('should remove a line in an array based on the given index', () => {
      const state = {
        bill: {
          lines: [
            {
              units: '',
              itemId: '1',
            },
            {
              units: '',
              itemId: '2',
            },
          ],
        },
      };
      const action = {
        intent: REMOVE_LINE,
        index: 0,
      };
      const expectedState = {
        bill: {
          lines: [
            {
              units: '',
              itemId: '2',
            },
          ],
        },
        isPageEdited: true,
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('updateBillOption', () => {
    it('should update an option in the header', () => {
      const state = {
        bill: {
          billNumber: '',
        },
      };
      const action = {
        intent: UPDATE_BILL_OPTION,
        key: 'billNumber',
        value: 'BL0000002',
      };
      const expectedState = {
        bill: {
          billNumber: 'BL0000002',
        },
        isPageEdited: true,
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('formatLineAmount', () => {
    const state = {
      bill: {
        isTaxInclusive: true,
        lines: [
          {
            amount: '-',
          },
        ],
      },
    };

    const key = 'amount';
    const index = 0;
    const action = {
      intent: FORMAT_LINE_AMOUNT,
      index,
      key,
    };

    const expected = {
      bill: {
        lines: [
          {
            amount: '0',
          },
        ],
        isTaxInclusive: true,
      },
    };

    const actual = billItemReducer(state, action);
    expect(actual).toEqual(expected);
  });
});
