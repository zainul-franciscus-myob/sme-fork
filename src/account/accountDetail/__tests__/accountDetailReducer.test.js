import {
  LOAD_ACCOUNT_DETAIL,
  PAD_ACCOUNT_NUMBER,
  UPDATE_ACCOUNT_DETAILS,
  UPDATE_ACCOUNT_NUMBER,
  UPDATE_BANKING_DETAILS,
  UPDATE_DETAIL_ACCOUNT_TYPE,
  UPDATE_HEADER_ACCOUNT_TYPE,
} from '../../AccountIntents';
import accountDetailReducer from '../accountDetailReducer';

describe('accountDetailReducer', () => {
  const reducer = accountDetailReducer;

  describe('LOAD_ACCOUNT_DETAIL', () => {
    it('fills in the classification prefix base on account classification', () => {
      const state = { isHeader: false, detail: {} };
      const action = {
        intent: LOAD_ACCOUNT_DETAIL,
        accountClassifications: [
          { value: 'a', accountNumberPrefix: 'a' },
          { value: 'b', accountNumberPrefix: 'b' },
        ],
        isHeader: false,
        account: { accountClassification: 'a' },
      };

      const actual = reducer(state, action);

      expect(actual.readonly.accountNumberPrefix).toEqual('a');
    });
  });
  describe('UPDATE_ACCOUNT_DETAILS', () => {
    it('assigns key and value into the account state', () => {
      const state = { isHeader: false, detail: {} };
      const action = {
        intent: UPDATE_ACCOUNT_DETAILS,
        key: 'key',
        value: 'value',
      };

      const actual = reducer(state, action);

      expect(actual.detail.key).toEqual('value');
    });
    it('sets page state to edited', () => {
      const state = { isHeader: false, detail: {} };
      const action = {
        intent: UPDATE_ACCOUNT_DETAILS,
        key: 'key',
        value: 'value',
      };

      const actual = reducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });
  describe('UPDATE_BANKING_DETAILS', () => {
    it('assigns key and value into the bankingDetails state', () => {
      const state = { isHeader: false, detail: {} };
      const action = {
        intent: UPDATE_BANKING_DETAILS,
        key: 'key',
        value: 'value',
      };

      const actual = reducer(state, action);

      expect(actual.detail.bankingDetails.key).toEqual('value');
    });
    it('sets page state to edited', () => {
      const state = { isHeader: false, detail: {} };
      const action = {
        intent: UPDATE_BANKING_DETAILS,
        key: 'key',
        value: 'value',
      };

      const actual = reducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });
  describe('UPDATE_ACCOUNT_NUMBER', () => {
    describe('when is not flex account numbers', () => {
      it('does not update if doesnt start with prefix', () => {
        const state = {
          isHeader: false,
          detail: { accountNumber: 'abcd' },
          readonly: { accountNumberPrefix: 'a' },
          isFlexAccount: false,
        };
        const action = {
          intent: UPDATE_ACCOUNT_NUMBER,
          key: 'accountNumber',
          value: '12345',
        };

        const actual = reducer(state, action);

        expect(actual.detail.accountNumber).toEqual('abcd');
      });
      it('does not update if editable part is longer than 4 characters', () => {
        const state = {
          isHeader: false,
          detail: { accountNumber: 'abcd' },
          readonly: { accountNumberPrefix: 'a' },
          isFlexAccount: false,
        };
        const action = {
          intent: UPDATE_ACCOUNT_NUMBER,
          key: 'accountNumber',
          value: 'a12345',
        };

        const actual = reducer(state, action);

        expect(actual.detail.accountNumber).toEqual('abcd');
      });
      it('does not update if editable part has alpha characters', () => {
        const state = {
          isHeader: false,
          detail: { accountNumber: 'abcd' },
          readonly: { accountNumberPrefix: 'a' },
          isFlexAccount: false,
        };
        const action = {
          intent: UPDATE_ACCOUNT_NUMBER,
          key: 'accountNumber',
          value: 'a13a5',
        };

        const actual = reducer(state, action);

        expect(actual.detail.accountNumber).toEqual('abcd');
      });
      it('updates if is prefixed correctly, has not alpha characters, and is les than 4 chars', () => {
        const state = {
          isHeader: false,
          detail: { accountNumber: 'abcd' },
          readonly: { accountNumberPrefix: 'a' },
          isFlexAccount: false,
        };
        const action = {
          intent: UPDATE_ACCOUNT_NUMBER,
          key: 'accountNumber',
          value: 'a987',
        };

        const actual = reducer(state, action);

        expect(actual.detail.accountNumber).toEqual('a987');
      });
    });
    describe('when is flex account numbers', () => {
      it('does update if doesnt start with prefix', () => {
        const state = {
          isHeader: false,
          detail: { accountNumber: 'abcd' },
          readonly: { accountNumberPrefix: 'a' },
          isFlexAccount: true,
        };
        const action = {
          intent: UPDATE_ACCOUNT_NUMBER,
          key: 'accountNumber',
          value: '12345',
        };

        const actual = reducer(state, action);

        expect(actual.detail.accountNumber).toEqual('12345');
      });
      it('does not update if editable part is longer than 10 characters ', () => {
        const state = {
          isHeader: false,
          detail: { accountNumber: 'abcd' },
          readonly: { accountNumberPrefix: 'a' },
          isFlexAccount: true,
        };
        const action = {
          intent: UPDATE_ACCOUNT_NUMBER,
          key: 'accountNumber',
          value: 'a123458973289123897',
        };

        const actual = reducer(state, action);

        expect(actual.detail.accountNumber).toEqual('abcd');
      });
      it('does update if has alpha characters', () => {
        const state = {
          isHeader: false,
          detail: { accountNumber: 'abcd' },
          readonly: { accountNumberPrefix: 'a' },
          isFlexAccount: true,
        };
        const action = {
          intent: UPDATE_ACCOUNT_NUMBER,
          key: 'accountNumber',
          value: 'a13a5',
        };

        const actual = reducer(state, action);

        expect(actual.detail.accountNumber).toEqual('a13a5');
      });
      it('updates if is is les than 10 chars', () => {
        const state = {
          isHeader: false,
          detail: { accountNumber: 'abcd' },
          readonly: { accountNumberPrefix: 'a' },
          isFlexAccount: true,
        };
        const action = {
          intent: UPDATE_ACCOUNT_NUMBER,
          key: 'accountNumber',
          value: 'a987',
        };

        const actual = reducer(state, action);

        expect(actual.detail.accountNumber).toEqual('a987');
      });
    });
  });
  describe('PAD_ACCOUNT_NUMBER', () => {
    it('pads up to 4 editable characters if flex is off', () => {
      const state = {
        isFlexAccount: false,
        readonly: { accountNumberPrefix: '1' },
        isHeader: false,
        detail: { accountNumber: '1987' },
      };
      const action = {
        intent: PAD_ACCOUNT_NUMBER,
        key: 'accountNumber',
        value: '1987',
      };

      const actual = reducer(state, action);

      expect(actual.detail.accountNumber).toEqual('19870');
    });
    it('does not pad characters if flex is on', () => {
      const state = {
        isFlexAccount: true,
        readonly: { accountNumberPrefix: '1' },
        isHeader: false,
        detail: { accountNumber: '1987' },
      };
      const action = {
        intent: PAD_ACCOUNT_NUMBER,
        key: 'accountNumber',
        value: '1987',
      };

      const actual = reducer(state, action);

      expect(actual.detail.accountNumber).toEqual('1987');
    });
  });
  describe('UPDATE_HEADER_ACCOUNT_TYPE', () => {
    it('updates account classification with value', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [{ value: 'a' }],
        headerAccounts: [{ id: '1', accountClassification: 'a' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: true,
        header: {
          parentAccountId: '1',
          accountClassification: 'a',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_HEADER_ACCOUNT_TYPE,
        key: 'accountClassification',
        value: '1987',
      };

      const actual = reducer(state, action);

      expect(actual.header.accountClassification).toEqual('1987');
    });
    it('updates account type with value in mapping', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [{ value: 'Asset' }],
        headerAccounts: [{ id: '1', accountClassification: 'Asset' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: true,
        header: {
          parentAccountId: '1',
          accountClassification: 'Asset',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_HEADER_ACCOUNT_TYPE,
        key: 'accountClassification',
        value: 'Equity',
      };

      const actual = reducer(state, action);

      expect(actual.header.accountType).toEqual('Equity');
    });
    describe('updates accountNumber with prefix if changing classifications and flex account is false', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [
          { value: 'Asset', accountNumberPrefix: '1' },
          { value: 'Equity', accountNumberPrefix: '2' },
        ],
        headerAccounts: [{ id: '1', accountClassification: 'Asset' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: true,
        header: {
          parentAccountId: '1',
          accountClassification: 'Asset',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_HEADER_ACCOUNT_TYPE,
        key: 'accountClassification',
        value: 'Equity',
      };

      const actual = reducer(state, action);

      expect(actual.header.accountNumber).toEqual('2987');
    });
    describe('updates accountNumberPrefix with prefix if changing classifications', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [
          { value: 'Asset', accountNumberPrefix: '1' },
          { value: 'Equity', accountNumberPrefix: '2' },
        ],
        headerAccounts: [{ id: '1', accountClassification: 'Asset' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: true,
        header: {
          parentAccountId: '1',
          accountClassification: 'Asset',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_HEADER_ACCOUNT_TYPE,
        key: 'accountClassification',
        value: 'Equity',
      };

      const actual = reducer(state, action);

      expect(actual.readonly.accountNumberPrefix).toEqual('2');
    });
    it('updates parentAccountId if changing classifications', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [
          { value: 'Asset', accountNumberPrefix: '1' },
          { value: 'Equity', accountNumberPrefix: '2' },
        ],
        headerAccounts: [{ id: '1', accountClassification: 'Asset' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: true,
        header: {
          parentAccountId: '1',
          accountClassification: 'Asset',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_HEADER_ACCOUNT_TYPE,
        key: 'accountClassification',
        value: 'Equity',
      };

      const actual = reducer(state, action);

      expect(actual.header.parentAccountId).toEqual('');
    });
    it('keeps parentAccountId if classification is the same', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [
          { value: 'Asset', accountNumberPrefix: '1' },
          { value: 'Equity', accountNumberPrefix: '2' },
        ],
        headerAccounts: [{ id: '1', accountClassification: 'Asset' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: true,
        header: {
          parentAccountId: '1',
          accountClassification: 'Asset',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_HEADER_ACCOUNT_TYPE,
        key: 'accountClassification',
        value: 'Asset',
      };

      const actual = reducer(state, action);

      expect(actual.header.parentAccountId).toEqual('1');
    });
  });
  describe('UPDATE_DETAIL_ACCOUNT_TYPE', () => {
    it('updates account type with value', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [
          {
            value: 'Asset',
            accountNumberPrefix: '1',
            type: [{ value: 'OtherAsset' }],
          },
        ],
        headerAccounts: [{ id: '1', accountClassification: 'a' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: false,
        detail: {
          parentAccountId: '1',
          accountType: 'Asset',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_DETAIL_ACCOUNT_TYPE,
        key: 'accountType',
        value: 'OtherAsset',
      };

      const actual = reducer(state, action);

      expect(actual.detail.accountType).toEqual('OtherAsset');
    });
    it('updates account classification with types parent class', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [
          {
            value: 'Asset',
            accountNumberPrefix: '1',
            type: [{ value: 'OtherAsset' }],
          },
        ],
        headerAccounts: [{ id: '1', accountClassification: 'Asset' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: false,
        detail: {
          parentAccountId: '1',
          accountClassification: 'Equity',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_DETAIL_ACCOUNT_TYPE,
        key: 'accountType',
        value: 'OtherAsset',
      };

      const actual = reducer(state, action);

      expect(actual.detail.accountClassification).toEqual('Asset');
    });
    it('updates cash flow classification from mapping', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [
          {
            value: 'Liability',
            type: [{ value: 'LongTermLiability' }],
            accountNumberPrefix: '1',
          },
        ],
        headerAccounts: [{ id: '1', accountClassification: 'Asset' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: false,
        detail: {
          parentAccountId: '1',
          accountClassification: 'Equity',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_DETAIL_ACCOUNT_TYPE,
        key: 'accountType',
        value: 'LongTermLiability',
      };

      const actual = reducer(state, action);

      expect(actual.detail.cashFlowClassification).toEqual('Financing');
    });
    describe('updates accountNumber with prefix if changing classifications and flex account is false', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [
          { value: 'Asset', accountNumberPrefix: '1' },
          { value: 'Equity', accountNumberPrefix: '2' },
        ],
        headerAccounts: [{ id: '1', accountClassification: 'Asset' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: false,
        detail: {
          parentAccountId: '1',
          accountClassification: 'Asset',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_DETAIL_ACCOUNT_TYPE,
        key: 'accountType',
        value: 'Equity',
      };

      const actual = reducer(state, action);

      expect(actual.detail.accountNumber).toEqual('2987');
    });
    describe('updates accountNumberPrefix with prefix if changing classifications', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [
          { value: 'Asset', accountNumberPrefix: '1' },
          { value: 'Equity', accountNumberPrefix: '2' },
        ],
        headerAccounts: [{ id: '1', accountClassification: 'Asset' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: false,
        detail: {
          parentAccountId: '1',
          accountClassification: 'Asset',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_DETAIL_ACCOUNT_TYPE,
        key: 'accountType',
        value: 'Equity',
      };

      const actual = reducer(state, action);

      expect(actual.readonly.accountNumberPrefix).toEqual('2');
    });
    it('updates parentAccountId if changing classifications', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [
          { value: 'Asset', accountNumberPrefix: '1' },
          { value: 'Equity', accountNumberPrefix: '2' },
        ],
        headerAccounts: [{ id: '1', accountClassification: 'Asset' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: false,
        detail: {
          parentAccountId: '1',
          accountClassification: 'Asset',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_DETAIL_ACCOUNT_TYPE,
        key: 'accountType',
        value: 'Equity',
      };

      const actual = reducer(state, action);

      expect(actual.detail.parentAccountId).toEqual('');
    });
    it('keeps parentAccountId if classification is the same', () => {
      const state = {
        isFlexAccount: false,
        accountClassifications: [
          { value: 'Asset', accountNumberPrefix: '1' },
          { value: 'Equity', accountNumberPrefix: '2' },
        ],
        headerAccounts: [{ id: '1', accountClassification: 'Asset' }],
        readonly: { accountNumberPrefix: '1' },
        isHeader: false,
        detail: {
          parentAccountId: '1',
          accountClassification: 'Asset',
          accountNumber: '1987',
        },
      };
      const action = {
        intent: UPDATE_DETAIL_ACCOUNT_TYPE,
        key: 'accountType',
        value: 'Asset',
      };

      const actual = reducer(state, action);

      expect(actual.detail.parentAccountId).toEqual('1');
    });
  });
});
