import {
  LOAD_CONTACT_COMBOBOX_OPTIONS,
  LOAD_CONTACT_COMBOBOX_OPTION_BY_ID,
  SEARCH_CONTACT_COMBOBOX,
  SET_CONTACT_COMBOBOX_LOADING_STATE,
  SET_CONTACT_COMBOBOX_OPTIONS_LOADING_STATE,
} from '../../ContactIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import AlertType from '../../../../common/types/AlertType';
import ContactComboboxModule from '../ContactComboboxModule';
import ContactType from '../types/ContactType';
import DisplayMode from '../types/DisplayMode';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import contactComboboxReducer from '../contactComboboxReducer';
import createContactComboboxDispatcher from '../createContactComboboxDispatcher';
import createContactComboboxIntegrator from '../createContactComboboxIntegrator';

describe('ContactComboboxModule', () => {
  const setUp = () => {
    const integration = new TestIntegration();

    const module = new ContactComboboxModule({ integration });

    const store = new TestStore(contactComboboxReducer);
    module.store = store;
    module.dispatcher = createContactComboboxDispatcher({ store });
    module.integrator = createContactComboboxIntegrator({
      store,
      integration,
    });

    return { module, store, integration };
  };

  const setUpWithRun = () => {
    const { module, store, integration } = setUp();

    module.run({
      businessId: 'businessId',
      region: 'au',
      contactType: ContactType.ALL,
      displayMode: DisplayMode.NAME_AND_TYPE,
    });
    store.resetActions();
    integration.resetRequests();

    return { module, integration, store };
  };

  describe('run', () => {
    it('successfully load', () => {
      const { module, store, integration } = setUp();
      const context = {
        businessId: 'businessId',
        region: 'au',
        contactType: ContactType.CUSTOMER,
        displayMode: DisplayMode.NAME_ONLY,
      };

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: SET_CONTACT_COMBOBOX_OPTIONS_LOADING_STATE, isLoading: true },
        {
          intent: SET_CONTACT_COMBOBOX_OPTIONS_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTIONS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTIONS }),
      ]);
    });

    it('load selected contact if provided', () => {
      const { module, store, integration } = setUp();
      const context = {
        businessId: 'businessId',
        region: 'au',
        contactId: '1',
        contactType: ContactType.CUSTOMER,
        displayMode: DisplayMode.NAME_ONLY,
      };

      module.run(context);

      expect(store.getActions()).toEqual([
        { intent: SET_INITIAL_STATE, context },
        { intent: SET_CONTACT_COMBOBOX_OPTIONS_LOADING_STATE, isLoading: true },
        {
          intent: SET_CONTACT_COMBOBOX_OPTIONS_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTIONS }),
        { intent: SET_CONTACT_COMBOBOX_LOADING_STATE, isLoading: true },
        { intent: SET_CONTACT_COMBOBOX_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTION_BY_ID }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTIONS }),
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTION_BY_ID }),
      ]);
    });
  });

  describe('load', () => {
    const setUpWithContactOptions = (contactOptions) => {
      const { module, store, integration } = setUp();
      integration.mapSuccess(LOAD_CONTACT_COMBOBOX_OPTIONS, { contactOptions });
      module.run({
        businessId: 'businessId',
        region: 'au',
        contactType: ContactType.ALL,
        displayMode: DisplayMode.NAME_AND_TYPE,
      });
      store.resetActions();
      integration.resetRequests();

      return { module, integration, store };
    };

    it('successfully load', () => {
      const { module, store, integration } = setUpWithContactOptions([
        { id: '1' },
      ]);

      module.load('2');

      expect(store.getActions()).toEqual([
        { intent: SET_CONTACT_COMBOBOX_LOADING_STATE, isLoading: true },
        { intent: SET_CONTACT_COMBOBOX_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTION_BY_ID }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTION_BY_ID }),
      ]);
    });

    it('does not load contact option if it already exists in the list', () => {
      const { module, store, integration } = setUpWithContactOptions([
        { id: '1' },
      ]);

      module.load('1');

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });

    it('does not load contact option if contactId is empty', () => {
      const { module, store, integration } = setUpWithRun();

      module.load('');

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('loadContactComboboxOptions', () => {
    it('successfully load', () => {
      const { module, store, integration } = setUpWithRun();

      module.loadContactComboboxOptions();

      expect(store.getActions()).toEqual([
        { intent: SET_CONTACT_COMBOBOX_OPTIONS_LOADING_STATE, isLoading: true },
        {
          intent: SET_CONTACT_COMBOBOX_OPTIONS_LOADING_STATE,
          isLoading: false,
        },
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTIONS }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTIONS }),
      ]);
    });
  });

  describe('searchContactCombobox', () => {
    it('successfully load', () => {
      const { module, store, integration } = setUpWithRun();
      const onSuccess = jest.fn();

      module.searchContactCombobox({
        keywords: 'keywords',
        onSuccess,
        onFailure: () => {},
      });

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: SEARCH_CONTACT_COMBOBOX }),
      ]);
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  describe('openContactModal', () => {
    it('open contact modal', () => {
      const { module } = setUpWithRun();
      module.contactModalModule.run = jest.fn();

      module.openContactModal('customerId');

      expect(module.contactModalModule.run).toHaveBeenCalled();
    });
  });

  describe('loadContactComboboxOptionAfterCreate', () => {
    it('load newly created contact and add option to the list', () => {
      const { module, store, integration } = setUpWithRun();
      module.onAlert = jest.fn();

      module.loadContactComboboxOptionAfterCreate({
        id: '39',
        message: 'Success!',
      });

      expect(module.onAlert).toHaveBeenCalledWith({
        type: AlertType.SUCCESS,
        message: 'Success!',
      });
      expect(store.getActions()).toEqual([
        { intent: SET_CONTACT_COMBOBOX_LOADING_STATE, isLoading: true },
        { intent: SET_CONTACT_COMBOBOX_LOADING_STATE, isLoading: false },
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTION_BY_ID }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({ intent: LOAD_CONTACT_COMBOBOX_OPTION_BY_ID }),
      ]);
    });
  });
});
