import {
  ADD_SPEND_MONEY_LINE,
  CLOSE_MODAL,
  CREATE_RECURRING_SPEND_MONEY,
  DELETE_RECURRING_SPEND_MONEY,
  GET_TAX_CALCULATIONS,
  LOAD_ABN_FROM_CONTACT,
  LOAD_NEW_RECURRING_SPEND_MONEY,
  LOAD_RECURRING_SPEND_MONEY,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_RECURRING_SPEND_MONEY,
} from '../RecurringSpendMoneyIntents';
import {
  PREFILL_INTRAY_DOCUMENT_FOR_SPEND_MONEY,
  SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
} from '../../../../common/types/MessageTypes';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import ContactType from '../../../contact/contactCombobox/types/ContactType';
import LoadingState from '../../../../components/PageView/LoadingState';
import ModalType from '../components/ModalType';
import RecurringSpendMoneyModule from '../RecurringSpendMoneyModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import createRecurringSpendMoneyDispatcher from '../createRecurringSpendMoneyDispatcher';
import createRecurringSpendMoneyIntegrator from '../createRecurringSpendMoneyIntegrator';
import recurringSpendMoneyEntry from '../mappings/data/loadRecurringSpendMoneyResponse.json';
import recurringSpendMoneyReducer from '../RecurringSpendMoneyReducer';

const mockCreateObjectUrl = () => {
  const { createObjectURL } = URL;
  beforeAll(() => {
    URL.createObjectURL = () => 'http://www.🐀.com';
  });
  afterAll(() => {
    URL.createObjectURL = createObjectURL;
  });
};

const setup = () => {
  const store = new TestStore(recurringSpendMoneyReducer);
  const integration = new TestIntegration();
  const setRootView = () => {};
  const pushMessage = () => {};
  const popMessages = () => [];
  const featureToggles = { isRecurringTransactionEnabled: false };

  const module = new RecurringSpendMoneyModule({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    featureToggles,
  });
  module.store = store;
  module.dispatcher = createRecurringSpendMoneyDispatcher(store);
  module.integrator = createRecurringSpendMoneyIntegrator(store, integration);

  return {
    store,
    integration,
    module,
    popMessages,
  };
};

export const setupWithNew = () => {
  const toolbox = setup();
  const { store, integration, module } = toolbox;

  module.run({
    recurringTransactionId: 'new',
    businessId: 'bizId',
    region: 'au',
  });
  store.resetActions();
  integration.resetRequests();

  return toolbox;
};

export const setUpWithNewFromInTray = () => {
  const toolbox = setup();
  const { store, integration, module } = toolbox;
  module.popMessages = () => [
    {
      type: PREFILL_INTRAY_DOCUMENT_FOR_SPEND_MONEY,
      inTrayDocumentId: 'docId',
    },
  ];

  module.run({
    recurringTransactionId: 'new',
    businessId: 'bizId',
    region: 'au',
  });
  store.resetActions();
  integration.resetRequests();

  return toolbox;
};

const setUpWithExisting = () => {
  const toolbox = setup();
  const { store, integration, module } = toolbox;

  module.run({
    recurringTransactionId: '1',
    businessId: 'bizId',
    region: 'au',
  });
  store.resetActions();
  integration.resetRequests();

  return toolbox;
};

const setUpWithPageEdited = () => {
  const toolbox = setUpWithExisting();
  const { store, integration, module } = toolbox;

  module.updateSpendMoneyLine(0, 'accountId', '4');
  store.resetActions();
  integration.resetRequests();

  return toolbox;
};

