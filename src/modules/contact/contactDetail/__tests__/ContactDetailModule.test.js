import {
  CLEAR_ABN_VALIDATION_RESULT,
  CLOSE_MODAL,
  CREATE_CONTACT,
  DELETE_CONTACT,
  LOAD_ABN_VALIDATION_RESULT,
  LOAD_CONTACT_DETAIL,
  LOAD_NEW_CONTACT,
  SET_ABN_VALIDATE_STATE,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_CONTACT,
} from '../../ContactIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import ContactDetailModule from '../ContactDetailModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import contactDetailReducer from '../contactDetailReducer';
import createContactDetailDispatcher from '../createContactDetailDispatcher';
import createContactDetailIntegrator from '../createContactDetailIntegrator';

describe('ContactDetailModule', () => {
  const setup = () => {
    const store = new TestStore(contactDetailReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const pushMessage = () => {};

    const module = new ContactDetailModule({ integration, setRootView, pushMessage });
    module.store = store;
    module.dispatcher = createContactDetailDispatcher(store);
    module.integrator = createContactDetailIntegrator(store, integration);

    return { store, integration, module };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ contactId: 'new' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  describe('create contact', () => {
    it('successfully load new contact', () => {
      const { store, integration, module } = setupWithNew();

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
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
          intent: LOAD_NEW_CONTACT,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_NEW_CONTACT,
        }),
      ]);
    });

    it('fails to create contact', () => {
      const { store, integration, module } = setupWithNew();
      integration.mapFailure(LOAD_NEW_CONTACT);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
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
          intent: LOAD_NEW_CONTACT,
        }),
      ]);
    });

    it('successfully save new contact', () => {
      const { store, integration, module } = setupWithNew();

      module.updateOrCreateContact();

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
          intent: CREATE_CONTACT,
        }),
      ]);
    });

    it('fails to save new contact', () => {
      const { store, integration, module } = setupWithNew();
      integration.mapFailure(CREATE_CONTACT);

      module.updateOrCreateContact();

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
          intent: SET_ALERT_MESSAGE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: CREATE_CONTACT,
        }),
      ]);
    });
  });

  describe('update contact', () => {
    it('successfully load contact', () => {
      const { store, integration, module } = setup();

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
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
          intent: LOAD_CONTACT_DETAIL,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_CONTACT_DETAIL,
        }),
      ]);
    });

    it('fails to load contact', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(LOAD_CONTACT_DETAIL);

      module.run({});

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {},
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
          intent: LOAD_CONTACT_DETAIL,
        }),
      ]);
    });

    it('successfully save contact', () => {
      const { store, integration, module } = setup();

      module.updateOrCreateContact();

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
          intent: UPDATE_CONTACT,
        }),
      ]);
    });

    it('fails to save contact', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(UPDATE_CONTACT);

      module.updateOrCreateContact();

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
          intent: SET_ALERT_MESSAGE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_CONTACT,
        }),
      ]);
    });
  });

  describe('delete contact', () => {
    it('successfully delete contact', () => {
      const { store, integration, module } = setup();

      module.deleteContact();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: CLOSE_MODAL,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_CONTACT,
        }),
      ]);
    });

    it('fail to delete contact', () => {
      const { store, integration, module } = setup();
      integration.mapFailure(DELETE_CONTACT);

      module.deleteContact();

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
          intent: SET_ALERT_MESSAGE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: DELETE_CONTACT,
        }),
      ]);
    });
  });

  describe('validate abn', () => {
    it('clear validation result if abn is empty', () => {
      const { store, module } = setup();
      store.state = {
        contact: {
          abn: '',
        },
      };
      module.validateAbn();

      expect(store.getActions()).toEqual([
        {
          intent: CLEAR_ABN_VALIDATION_RESULT,
        },
      ]);
    });

    it('successfully validate abn', () => {
      const { store, integration, module } = setup();
      store.state = {
        contact: {
          abn: '123',
        },
      };
      module.validateAbn();

      expect(store.getActions()).toEqual([
        {
          intent: SET_ABN_VALIDATE_STATE,
          isValidatingAbn: true,
        },
        {
          intent: SET_ABN_VALIDATE_STATE,
          isValidatingAbn: false,
        },
        expect.objectContaining({
          intent: LOAD_ABN_VALIDATION_RESULT,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ABN_VALIDATION_RESULT,
        }),
      ]);
    });

    it('fail to validate abn', () => {
      const { store, integration, module } = setup();
      store.state = {
        contact: {
          abn: '123',
        },
      };
      integration.mapFailure(LOAD_ABN_VALIDATION_RESULT);

      module.validateAbn();

      expect(store.getActions()).toEqual([
        {
          intent: SET_ABN_VALIDATE_STATE,
          isValidatingAbn: true,
        },
        {
          intent: SET_ABN_VALIDATE_STATE,
          isValidatingAbn: false,
        },
        {
          intent: CLEAR_ABN_VALIDATION_RESULT,
        },
        expect.objectContaining({
          intent: SET_ALERT_MESSAGE,
        }),
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_ABN_VALIDATION_RESULT,
        }),
      ]);
    });
  });
});
