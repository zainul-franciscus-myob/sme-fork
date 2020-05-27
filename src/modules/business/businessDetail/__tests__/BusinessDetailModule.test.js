import {
  CLOSE_FINANCIAL_YEAR_MODAL,
  CLOSE_MODAL,
  LOAD_BUSINESS_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_LOCK_DATE_AUTO_POPULATED_STATE,
  SET_PAGE_EDITED_STATE,
  SET_SUBMITTING_STATE,
  START_LOADING_FINANCIAL_YEAR_MODAL,
  START_NEW_FINANCIAL_YEAR,
  STOP_LOADING_FINANCIAL_YEAR_MODAL,
  UPDATE_BUSINESS_DETAIL,
} from '../../BusinessIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import BusinessDetailModule from '../businessDetailModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import businessDetailsReducer from '../businessDetailReducer';
import createBusinessDetailDispatcher from '../createBusinessDetailDispatcher';
import createBusinessDetailIntegrator from '../createBusinessDetailIntegrator';

describe('BusinessDetailModule', () => {
  const setup = () => {
    const store = new TestStore(businessDetailsReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const isToggleOn = () => true;

    const module = new BusinessDetailModule({ integration, setRootView, isToggleOn });
    module.store = store;
    module.dispatcher = createBusinessDetailDispatcher(store);
    module.integrator = createBusinessDetailIntegrator(store, integration);

    return { module, store, integration };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ businessId: '🦒' });
    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithEditedPage = () => {
    const toolbox = setup();
    const { module, store } = toolbox;

    module.updateBusinessDetailField({ key: 'description', value: '🤯' });

    expect(store.getActions()).toEqual([
      {
        intent: SET_PAGE_EDITED_STATE,
        isPageEdited: true,
      },
      {
        intent: UPDATE_BUSINESS_DETAIL,
        key: 'description',
        value: '🤯',
      },
    ]);

    store.resetActions();

    return toolbox;
  };


  describe('run', () => {
    it('successfully load', () => {
      const { module, store, integration } = setup();

      module.run({ businessId: '🦒' });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🦒',
            isStartNewFinancialYearEnabled: true,
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
          intent: LOAD_BUSINESS_DETAIL,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_BUSINESS_DETAIL,
        }),
      ]);
    });

    it('fails to load', () => {
      const { module, store, integration } = setup();
      integration.mapFailure(LOAD_BUSINESS_DETAIL);

      module.run({ businessId: '🦒' });

      expect(store.getActions()).toEqual([
        {
          intent: SET_INITIAL_STATE,
          context: {
            businessId: '🦒',
            isStartNewFinancialYearEnabled: true,
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
          intent: LOAD_BUSINESS_DETAIL,
        }),
      ]);
    });
  });

  describe('updateBusinessDetail', () => {
    it('successfully update', () => {
      const { module, store, integration } = setupWithEditedPage();
      module.businessDetailsConfirmed = jest.fn();

      module.updateBusinessDetail();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_PAGE_EDITED_STATE,
          isPageEdited: false,
        },
        {
          intent: SET_LOCK_DATE_AUTO_POPULATED_STATE,
          isLockDateAutoPopulated: false,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alert: {
            type: 'success',
            message: expect.any(String),
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_BUSINESS_DETAIL,
        }),
      ]);
      expect(module.businessDetailsConfirmed).toHaveBeenCalled();
    });

    it('fails to update', () => {
      const { module, store, integration } = setupWithEditedPage();
      integration.mapFailure(UPDATE_BUSINESS_DETAIL);

      module.updateBusinessDetail();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alert: {
            type: 'danger',
            message: 'fails',
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_BUSINESS_DETAIL,
        }),
      ]);
    });

    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithEditedPage();
      module.dispatcher.setSubmittingState(true);
      store.resetActions();

      module.updateBusinessDetail();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('updateAndRedirectToUrl', () => {
    const setupWithOpenUnsavedModal = () => {
      const toolbox = setupWithEditedPage();
      const { module, store } = toolbox;

      module.dispatcher.openModal('🥮');

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            url: '🥮',
          },
        },
      ]);

      store.resetActions();

      return toolbox;
    };

    it('successfully update', () => {
      const { module, store, integration } = setupWithOpenUnsavedModal();
      module.redirectToUrl = jest.fn();

      module.updateAndRedirectToUrl();

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
          intent: UPDATE_BUSINESS_DETAIL,
        }),
      ]);
      expect(module.redirectToUrl).toHaveBeenCalledWith('🥮');
    });

    it('fails to update', () => {
      const { module, store, integration } = setupWithOpenUnsavedModal();
      integration.mapFailure(UPDATE_BUSINESS_DETAIL);

      module.updateAndRedirectToUrl();

      expect(store.getActions()).toEqual([
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: true,
        },
        {
          intent: SET_SUBMITTING_STATE,
          isSubmitting: false,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alert: {
            type: 'danger',
            message: 'fails',
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: UPDATE_BUSINESS_DETAIL,
        }),
      ]);
    });

    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithOpenUnsavedModal();
      module.dispatcher.setSubmittingState(true);
      store.resetActions();

      module.updateAndRedirectToUrl();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('handlePageTransition', () => {
    it('redirects to url when not edited', () => {
      const { module } = setupWithRun();
      module.redirectToUrl = jest.fn();

      module.handlePageTransition('👩‍🚀');

      expect(module.redirectToUrl).toHaveBeenCalledWith('👩‍🚀');
    });

    it('opens unsaved modal when edited', () => {
      const { module, store } = setupWithEditedPage();

      module.handlePageTransition('👩‍🚀');

      expect(store.getActions()).toEqual([
        {
          intent: OPEN_MODAL,
          modal: {
            url: '👩‍🚀',
          },
        },
      ]);
    });
  });

  describe('dismissAlertMessage', () => {
    const setupWithAlert = () => {
      const toolbox = setupWithEditedPage();
      const { store, integration, module } = toolbox;
      module.businessDetailsConfirmed = () => {};

      module.updateBusinessDetail();

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT_MESSAGE,
        alert: {
          type: 'success',
          message: expect.any(String),
        },
      });

      store.resetActions();
      integration.resetRequests();

      return toolbox;
    };

    it('hides alert', () => {
      const { module, store } = setupWithAlert();

      module.dismissAlert();

      expect(store.getActions()).toEqual([
        {
          intent: SET_ALERT_MESSAGE,
          alert: undefined,
        },
      ]);
    });
  });

  describe('startNewFinancialYear', () => {
    it('successfully update financial year', () => {
      const { module, store, integration } = setupWithRun();
      module.startNewFinancialYear();

      expect(store.getActions()).toEqual([
        {
          intent: START_LOADING_FINANCIAL_YEAR_MODAL,
        },
        {
          intent: STOP_LOADING_FINANCIAL_YEAR_MODAL,
        },
        {
          intent: CLOSE_FINANCIAL_YEAR_MODAL,
        },
        expect.objectContaining({
          intent: LOAD_BUSINESS_DETAIL,
        }),
        {
          intent: SET_ALERT_MESSAGE,
          alert: {
            message: expect.any(String),
            type: 'success',
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: START_NEW_FINANCIAL_YEAR,
        }),
        expect.objectContaining({
          intent: LOAD_BUSINESS_DETAIL,
        }),
      ]);
    });

    it('fails to update financial year', () => {
      const { module, store, integration } = setupWithRun();
      integration.mapFailure(START_NEW_FINANCIAL_YEAR);
      module.startNewFinancialYear();

      expect(store.getActions()).toEqual([
        {
          intent: START_LOADING_FINANCIAL_YEAR_MODAL,
        },
        {
          intent: STOP_LOADING_FINANCIAL_YEAR_MODAL,
        },
        {
          intent: CLOSE_FINANCIAL_YEAR_MODAL,
        },
        {
          intent: SET_ALERT_MESSAGE,
          alert: {
            message: 'fails',
            type: 'danger',
          },
        },
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: START_NEW_FINANCIAL_YEAR,
        }),
      ]);
    });

    it('fails to load business details', () => {
      const { module, store, integration } = setupWithRun();
      integration.mapFailure(LOAD_BUSINESS_DETAIL);
      module.startNewFinancialYear();

      expect(store.getActions()).toContainEqual(
        {
          intent: SET_ALERT_MESSAGE,
          alert: {
            message: 'fails',
            type: 'danger',
          },
        },
      );
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: START_NEW_FINANCIAL_YEAR,
        }),
        expect.objectContaining({
          intent: LOAD_BUSINESS_DETAIL,
        }),
      ]);
    });
  });
});
