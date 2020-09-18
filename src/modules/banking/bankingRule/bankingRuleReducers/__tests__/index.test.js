import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import { UPDATE_CONTACT } from '../../BankingRuleIntents';
import ContactType from '../../../../contact/contactCombobox/types/ContactType';
import bankingRuleReducer from '../index';
import fieldTypes from '../../FieldTypes';

describe('bankingRuleReducer', () => {
  describe('setInitialState', () => {
    it('prefills name and condition', () => {
      const action = {
        intent: SET_INITIAL_STATE,
        transaction: {
          description: '🌶',
        },
      };
      const state = {};

      const actual = bankingRuleReducer(state, action);

      expect(actual.bankingRule.name).toEqual('🌶');
      expect(actual.bankingRule.conditions).toEqual([
        {
          field: fieldTypes.description,
          predicates: [{ matcher: 'Contains', value: '🌶' }],
        },
      ]);
    });
  });

  describe('loadContact', () => {
    it('sets isPaymentReportable and contactType', () => {
      const action = {
        intent: UPDATE_CONTACT,
        isPaymentReportable: true,
        contactType: ContactType.SUPPLIER,
        key: 'contactId',
        value: '1',
      };
      const state = {
        bankingRule: {},
      };

      const actual = bankingRuleReducer(state, action);

      expect(actual.contactType).toEqual(ContactType.SUPPLIER);
      expect(actual.bankingRule.isPaymentReportable).toEqual(true);
      expect(actual.bankingRule.contactId).toEqual('1');
    });
  });
});
