import {
  CLOSE_FINANCIAL_YEAR_MODAL,
  CLOSE_MODAL,
  DISCARD_TAB_DATA,
  LOAD_BUSINESS_SETTINGS,
  OPEN_MODAL,
  SAVE_BUSINESS_DETAILS,
  SAVE_GST_SETTINGS,
  SET_ALERT_MESSAGE,
  SET_IS_FINANCIAL_YEAR_SETTINGS_CHANGED_STATE,
  SET_LOADING_STATE,
  SET_LOCK_DATE_AUTO_POPULATED_STATE,
  SET_PAGE_EDITED_STATE,
  SET_PENDING_TAB,
  SET_SUBMITTING_STATE,
  SET_TAB,
  START_LOADING_FINANCIAL_YEAR_MODAL,
  START_NEW_FINANCIAL_YEAR,
  STOP_LOADING_FINANCIAL_YEAR_MODAL,
  UPDATE_BUSINESS_DETAILS,
} from '../../BusinessIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { mainTabIds } from '../tabItems';
import BusinessSettingsModule from '../businessSettingsModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import businessSettingsReducer from '../businessSettingsReducer';
import businessSettingsResponse from '../../mappings/data/businessSettingsResponse';
import createBusinessSettingsDispatcher from '../createBusinessSettingsDispatcher';
import createBusinessSettingsIntegrator from '../createBusinessSettingsIntegrator';
import modalTypes from '../modalTypes';

