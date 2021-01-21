import Decimal from 'decimal.js';

import {
  GET_TAX_CALCULATIONS,
  LOAD_ACCOUNT_AFTER_CREATE,
  SET_SPEND_MONEY_OPTIONS,
} from '../RecurringSpendMoneyIntents';
import spendMoneyReducer from '../RecurringSpendMoneyReducer';

describe('recurringSpendMoneyReducer', () => {
  describe('SET_SPEND_MONEY_OPTIONS', () => {
    describe('payFromAccountId', () => {
      it('updates payFromAccountId', () => {
        const state = {
          spendMoney: {
            payFromAccountId: '2',
          },
        };

        const action = {
          intent: SET_SPEND_MONEY_OPTIONS,
          key: 'payFromAccountId',
          value: '1',
        };

        const actual = spendMoneyReducer(state, action);

        expect(actual.spendMoney.payFromAccountId).toEqual('1');
      });

      it('clears bankStatementText when payFromAccountId is not electronic payment account', () => {
        const state = {
          spendMoney: {
            payFromAccountId: '2',
            bankStatementText: 'text',
          },
          electronicClearingAccountId: '2',
        };

        const action = {
          intent: SET_SPEND_MONEY_OPTIONS,
          key: 'payFromAccountId',
          value: '1',
        };

        const actual = spendMoneyReducer(state, action);

        expect(actual.spendMoney.bankStatementText).toEqual('');
      });
    });

    describe('payToContactId', () => {
      it('updates payToContactId', () => {
        const state = {
          spendMoney: {
            payToContactId: '2',
          },
        };

        const action = {
          intent: SET_SPEND_MONEY_OPTIONS,
          key: 'payToContactId',
          value: '1',
        };

        const actual = spendMoneyReducer(state, action);

        expect(actual.spendMoney.payToContactId).toEqual('1');
      });
    });

    describe('isReportable', () => {
      it('updates value', () => {
        const state = {
          spendMoney: {
            isReportable: false,
          },
        };

        const action = {
          intent: SET_SPEND_MONEY_OPTIONS,
          key: 'isReportable',
          value: true,
        };

        const actual = spendMoneyReducer(state, action);

        expect(actual.spendMoney.isReportable).toBeTruthy();
      });
    });
  });

  describe('GET_TAX_CALCULATIONS', () => {
    const taxCalculations = {
      lines: [
        {
          taxExclusiveAmount: Decimal(90.91),
          taxAmount: Decimal(9.09),
          amount: Decimal(100),
        },
      ],
      totals: {
        subTotal: Decimal(100),
        totalTax: Decimal(9.09),
        totalAmount: Decimal(100),
      },
    };

    const state = {
      spendMoney: {
        lines: [{ amount: '0' }],
      },
      totals: {
        subTotal: '0',
        totalTax: '0',
        totalAmount: '0',
      },
    };

    const action = {
      intent: GET_TAX_CALCULATIONS,
      taxCalculations,
    };

    const actual = spendMoneyReducer(state, action);

    const expected = {
      isPageEdited: true,
      spendMoney: {
        lines: [{ amount: '100' }],
      },
      totals: {
        subTotal: '$100.00',
        totalTax: '$9.09',
        totalAmount: '$100.00',
      },
    };

    expect(actual).toEqual(expected);
  });

  describe('LOAD_ACCOUNT_AFTER_CREATE', () => {
    it('adds the newly added account into the account list', () => {
      const state = {
        accountOptions: [{ id: '1' }],
      };

      const newAccount = {
        id: '123',
        displayName: 'My quick account',
        accountType: 'Asset',
        taxCodeId: '123',
        displayId: '1-9944',
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        ...newAccount,
      };

      const actual = spendMoneyReducer(state, action);

      const expected = [newAccount, { id: '1' }];

      expect(actual.accountOptions).toEqual(expected);
    });
  });
});
