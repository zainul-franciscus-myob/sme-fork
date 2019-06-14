import { clearBankFeedsLoginDetails, updateBankFeedsLoginDetails } from '../bankFeedsLoginHandlers';

describe('bankFeedsLoginHandlers', () => {
  describe('updateBankFeedsLoginDetails', () => {
    it('should update the store with provided key and value', () => {
      const state = {
        hi: 'hi',
        loginDetails: {
          username: '',
          password: '',
        },
      };
      const action = {
        key: 'username',
        value: 'phoenix',
      };

      const expected = {
        hi: 'hi',
        loginDetails: {
          username: 'phoenix',
          password: '',
        },
      };

      const actual = updateBankFeedsLoginDetails(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('clearBankFeedsLoginDetails', () => {
    it('should clear the username and password from the store', () => {
      const state = {
        hello: 'hello',
        loginDetails: {
          username: 'phoenix',
          password: 'super secret password',
        },
      };
      const expected = {
        hello: 'hello',
        loginDetails: {
          username: '',
          password: '',
        },
      };
      const actual = clearBankFeedsLoginDetails(state);
      expect(actual).toEqual(expected);
    });
  });
});
