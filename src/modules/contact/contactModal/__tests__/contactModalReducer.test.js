import { SET_CONTACT_MODAL_PAYMENT_DETAILS } from '../../ContactIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import reducer, { getDefaultState } from '../contactModalReducer';

describe('contactModalReducer', () => {
  describe('setInitialState', () => {
    it('should set required context', () => {
      const state = getDefaultState();
      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          businessId: 'businessId',
          region: 'region',
        },
      };

      const actual = reducer(state, action);

      expect(actual.businessId).toEqual('businessId');
      expect(actual.region).toEqual('region');
    });

    it('should show contact type if contact type is not provided', () => {
      const state = getDefaultState();
      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          businessId: 'businessId',
          region: 'region',
          contactType: undefined,
        },
      };

      const actual = reducer(state, action);

      expect(actual.showContactType).toBeTruthy();
      expect(actual.contact.contactType).toEqual(
        getDefaultState().contact.contactType
      );
    });

    it('should not show contact type if contact type is provided', () => {
      const state = getDefaultState();
      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          businessId: 'businessId',
          region: 'region',
          contactType: 'Customer',
        },
      };

      const actual = reducer(state, action);

      expect(actual.showContactType).toBeFalsy();
      expect(actual.contact.contactType).toEqual('Customer');
    });
  });

  describe('setContactModalPaymentDetails', () => {
    it('uppercase account name', () => {
      const state = {
        contact: {
          paymentDetails: {
            accountName: '',
          },
        },
      };

      const action = {
        intent: SET_CONTACT_MODAL_PAYMENT_DETAILS,
        key: 'accountName',
        value: 'abc',
      };

      const actual = reducer(state, action);

      expect(actual.contact.paymentDetails.accountName).toEqual('ABC');
    });

    it('reject from first illegal character for account name', () => {
      const state = {
        contact: {
          paymentDetails: {
            accountName: '',
          },
        },
      };

      const action = {
        intent: SET_CONTACT_MODAL_PAYMENT_DETAILS,
        key: 'accountName',
        value: 'ABC!@#$%DEF',
      };

      const actual = reducer(state, action);

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
        intent: SET_CONTACT_MODAL_PAYMENT_DETAILS,
        key: 'accountName',
        value: 'ABC & CBA',
      };

      const actual = reducer(state, action);

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
        intent: SET_CONTACT_MODAL_PAYMENT_DETAILS,
        key: 'statementText',
        value: 'abc',
      };

      const actual = reducer(state, action);

      expect(actual.contact.paymentDetails.statementText).toEqual('ABC');
    });

    it('reject from first illegal character for statement text', () => {
      const state = {
        contact: {
          paymentDetails: {
            statementText: '',
          },
        },
      };

      const action = {
        intent: SET_CONTACT_MODAL_PAYMENT_DETAILS,
        key: 'statementText',
        value: 'ABC!@#$%DEF',
      };

      const actual = reducer(state, action);

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
        intent: SET_CONTACT_MODAL_PAYMENT_DETAILS,
        key: 'statementText',
        value: 'ABC & CBA',
      };

      const actual = reducer(state, action);

      expect(actual.contact.paymentDetails.statementText).toEqual('ABC & CBA');
    });

    it('accepts all characters for email', () => {
      const emailInput = '123$%%&*TY@ghUY)(!?}{+_.~com';
      const state = {
        contact: {
          paymentDetails: {
            email: '',
          },
        },
      };

      const action = {
        intent: SET_CONTACT_MODAL_PAYMENT_DETAILS,
        key: 'email',
        value: { emailInput },
      };

      const actual = reducer(state, action);

      expect(actual.contact.paymentDetails.email).toEqual({
        emailInput,
      });
    });
  });
});
