import { UPDATE_PAYMENT_DETAILS } from '../../ContactIntents';
import contactDetailReducer from '../contactDetailReducer';

describe('contactDetailReducer', () => {
  describe('updatePaymentDetails', () => {
    it('uppercase account name', () => {
      const state = {
        contact: {
          paymentDetails: {
            accountName: '',
          },
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'accountName',
        value: 'abc',
      };

      const actual = contactDetailReducer(state, action);

      expect(actual.contact.paymentDetails.accountName).toEqual('ABC');
    });

    it('reject illegal characters for account name', () => {
      const state = {
        contact: {
          paymentDetails: {
            accountName: 'ABC',
          },
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'accountName',
        value: 'ABC!@#$%',
      };

      const actual = contactDetailReducer(state, action);

      expect(actual.contact.paymentDetails.accountName).toEqual('ABC');
    });

    it('accept allowed characters for account name', () => {
      const state = {
        contact: {
          paymentDetails: {
            accountName: 'ABC',
          },
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'accountName',
        value: 'ABC & CBA',
      };

      const actual = contactDetailReducer(state, action);

      expect(actual.contact.paymentDetails.accountName).toEqual('ABC & CBA');
    });

    it('uppercase statement text', () => {
      const state = {
        contact: {
          paymentDetails: {
            statementText: '',
          },
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'statementText',
        value: 'abc',
      };

      const actual = contactDetailReducer(state, action);

      expect(actual.contact.paymentDetails.statementText).toEqual('ABC');
    });

    it('reject illegal characters for statement text', () => {
      const state = {
        contact: {
          paymentDetails: {
            statementText: 'ABC',
          },
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'statementText',
        value: 'ABC!@#$%',
      };

      const actual = contactDetailReducer(state, action);

      expect(actual.contact.paymentDetails.statementText).toEqual('ABC');
    });

    it('accept allowed characters for statement text', () => {
      const state = {
        contact: {
          paymentDetails: {
            statementText: 'ABC',
          },
        },
      };

      const action = {
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'statementText',
        value: 'ABC & CBA',
      };

      const actual = contactDetailReducer(state, action);

      expect(actual.contact.paymentDetails.statementText).toEqual('ABC & CBA');
    });
  });
});