describe('RecurringSpendMoneyModule', () => {
  mockCreateObjectUrl();

  describe('run', () => {
    it('should fail loading if we cannot load a new spend money', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_NEW_RECURRING_SPEND_MONEY);
      module.run({ recurringTransactionId: 'new' });

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
        }),
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING_FAIL,
        },
      ]);
    });

    it('should fail loading if we cannot load an existing spend money', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_RECURRING_SPEND_MONEY);
      module.run({ recurringTransactionId: '1' });

      expect(store.getActions()).toEqual([
        expect.objectContaining({
          intent: SET_INITIAL_STATE,
        }),
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING,
        },
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING_FAIL,
        },
      ]);
    });

    it('successfully loads existing with an abn', () => {
      const { store, integration, module } = setup();
      integration.mapSuccess(LOAD_RECURRING_SPEND_MONEY, {
        ...recurringSpendMoneyEntry,
        spendMoney: {
          ...recurringSpendMoneyEntry.spendMoney,
          payToContactId: '123',
        },
      });

      module.contactComboboxModule = {
        run: jest.fn(),
        load: jest.fn(),
      };

      module.jobComboboxModule = {
        run: jest.fn(),
        load: jest.fn(),
      };

      module.run({
        businessId: '👺',
        region: 'au',
        recurringTransactionId: '1',
      });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '👺',
            region: 'au',
            recurringTransactionId: '1',
            isRecurringTransactionEnabled: false,
          },
        },
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING,
        },
        expect.objectContaining({
          intent: LOAD_RECURRING_SPEND_MONEY,
        }),
        {
          intent: SET_LOADING_STATE,
          isLoading: LoadingState.LOADING_SUCCESS,
        },
        expect.objectContaining({
          intent: GET_TAX_CALCULATIONS,
        }),
        {
          intent: SET_ABN_LOADING_STATE,
          isAbnLoading: true,
        },
        {
          intent: SET_ABN_LOADING_STATE,
          isAbnLoading: false,
        },
        {
          intent: LOAD_ABN_FROM_CONTACT,
          abn: expect.any(Object),
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_RECURRING_SPEND_MONEY,
        }),
        expect.objectContaining({
          intent: LOAD_ABN_FROM_CONTACT,
          urlParams: { contactId: '123', businessId: '👺' },
        }),
      ]);

      const contactType = ContactType.ALL;

      expect(module.contactComboboxModule.run).toHaveBeenCalledWith(
        expect.objectContaining({
          contactType,
        })
      );
      expect(module.contactComboboxModule.load).toHaveBeenCalledWith('123');
    });

    it('should not send request to load abn if it is NZ business', () => {
      const { integration, module } = setup();

      module.contactComboboxModule = {
        run: jest.fn(),
        load: jest.fn(),
      };

      module.jobComboboxModule = {
        run: jest.fn(),
        load: jest.fn(),
      };

      module.run({
        businessId: '👺',
        region: 'nz',
        recurringTransactionId: '1',
      });

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_RECURRING_SPEND_MONEY,
        }),
      ]);

      const contactType = ContactType.ALL;

      expect(module.contactComboboxModule.run).toHaveBeenCalledWith(
        expect.objectContaining({
          contactType,
        })
      );
      expect(module.contactComboboxModule.load).toHaveBeenCalledWith('2');
    });
  });

  describe('createOrUpdateRecurringSpendMoney', () => {
    [
      {
        intent: CREATE_RECURRING_SPEND_MONEY,
        setup: setupWithNew,
      },
      {
        intent: UPDATE_RECURRING_SPEND_MONEY,
        setup: setUpWithExisting,
      },
    ].forEach((test) => {
      it('should save', () => {
        const { module, store, integration } = test.setup();
        module.pushMessage = jest.fn();
        module.navigateTo = jest.fn();

        module.createOrUpdateRecurringSpendMoney();

        expect(store.getActions()).toEqual([
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: true,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: false,
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: test.intent,
          }),
        ]);

        expect(module.pushMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            type: SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
          })
        );
        expect(module.navigateTo).toHaveBeenCalledWith(
          '/#/au/bizId/recurringTransaction'
        );
      });
    });

    [
      {
        intent: CREATE_RECURRING_SPEND_MONEY,
        setup: setupWithNew,
      },
      {
        intent: UPDATE_RECURRING_SPEND_MONEY,
        setup: setUpWithExisting,
      },
    ].forEach((test) => {
      it('should shown an alert if it fails', () => {
        const { module, store, integration } = test.setup();

        integration.mapFailure(test.intent);
        module.createOrUpdateRecurringSpendMoney();

        expect(store.getActions()).toEqual([
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: true,
          },
          {
            intent: SET_SUBMITTING_STATE,
            isSubmitting: false,
          },
          expect.objectContaining({
            intent: SET_ALERT,
          }),
        ]);
      });
    });

    it("should do an early return if it's already submitting", () => {
      const { module, store, integration } = setUpWithExisting();

      const dontTriggerOnSuccess = () => {};
      integration.overrideMapping(
        UPDATE_RECURRING_SPEND_MONEY,
        dontTriggerOnSuccess
      );

      // Setup: this will trigger an update spend money request,
      // but will not trigger the onSuccess which means that
      // the submitting state will not be set to false
      module.createOrUpdateRecurringSpendMoney();
      store.resetActions();

      module.createOrUpdateRecurringSpendMoney();

      expect(store.getActions()).toEqual([]);
    });
  });

  describe('deleteRecurringSpendMoney', () => {
    it('should display an alert when it fails to delete a spend money', () => {
      const { module, store, integration } = setUpWithExisting();

      integration.mapFailure(DELETE_RECURRING_SPEND_MONEY);
      module.deleteRecurringSpendMoney();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        expect.objectContaining({
          intent: SET_ALERT,
        }),
      ]);
    });
  });

  describe('saveHandler', () => {
    [
      {
        type: ModalType.CANCEL,
        setup: (module) => {
          module.openCancelModal();
        },
      },
      {
        type: ModalType.DELETE,
        setup: (module) => {
          module.openDeleteModal();
        },
      },
      {
        type: 'account quick add',
        setup: (module, integration) => {
          const onChange = () => {};
          module.openAccountModal(onChange);
          integration.resetRequests();
        },
      },
    ].forEach((test) => {
      it(`should not save a spend money given the modal type ${test.type}`, () => {
        const { module, integration } = setUpWithPageEdited();

        test.setup(module, integration);
        module.saveHandler();

        const toNotContain = (array, i) =>
          array.find(({ intent }) => intent === i) !== undefined;
        const hasUpdateSpendMoneyIntent = toNotContain(
          integration.getRequests(),
          UPDATE_RECURRING_SPEND_MONEY
        );

        expect(hasUpdateSpendMoneyIntent).toEqual(false);
      });
    });

    it('should save a spend money given an unsaved modal is open', () => {
      const { module, integration } = setUpWithExisting();

      module.openUnsavedModal('some-url');
      module.navigateTo = jest.fn();
      module.saveHandler();

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_RECURRING_SPEND_MONEY,
        }),
      ]);
      expect(module.navigateTo).toHaveBeenCalledWith('some-url');
    });

    it('should create contact when contact modal is open', () => {
      const { module } = setupWithNew();
      module.contactComboboxModule = {
        isContactModalOpened: () => true,
        createContact: jest.fn(),
      };

      module.saveHandler();

      expect(module.contactComboboxModule.createContact).toHaveBeenCalled();
    });
  });

  describe('addSpendMoneyLine', () => {
    it('adds a new spend money line', () => {
      const { module, store } = setupWithNew();

      const newlyAddedLine = {
        amount: '10',
      };

      module.addSpendMoneyLine(newlyAddedLine);

      expect(store.getActions()).toEqual([
        {
          intent: ADD_SPEND_MONEY_LINE,
          line: newlyAddedLine,
        },
      ]);
    });
  });
});
