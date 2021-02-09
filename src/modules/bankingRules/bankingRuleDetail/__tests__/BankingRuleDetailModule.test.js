import {
  CLOSE_MODAL,
  CREATE_BANKING_RULE,
  DELETE_BANKING_RULE,
  DISPLAY_ALERT,
  LOAD_BANKING_RULE,
  LOAD_NEW_BANKING_RULE,
  OPEN_MODAL,
  SET_IS_PAGE_EDITED,
  SET_LOADING_STATE,
  UPDATE_BANKING_RULE,
  UPDATE_FORM,
} from '../BankingRuleDetailIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_BANKING_RULE,
  SUCCESSFULLY_SAVED_BANKING_RULE,
} from '../../../../common/types/MessageTypes';
import AlertType from '../../../../common/types/AlertType';
import BankingRuleDetailModule from '../BankingRuleDetailModule';
import ContactType from '../../../contact/contactCombobox/types/ContactType';
import LoadingState from '../../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import RuleTypes from '../RuleTypes';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import bankingRuleDetailReducer from '../reducers';
import createBankingRuleDetailDispatcher from '../createBankingRuleDetailDispatcher';
import createBankingRuleDetailIntegrator from '../createBankingRuleDetailIntegrator';
import loadBankingRuleDetail from '../mappings/data/loadBankingRuleDetail.json';

jest.mock('../../../../splitToggle', () => ({
  isToggleOn: () => true,
}));

