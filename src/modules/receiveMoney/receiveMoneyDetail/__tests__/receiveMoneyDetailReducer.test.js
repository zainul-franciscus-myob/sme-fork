import {
  ADD_RECEIVE_MONEY_LINE,
  DELETE_RECEIVE_MONEY_LINE,
  GET_TAX_CALCULATIONS,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  UPDATE_RECEIVE_MONEY_HEADER,
  UPDATE_RECEIVE_MONEY_LINE,
} from '../../ReceiveMoneyIntents';
import receiveMoneyReducer from '../receiveMoneyDetailReducer';

describe('receiveMoneyDetailReducer', () => {
  describe('UPDATE_RECEIVE_MONEY_LINE', () => {
    it('updates key at line at index with value', () => {
      const state = {
        receiveMoney: {
          lines: [
            {},
            {
              hello: 2,
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_RECEIVE_MONEY_LINE, lineIndex: 1, lineKey: 'hello', lineValue: 3,
      };

      const actual = receiveMoneyReducer(state, action);

      expect(actual.receiveMoney.lines[1].hello).toEqual(3);
    });

    it('updates amount when key is amount', () => {
      const state = {
        receiveMoney: {
          lines: [
            {},
          ],
        },
      };

      const action = {
        intent: UPDATE_RECEIVE_MONEY_LINE,
        lineIndex: 0,
        lineKey: 'amount',
        lineValue: '1234',
      };

      const actual = receiveMoneyReducer(state, action);

      expect(actual.receiveMoney.lines[0].amount).toEqual('1234');
    });

    it('updates taxCodeId and accountId when key is accountId', () => {
      const action = {
        intent: UPDATE_RECEIVE_MONEY_LINE,
        lineIndex: 0,
        lineKey: 'accountId',
        lineValue: '5',
      };

      const state = {
        receiveMoney: {
          lines: [
            {
              id: '2',
            },
          ],
        },
        accountOptions: [
          {
            id: '5',
            taxCodeId: '10',
          },
        ],
      };

      const actual = receiveMoneyReducer(state, action);

      expect(actual.receiveMoney.lines[0].accountId).toEqual('5');
      expect(actual.receiveMoney.lines[0].taxCodeId).toEqual('10');
    });

    it('sets isPageEdited to true', () => {
      const action = {
        intent: UPDATE_RECEIVE_MONEY_LINE,
        lineIndex: 0,
        lineKey: 'description',
        lineValue: 'abc',
      };

      const state = {
        receiveMoney: {
          lines: [
            {},
          ],
        },
      };
      const actual = receiveMoneyReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it('sets isLineEdited to true if key is amount', () => {
      const action = {
        intent: UPDATE_RECEIVE_MONEY_LINE,
        lineIndex: 0,
        lineKey: 'amount',
        lineValue: '2',
      };

      const state = {
        receiveMoney: {
          lines: [
            {},
          ],
        },
      };
      const actual = receiveMoneyReducer(state, action);

      expect(actual.isLineEdited).toEqual(true);
    });
  });

  describe('UPDATE_RECEIVE_MONEY_HEADER', () => {
    it('updates key with given value', () => {
      const state = {
        receiveMoney: {
          a: '1',
        },
      };

      const action = {
        intent: UPDATE_RECEIVE_MONEY_HEADER,
        key: 'a',
        value: '2',
      };

      const actual = receiveMoneyReducer(state, action);

      expect(actual.receiveMoney).toEqual({
        a: '2',
      });
    });

    it('sets isPageEdited to true', () => {
      const state = {
        receiveMoney: {},
        isPageEdited: false,
      };

      const action = {
        intent: UPDATE_RECEIVE_MONEY_HEADER,
        key: 'a',
        value: '2',
      };

      const actual = receiveMoneyReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });

  describe('ADD_RECEIVE_MONEY_LINE', () => {
    const state = {
      receiveMoney: {
        lines: [
          {},
          {},
        ],
      },
      newLine: {},
      accountOptions: [],
    };

    const action = {
      intent: ADD_RECEIVE_MONEY_LINE,
      line: {
        description: 'test',
      },
    };

    it('sets isPageEdited to true', () => {
      const actual = receiveMoneyReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it('adds a new line', () => {
      const actual = receiveMoneyReducer(state, action);

      expect(actual.receiveMoney.lines[2]).toBeDefined();
    });
  });

  describe('DELETE_RECEIVE_MONEY_LINE', () => {
    const state = {
      receiveMoney: {
        lines: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
      },
    };

    const action = {
      intent: DELETE_RECEIVE_MONEY_LINE,
      index: 1,
    };

    it('removes line at index', () => {
      const actual = receiveMoneyReducer(state, action);

      expect(actual.receiveMoney.lines).toEqual([
        {
          id: '1',
        },
      ]);
    });

    it('sets isPageEdited to true', () => {
      const actual = receiveMoneyReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });

  describe('GET_TAX_CALCULATIONS', () => {
    it('merges calculated line totals response into the state and set isLineEdited back to false', () => {
      const state = {
        receiveMoney: {
          lines: [],
          isTaxInclusive: false,
        },
        totals: {},
      };

      const action = {
        intent: GET_TAX_CALCULATIONS,
        lines: [
          {
            amount: '5',
          },
        ],
        totals: {
          subTotal: '1',
          totalTax: '2',
          totalAmount: '3',
        },
      };

      const actual = receiveMoneyReducer(state, action);

      expect(actual).toEqual({
        receiveMoney: {
          lines: [
            {
              amount: '5',
            },
          ],
          isTaxInclusive: false,
        },
        totals: {
          subTotal: '1',
          totalTax: '2',
          totalAmount: '3',
        },
        isLineEdited: false,
      });
    });
  });

  describe('LOAD_ACCOUNT_AFTER_CREATE', () => {
    it('merges new account payload into account options', () => {
      const state = {
        accountOptions: [{ thisIsAnAccount: true }],
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = receiveMoneyReducer(state, action);

      expect(actual.accountOptions).toEqual([
        { thisIsAnAccount: false },
        { thisIsAnAccount: true },
      ]);
    });
    it('sets page state to edited', () => {
      const state = {
        accountOptions: [{ thisIsAnAccount: true }],
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = receiveMoneyReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });

  describe('LOAD', () => {
    it('merges new contact payload into contact options', () => {
      const state = {
        payFromContactOptions: [{ id: '🐶', name: 'Dog' }],
      };

      const action = {
        intent: LOAD_CONTACT_AFTER_CREATE,
        id: '🐱',
        name: 'Cat',
      };

      const actual = receiveMoneyReducer(state, action);

      expect(actual.payFromContactOptions).toEqual([
        { id: '🐱', name: 'Cat' },
        { id: '🐶', name: 'Dog' },
      ]);
    });

    it('sets page state to edited', () => {
      const state = {
        payFromContactOptions: [{ id: '🐶', name: 'Dog' }],
      };

      const action = {
        intent: LOAD_CONTACT_AFTER_CREATE,
        id: '🐱',
        name: 'Cat',
      };

      const actual = receiveMoneyReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it('sets selectedPayFromContactId to created contact', () => {
      const state = {
        payFromContactOptions: [{ id: '🐶', name: 'Dog' }],
        receiveMoney: {},
      };

      const action = {
        intent: LOAD_CONTACT_AFTER_CREATE,
        id: '🐱',
        name: 'Cat',
      };

      const actual = receiveMoneyReducer(state, action);

      expect(actual.receiveMoney.selectedPayFromContactId).toEqual('🐱');
    });
  });
});