describe('BusinessSettingsModule', () => {
  const setup = () => {
    const store = new TestStore(businessSettingsReducer);
    const integration = new TestIntegration();
    const setRootView = () => {};
    const isToggleOn = () => true;

    const module = new BusinessSettingsModule({
      integration,
      setRootView,
      isToggleOn,
    });
    module.store = store;
    module.dispatcher = createBusinessSettingsDispatcher(store);
    module.integrator = createBusinessSettingsIntegrator(store, integration);

    return { module, store, integration };
  };

  const setupWithRun = () => {
    const toolbox = setup();
    const { store, integration, module } = toolbox;

    module.run({ businessId: '🦒', region: 'AU' });
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
        intent: UPDATE_BUSINESS_DETAILS,
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
          intent: LOAD_BUSINESS_SETTINGS,
        }),
      ]);
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: LOAD_BUSINESS_SETTINGS,
        }),
      ]);
    });

    it('fails to load', () => {
      const { module, store, integration } = setup();
      integration.mapFailure(LOAD_BUSINESS_SETTINGS);

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
          intent: LOAD_BUSINESS_SETTINGS,
        }),
      ]);
    });
  });

  describe('updateBusinessDetail', () => {
    it('successfully update', () => {
      const { module, store, integration } = setupWithEditedPage();
      module.businessDetailsConfirmed = jest.fn();
      module.loadGlobalBusinessDetails = jest.fn();

      module.updateBusinessDetails();

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
        {
          intent: SET_IS_FINANCIAL_YEAR_SETTINGS_CHANGED_STATE,
          isFinancialYearSettingsChanged: false,
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: 'LOADING',
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: 'LOADING_SUCCESS',
        },
        {
          intent: LOAD_BUSINESS_SETTINGS,
          businessDetails: businessSettingsResponse.businessDetails,
          gstSettings: businessSettingsResponse.gstSettings,
          financialYearOptions: businessSettingsResponse.financialYearOptions,
          openingBalanceYearOptions: undefined,
          pageTitle: undefined,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SAVE_BUSINESS_DETAILS,
        }),
        expect.objectContaining({
          intent: LOAD_BUSINESS_SETTINGS,
        }),
      ]);
      expect(module.businessDetailsConfirmed).toHaveBeenCalled();
      expect(module.loadGlobalBusinessDetails).toHaveBeenCalled();
    });

    it('fails to update', () => {
      const { module, store, integration } = setupWithEditedPage();
      integration.mapFailure(SAVE_BUSINESS_DETAILS);

      module.updateBusinessDetails();

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
          intent: SAVE_BUSINESS_DETAILS,
        }),
      ]);
    });

    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithEditedPage();
      module.dispatcher.setSubmittingState(true);
      store.resetActions();

      module.updateBusinessDetails();

      expect(store.getActions()).toEqual([]);
      expect(integration.getRequests()).toEqual([]);
    });
  });

  describe('updateGstSettings', () => {
    it('successfully update', () => {
      const { module, store, integration } = setupWithEditedPage();
      module.updateGstSettings();

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
          intent: SET_ALERT_MESSAGE,
          alert: {
            type: 'success',
            message: expect.any(String),
          },
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: 'LOADING',
        },
        {
          intent: SET_LOADING_STATE,
          loadingState: 'LOADING_SUCCESS',
        },
        {
          intent: LOAD_BUSINESS_SETTINGS,
          businessDetails: businessSettingsResponse.businessDetails,
          gstSettings: businessSettingsResponse.gstSettings,
          financialYearOptions: businessSettingsResponse.financialYearOptions,
          openingBalanceYearOptions: undefined,
          pageTitle: undefined,
        },
      ]);

      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: SAVE_GST_SETTINGS,
        }),
        expect.objectContaining({
          intent: LOAD_BUSINESS_SETTINGS,
        }),
      ]);
    });

    it('fails to update', () => {
      const { module, store, integration } = setupWithEditedPage();
      integration.mapFailure(SAVE_GST_SETTINGS);

      module.updateGstSettings();

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
          intent: SAVE_GST_SETTINGS,
        }),
      ]);
    });

    it('does nothing when already submitting', () => {
      const { module, store, integration } = setupWithEditedPage();
      module.dispatcher.setSubmittingState(true);
      store.resetActions();

      module.updateGstSettings();

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
          intent: SAVE_BUSINESS_DETAILS,
        }),
      ]);
      expect(module.redirectToUrl).toHaveBeenCalledWith('🥮');
    });

    it('fails to update', () => {
      const { module, store, integration } = setupWithOpenUnsavedModal();
      integration.mapFailure(SAVE_BUSINESS_DETAILS);

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
          intent: SAVE_BUSINESS_DETAILS,
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
            type: 'unsaved',
          },
        },
      ]);
    });
  });

  describe('openCancelModal', () => {
    it('redirects to dashboard url when not edited', () => {
      const { module } = setupWithRun();
      module.redirectToUrl = jest.fn();

      module.openCancelModal();

      expect(module.redirectToUrl).toHaveBeenCalledWith('/#/AU/🦒/dashboard');
    });

    it('opens cancel modal when edited', () => {
      const { module, store } = setup();

      module.run({ businessId: '123', region: 'AU' });
      store.resetActions();

      module.updateBusinessDetailField({ key: 'description', value: '🤯' });
      module.openCancelModal();

      expect(store.getActions()).toEqual([
        {
          intent: SET_PAGE_EDITED_STATE,
          isPageEdited: true,
        },
        {
          intent: UPDATE_BUSINESS_DETAILS,
          key: 'description',
          value: '🤯',
        },
        {
          intent: OPEN_MODAL,
          modal: {
            url: '/#/AU/123/dashboard',
            type: 'cancel',
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
      module.loadGlobalBusinessDetails = () => {};

      module.updateBusinessDetails();

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
          intent: LOAD_BUSINESS_SETTINGS,
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
          intent: LOAD_BUSINESS_SETTINGS,
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
      integration.mapFailure(LOAD_BUSINESS_SETTINGS);
      module.startNewFinancialYear();

      expect(store.getActions()).toContainEqual({
        intent: SET_ALERT_MESSAGE,
        alert: {
          message: 'fails',
          type: 'danger',
        },
      });
      expect(integration.getRequests()).toEqual([
        expect.objectContaining({
          intent: START_NEW_FINANCIAL_YEAR,
        }),
        expect.objectContaining({
          intent: LOAD_BUSINESS_SETTINGS,
        }),
      ]);
    });
  });

  describe('switchTab', () => {
    it('sets tab to selected tab', () => {
      const { module, store } = setupWithRun();
      module.replaceURLParams = jest.fn();

      module.switchTab(mainTabIds.gstSettings);

      expect(store.getActions()).toEqual([
        {
          intent: SET_TAB,
          selectedTab: mainTabIds.gstSettings,
        },
      ]);
      expect(module.replaceURLParams).toHaveBeenCalledWith({
        selectedTab: mainTabIds.gstSettings,
      });
    });

    it('opens switch tab modal when page edited', () => {
      const { module, store } = setupWithRun();
      module.updateBusinessDetailField({ key: 'description', value: '🤯' });
      store.resetActions();

      module.switchTab(mainTabIds.gstSettings);

      expect(store.getActions()).toEqual([
        {
          intent: SET_PENDING_TAB,
          pendingTab: mainTabIds.gstSettings,
        },
        {
          intent: OPEN_MODAL,
          modal: { type: modalTypes.switchTab, url: mainTabIds.gstSettings },
        },
      ]);
    });
  });

  describe('onConfirmSwitchTab', () => {
    const setupWithSwitchTabModal = () => {
      const toolbox = setupWithRun();
      const { module, store } = toolbox;

      module.updateBusinessDetailField({ key: 'description', value: '🤯' });
      module.switchTab(mainTabIds.gstSettings);

      store.resetActions();

      return toolbox;
    };

    it('sets tab to pending tab', () => {
      const { module, store } = setupWithSwitchTabModal();
      module.replaceURLParams = jest.fn();

      module.onConfirmSwitchTab();

      expect(store.getActions()).toEqual([
        {
          intent: DISCARD_TAB_DATA,
        },
        {
          intent: SET_TAB,
          selectedTab: mainTabIds.gstSettings,
        },
        {
          intent: CLOSE_MODAL,
        },
      ]);
      expect(module.replaceURLParams).toHaveBeenCalledWith({
        selectedTab: mainTabIds.gstSettings,
      });
    });
  });
});