describe('BankingRuleDetailModule', () => {
  const setup = () => {
    const setRootView = () => {};
    const store = new TestStore(bankingRuleDetailReducer);
    const integration = new TestIntegration();

    const module = new BankingRuleDetailModule({
      integration,
      setRootView,
    });

    module.store = store;
    module.integrator = createBankingRuleDetailIntegrator(store, integration);
    module.dispatcher = createBankingRuleDetailDispatcher(store);

    return { store, integration, module };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({
      businessId: '🐛',
      region: 'au',
      bankingRuleId: 'new',
    });

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithExisting = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({
      businessId: '🐛',
      region: 'au',
      bankingRuleId: '🦕',
    });

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('run', () => {
    [
      {
        name: 'new',
        bankingRuleId: 'new',
        intent: LOAD_NEW_BANKING_RULE,
      },
      {
        name: 'existing',
        bankingRuleId: '🦕',
        intent: LOAD_BANKING_RULE,
      },
    ].forEach((test) => {
      describe(`when ${test.name}`, () => {
        it('loads successfully', () => {
          const { module, store, integration } = setup();
          module.contactComboboxModule = {
            resetState: jest.fn(),
            run: jest.fn(),
          };

          module.run({
            businessId: '🐛',
            region: 'au',
            bankingRuleId: test.bankingRuleId,
          });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                businessId: '🐛',
                region: 'au',
                bankingRuleId: test.bankingRuleId,
              },
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING_SUCCESS,
            },
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);

          expect(module.contactComboboxModule.resetState).toHaveBeenCalled();
          expect(module.contactComboboxModule.run).toHaveBeenCalled();
        });

        it('fails to load', () => {
          const { module, store, integration } = setup();
          integration.mapFailure(test.intent);

          module.run({
            businessId: '🐛',
            region: 'au',
            bankingRuleId: test.bankingRuleId,
          });

          expect(store.getActions()).toEqual([
            {
              intent: SET_INITIAL_STATE,
              context: {
                businessId: '🐛',
                region: 'au',
                bankingRuleId: test.bankingRuleId,
              },
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING_FAIL,
            },
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);
        });
      });
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
      describe(`when existing with ruleType of "${ruleType}"`, () => {
        it(`loads the contact combobox module with contactType "${contactType}"`, () => {
          const { module, integration } = setup();
          integration.overrideMapping(LOAD_BANKING_RULE, ({ onSuccess }) => {
            onSuccess({
              ...loadBankingRuleDetail,
              contactId: '🍉',
              ruleType,
            });
          });
          module.contactComboboxModule = {
            resetState: jest.fn(),
            run: jest.fn(),
          };

          module.run({
            businessId: '🐛',
            region: 'au',
            bankingRuleId: '🦕',
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

  describe('saveBankingRule', () => {
    [
      {
        name: 'new',
        setup: setupWithNew,
        intent: CREATE_BANKING_RULE,
      },
      {
        name: 'existing',
        setup: setupWithExisting,
        intent: UPDATE_BANKING_RULE,
      },
    ].forEach((test) => {
      describe(`when ${test.name}`, () => {
        const setupWithOpenCancelModal = () => {
          const toolbox = test.setup();
          const { module, store } = toolbox;

          module.updateForm({ key: 'name', value: '🦄' });
          module.openUnsavedModal();

          expect(store.getActions()).toEqual([
            {
              intent: SET_IS_PAGE_EDITED,
            },
            {
              intent: UPDATE_FORM,
              key: 'name',
              value: '🦄',
            },
            {
              intent: OPEN_MODAL,
              modal: {
                type: ModalType.UNSAVED,
              },
            },
          ]);

          store.resetActions();

          return toolbox;
        };

        it('successfully saves', () => {
          const { module, store, integration } = setupWithOpenCancelModal();
          module.pushMessage = jest.fn();

          module.saveBankingRule();

          expect(store.getActions()).toEqual([
            {
              intent: CLOSE_MODAL,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING_SUCCESS,
            },
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);
          expect(module.pushMessage).toHaveBeenCalledWith({
            type: SUCCESSFULLY_SAVED_BANKING_RULE,
            content: expect.any(String),
          });
        });

        it('fails to save', () => {
          const { module, store, integration } = setupWithOpenCancelModal();
          integration.mapFailure(test.intent);

          module.saveBankingRule();

          expect(store.getActions()).toEqual([
            {
              intent: CLOSE_MODAL,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING,
            },
            {
              intent: SET_LOADING_STATE,
              loadingState: LoadingState.LOADING_SUCCESS,
            },
            {
              intent: DISPLAY_ALERT,
              alert: {
                type: AlertType.DANGER,
                message: expect.any(String),
              },
            },
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);
        });
      });
    });
  });

  describe('deleteBankingRule', () => {
    const setupWithOpenDeleteModal = () => {
      const toolbox = setupWithExisting();
      const { module, store } = toolbox;

      module.openDeleteModal();

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            type: ModalType.DELETE,
            url: '/#/au/🐛/bankingRule',
          },
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    it('successfully deletes', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();
      module.pushMessage = jest.fn();

      module.deleteBankingRule();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_BANKING_RULE,
        }),
      ]);
      expect(module.pushMessage).toHaveBeenCalledWith({
        content: "Great Work! You've done it well!",
        type: SUCCESSFULLY_DELETED_BANKING_RULE,
      });
    });

    it('fails to delete', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();
      integration.mapFailure(DELETE_BANKING_RULE);

      module.deleteBankingRule();

      expect(store.getActions()).toEqual([
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: LoadingState.LOADING_SUCCESS,
        },
        {
          intent: DISPLAY_ALERT,
          alert: {
            type: AlertType.DANGER,
            message: expect.any(String),
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_BANKING_RULE,
        }),
      ]);
    });
  });

  describe('updateForm', () => {
    it('sets pages as edited and updates the field', () => {
      const { module, integration, store } = setupWithNew();

      module.updateForm({ key: 'name', value: '🤷‍♀️' });

      expect(store.getActions()).toEqual([
        {
          intent: SET_IS_PAGE_EDITED,
        },
        {
          intent: UPDATE_FORM,
          key: 'name',
          value: '🤷‍♀️',
        },
      ]);
      expect(integration.getRequests()).toEqual([]);
    });

    describe('ruleType', () => {
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
        describe(`when updating to "${ruleType}"`, () => {
          it(`reloads the contact combobox module with contactType "${contactType}"`, () => {
            const { module } = setupWithNew();
            module.contactComboboxModule = {
              resetState: jest.fn(),
              run: jest.fn(),
            };

            module.updateForm({ key: 'ruleType', value: ruleType });

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

  describe('saveHandler', () => {
    const setupWithOpenDeleteModal = () => {
      const toolbox = setupWithNew();
      const { module, store, integration } = toolbox;
      module.contactComboboxModule = {
        isContactModalOpened: () => false,
      };
      module.openDeleteModal();
      store.resetActions();
      integration.resetRequests();

      return toolbox;
    };

    const setupWithOpenUnsavedModal = () => {
      const toolbox = setupWithNew();
      const { module, store, integration } = toolbox;
      module.contactComboboxModule = {
        isContactModalOpened: () => false,
      };
      module.updateForm({ key: 'name', value: '🤖' });
      module.cancelBankingRule();
      store.resetActions();
      integration.resetRequests();

      return toolbox;
    };

    it('creates contact when contact modal open', () => {
      const { module } = setupWithNew();
      module.contactComboboxModule = {
        isContactModalOpened: () => true,
        createContact: jest.fn(),
      };

      module.saveHandler();

      expect(module.contactComboboxModule.createContact).toHaveBeenCalled();
    });

    it('does nothing when delete modal open', () => {
      const { module, store, integration } = setupWithOpenDeleteModal();

      module.saveHandler();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('saves when unsaved modal open', () => {
      const { module, integration } = setupWithOpenUnsavedModal();
      module.pushMessage = () => {};

      module.saveHandler();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_BANKING_RULE,
        }),
      ]);
    });

    it('saves', () => {
      const { module, integration } = setupWithExisting();
      module.pushMessage = () => {};

      module.saveHandler();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_BANKING_RULE,
        }),
      ]);
    });
  });
});
