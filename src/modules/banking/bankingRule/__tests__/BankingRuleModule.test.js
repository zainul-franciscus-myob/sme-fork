import {
  LOAD_CONTACT,
  OPEN,
  SET_ALERT,
  START_LOADING_CONTACT,
  STOP_LOADING_CONTACT,
  UPDATE_RULE_DETAILS,
} from '../BankingRuleIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import AlertType from '../../../../common/types/AlertType';
import BankingRuleModule from '../BankingRuleModule';
import ContactType from '../../../contact/contactCombobox/types/ContactType';
import Region from '../../../../common/types/Region';
import RuleTypes from '../RuleTypes';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import bankingRuleReducer from '../bankingRuleReducers';
import createBankingRuleDispatcher from '../createBankingRuleDispatcher';
import createBankingRuleIntegrator from '../createBankingRuleIntegrator';

describe('BankingRuleModule', () => {
  const setup = () => {
    const store = new TestStore(bankingRuleReducer);
    const integration = new TestIntegration();

    const module = new BankingRuleModule({ integration });
    module.store = store;
    module.integrator = createBankingRuleIntegrator(store, integration);
    module.dispatcher = createBankingRuleDispatcher(store);

    return { store, integration, module };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({
      businessId: '🌶',
      region: Region.au,
      transaction: {
        accountId: '1',
        accountDisplayName: '🍉 👵',
        date: '2020-01-01',
        description: '🙅‍♀️',
        withdrawal: 10000,
        deposit: undefined,
      },
      ruleType: RuleTypes.spendMoney,
      bankAccounts: [],
      taxCodes: [],
      withdrawalAccounts: [],
      depositAccounts: [],
    });

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    it('loads banking rule', () => {
      const { module, store } = setup();
      module.contactComboboxModule = {
        resetState: jest.fn(),
        run: jest.fn(),
      };
      const context = {
        businessId: '🌶',
        region: Region.au,
        transaction: {
          accountId: '1',
          accountDisplayName: '🍉 👵',
          date: '2020-01-01',
          description: '🙅‍♀️',
          withdrawal: 10000,
          deposit: undefined,
        },
        ruleType: RuleTypes.spendMoney,
        bankAccounts: [],
        taxCodes: [],
        withdrawalAccounts: [],
        depositAccounts: [],
      };

      module.run(context);

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          ...context,
        },
        {
          intent: OPEN,
        },
      ]);

      expect(module.contactComboboxModule.resetState).toHaveBeenCalled();
      expect(module.contactComboboxModule.run).toHaveBeenCalled();
    });

    [
      {
        ruleType: RuleTypes.bill,
        contactType: ContactType.SUPPLIER,
      },
      {
        ruleType: RuleTypes.invoice,
        contactType: ContactType.CUSTOMER,
      },
      {
        ruleType: RuleTypes.spendMoney,
        contactType: ContactType.ALL,
      },
      {
        ruleType: RuleTypes.receiveMoney,
        contactType: ContactType.ALL,
      },
    ].forEach(({ ruleType, contactType }) => {
      describe(`when run with ruleType of "${ruleType}"`, () => {
        it(`runs the contact combobox with contactType of "${contactType}"`, () => {
          const { module } = setup();
          module.contactComboboxModule = {
            resetState: jest.fn(),
            run: jest.fn(),
          };

          module.run({
            businessId: '🌶',
            region: Region.au,
            transaction: {
              accountId: '1',
              accountDisplayName: '🍉 👵',
              date: '2020-01-01',
              description: '🙅‍♀️',
              withdrawal: 10000,
              deposit: undefined,
            },
            ruleType,
            bankAccounts: [],
            taxCodes: [],
            withdrawalAccounts: [],
            depositAccounts: [],
          });

          expect(module.contactComboboxModule.resetState).toHaveBeenCalled();
          expect(module.contactComboboxModule.run).toHaveBeenCalledWith(
            expect.objectContaining({
              contactType,
            })
          );
        });
      });
    });
  });

  describe('updateRuleDetails', () => {
    it('updates rule details', () => {
      const { module, store } = setupWithRun();

      module.updateRuleDetails({ key: 'name', value: '🤖' });

      expect(store.getActions()).toEqual([
        {
          intent: UPDATE_RULE_DETAILS,
          key: 'name',
          value: '🤖',
        },
      ]);
    });

    describe('when update contactId', () => {
      it('successfully loads contact', () => {
        const { module, store, integration } = setupWithRun();

        module.updateRuleDetails({ key: 'contactId', value: '🥬' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_RULE_DETAILS,
            key: 'contactId',
            value: '🥬',
          },
          {
            intent: START_LOADING_CONTACT,
          },
          expect.objectContaining({
            intent: LOAD_CONTACT,
          }),
          {
            intent: STOP_LOADING_CONTACT,
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_CONTACT,
            urlParams: {
              businessId: '🌶',
              contactId: '🥬',
            },
          }),
        ]);
      });

      it('fails to loads contact', () => {
        const { module, store, integration } = setupWithRun();
        integration.mapFailure(LOAD_CONTACT);

        module.updateRuleDetails({ key: 'contactId', value: '🥬' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_RULE_DETAILS,
            key: 'contactId',
            value: '🥬',
          },
          {
            intent: START_LOADING_CONTACT,
          },
          {
            intent: SET_ALERT,
            alert: {
              type: AlertType.DANGER,
              message: expect.any(String),
            },
          },
          {
            intent: STOP_LOADING_CONTACT,
          },
        ]);
        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_CONTACT,
            urlParams: {
              businessId: '🌶',
              contactId: '🥬',
            },
          }),
        ]);
      });
    });

    describe('when update ruleType', () => {
      [
        {
          ruleType: RuleTypes.bill,
          contactType: ContactType.SUPPLIER,
        },
        {
          ruleType: RuleTypes.invoice,
          contactType: ContactType.CUSTOMER,
        },
        {
          ruleType: RuleTypes.spendMoney,
          contactType: ContactType.ALL,
        },
        {
          ruleType: RuleTypes.receiveMoney,
          contactType: ContactType.ALL,
        },
      ].forEach(({ ruleType, contactType }) => {
        describe(`when value of "${ruleType}"`, () => {
          it(`runs the contact combobox with contactType of "${contactType}"`, () => {
            const { module } = setupWithRun();
            module.contactComboboxModule = {
              resetState: jest.fn(),
              run: jest.fn(),
            };

            module.updateRuleDetails({ key: 'ruleType', value: ruleType });

            expect(module.contactComboboxModule.resetState).toHaveBeenCalled();
            expect(module.contactComboboxModule.run).toHaveBeenCalledWith(
              expect.objectContaining({
                contactType,
              })
            );
          });
        });
      });
    });
  });
});
