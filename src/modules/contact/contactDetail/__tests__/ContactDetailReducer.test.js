import {
  UPDATE_AUTOCOMPLETE_BILLING_ADDRESS,
  UPDATE_AUTOCOMPLETE_SHIPPING_ADDRESS,
  UPDATE_PAYMENT_DETAILS,
} from '../../ContactIntents';
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

    it('reject from first illegal character for account name', () => {
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
        value: 'ABC!@#$%DEF',
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

    it('reject from first illegal character for statement text', () => {
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
        value: 'ABC!@#$%DEF',
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
        intent: UPDATE_PAYMENT_DETAILS,
        key: 'email',
        value: { emailInput },
      };

      const actual = contactDetailReducer(state, action);

      expect(actual.contact.paymentDetails.email).toEqual({
        emailInput,
      });
    });
  });

  describe('updateAutocompleteShippingAddress', () => {
    it('update correct address when `info` is given', () => {
      const state = {
        contact: {
          shippingAddress: {
            street:
              'QUEEN ELIZABETH II MEDICAL, 22 VERDUN ST, NEDLANDS WA 6009',
            city: 'NEDLANDS',
            state: 'WA',
            postcode: '6009',
          },
        },
      };
      const action = {
        intent: UPDATE_AUTOCOMPLETE_SHIPPING_ADDRESS,
        addressInfo: {
          address:
            'QUEEN ELIZABETH 2 PARK, 41 MORISSET ST, QUEANBEYAN NSW 2620',
          info: {
            suburb: 'QUEANBEYAN',
            state: 'NSW',
            postcode: '2620',
          },
        },
      };

      const actual = contactDetailReducer(state, action);

      expect(actual.contact.shippingAddress.street).toBe(
        'QUEEN ELIZABETH 2 PARK, 41 MORISSET ST, QUEANBEYAN NSW 2620'
      );
      expect(actual.contact.shippingAddress.city).toBe('QUEANBEYAN');
      expect(actual.contact.shippingAddress.state).toBe('NSW');
      expect(actual.contact.shippingAddress.postcode).toBe('2620');
    });

    it('update correct address when `info` is null', () => {
      const state = {
        contact: {
          shippingAddress: {
            street:
              'QUEEN ELIZABETH II MEDICAL, 22 VERDUN ST, NEDLANDS WA 6009',
            city: 'NEDLANDS',
            state: 'WA',
            postcode: '6009',
          },
        },
      };
      const action = {
        intent: UPDATE_AUTOCOMPLETE_SHIPPING_ADDRESS,
        addressInfo: {
          address: 'SOME PLACE',
          info: null,
        },
      };

      const actual = contactDetailReducer(state, action);

      expect(actual.contact.shippingAddress.street).toBe('SOME PLACE');
      expect(actual.contact.shippingAddress.city).toBe('NEDLANDS');
      expect(actual.contact.shippingAddress.state).toBe('WA');
      expect(actual.contact.shippingAddress.postcode).toBe('6009');
    });
  });

  describe('updateAutocompleteBillingAddress', () => {
    it('update correct address when `info` is given', () => {
      const state = {
        contact: {
          billingAddress: {
            street:
              'QUEEN ELIZABETH II MEDICAL, 22 VERDUN ST, NEDLANDS WA 6009',
            city: 'NEDLANDS',
            state: 'WA',
            postcode: '6009',
          },
        },
      };
      const action = {
        intent: UPDATE_AUTOCOMPLETE_BILLING_ADDRESS,
        addressInfo: {
          address:
            'QUEEN ELIZABETH 2 PARK, 41 MORISSET ST, QUEANBEYAN NSW 2620',
          info: {
            suburb: 'QUEANBEYAN',
            state: 'NSW',
            postcode: '2620',
          },
        },
      };

      const actual = contactDetailReducer(state, action);

      expect(actual.contact.billingAddress.street).toBe(
        'QUEEN ELIZABETH 2 PARK, 41 MORISSET ST, QUEANBEYAN NSW 2620'
      );
      expect(actual.contact.billingAddress.city).toBe('QUEANBEYAN');
      expect(actual.contact.billingAddress.state).toBe('NSW');
      expect(actual.contact.billingAddress.postcode).toBe('2620');
    });

    it('update correct address when `info` is null', () => {
      const state = {
        contact: {
          billingAddress: {
            street:
              'QUEEN ELIZABETH II MEDICAL, 22 VERDUN ST, NEDLANDS WA 6009',
            city: 'NEDLANDS',
            state: 'WA',
            postcode: '6009',
          },
        },
      };
      const action = {
        intent: UPDATE_AUTOCOMPLETE_BILLING_ADDRESS,
        addressInfo: {
          address: 'SOME PLACE',
          info: null,
        },
      };

      const actual = contactDetailReducer(state, action);

      expect(actual.contact.billingAddress.street).toBe('SOME PLACE');
      expect(actual.contact.billingAddress.city).toBe('NEDLANDS');
      expect(actual.contact.billingAddress.state).toBe('WA');
      expect(actual.contact.billingAddress.postcode).toBe('6009');
    });
  });
});
