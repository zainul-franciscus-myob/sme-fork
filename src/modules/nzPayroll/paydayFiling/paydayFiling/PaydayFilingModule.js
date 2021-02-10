import { Provider } from 'react-redux';
import React from 'react';

import {
  getSelectedTab,
  getUrlParams,
  isIrdAuthorisationComplete,
} from './PaydayFilingSelectors';
import { tabIds } from './TabItems';
import EiSubmissionsModule from './eiSubmissions/EiSubmissionsModule';
import InlandRevenueSettingsModule from './inlandRevenueSettings/InlandRevenueSettingsModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import PaydayCentreView from './components/PaydayFilingView';
import PaydayFilingReducer from './PaydayFilingReducer';
import Store from '../../../../store/Store';
import createPaydayFilingDispatcher from './createPaydayFilingDispatcher';
import createPaydayFilingIntegrator from './createPaydayFilingIntegrator';
import routeName from '../../../../router/RouteName';

export default class PaydayFilingModule {
  constructor({
    integration,
    setRootView,
    replaceURLParams,
    featureToggles,
    pushMessage,
    popMessages,
    navigateToName,
    navigateTo,
  }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.featureToggles = featureToggles;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(PaydayFilingReducer);
    this.integrator = createPaydayFilingIntegrator(this.store, integration);
    this.dispatcher = createPaydayFilingDispatcher(this.store);
    this.popMessages = popMessages;
    this.pushMessage = pushMessage;
    this.subModules = {};
    this.navigateToName = navigateToName;
    this.navigateTo = navigateTo;
  }

  setupSubModules = (context) => {
    this.subModules = {
      [tabIds.eiSubmissions]: new EiSubmissionsModule({
        store: this.store,
        integration: this.integration,
        context,
      }),
      [tabIds.irdSettings]: new InlandRevenueSettingsModule({
        integration: this.integration,
        store: this.store,
        navigateTo: this.navigateTo,
        context,
      }),
    };
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    }
  };

  setSelectedTab = (tab) => {
    this.attemptToRoute(() => {
      this.dispatcher.setTab(tab);
      this.runTab();
    });
  };

  runTab = () => {
    const state = this.store.getState();
    this.subModules[getSelectedTab(state)].run();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  updateURLFromState = (state) => {
    this.replaceURLParams(getUrlParams(state));
  };

  loadUserSession = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.loadUserSession(response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadUserSession({ onSuccess, onFailure });
  };

  paydayFilingInit = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      const { isBusinessOnboarded, areMultipleUsersOnboarded } = response;
      this.dispatcher.setIsBusinessOnboarded(isBusinessOnboarded);
      this.dispatcher.setMultipleUsersOnboarded(areMultipleUsersOnboarded);
      if (isBusinessOnboarded) {
        this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
        this.loadUserSession();
      } else {
        this.redirectToOnboardingPage();
      }
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBusinessOnboardedDetails({ onSuccess, onFailure });
  };

  checkAuthorisation = () => {
    const state = this.store.getState();

    if (isIrdAuthorisationComplete(state)) {
      this.updateOnboardUser();
    }
  };

  updateOnboardUser = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.setSelectedTab(tabIds.irdSettings);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ message, type: 'success' });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.replaceURLParams({ authorisation: undefined });
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.updateOnboardUser({ onSuccess, onFailure });
  };

  closeRemoveAuthorisationModal = () => {
    this.dispatcher.closeRemoveAuthorisationModal();
  };

  onModalRemoveAuthorisation = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    this.integrator.removeUserAuthorisation({
      onSuccess: () => {
        this.closeRemoveAuthorisationModal();
        this.paydayFilingInit();
      },
      onFailure: () => {
        this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
      },
    });
  };

  run(context) {
    if (this.featureToggles.isPaydayFilingEnabled) {
      this.setupSubModules(context);
      this.dispatcher.setInitialState(context);
      this.paydayFilingInit();
      this.checkAuthorisation();
      this.runTab();
      this.render();
    } else this.redirectToBusinessList();
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <PaydayCentreView
          tabModules={this.subModules}
          onDismissAlert={this.dispatcher.clearAlert}
          onTabSelected={this.setSelectedTab}
          featureToggles={this.featureToggles}
          onCloseRemoveAuthorisationModal={this.closeRemoveAuthorisationModal}
          onModalRemoveAuthorisation={this.onModalRemoveAuthorisation}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  redirectToUrl = (url) => {
    window.location.href = url;
  };

  attemptToRoute = (navigationFunction) => {
    const state = this.store.getState();
    const subModule = this.subModules[getSelectedTab(state)];
    if (subModule.tryToNavigate) {
      subModule.tryToNavigate(navigationFunction);
    } else {
      navigationFunction();
    }
  };

  handlePageTransition = (url) => {
    this.attemptToRoute(() => {
      this.redirectToUrl(url);
    });
  };

  redirectToOnboardingPage = () => {
    this.navigateToName(routeName.PAYDAY_FILING_ONBOARDING);
  };

  redirectToBusinessList = () => {
    this.navigateToName(routeName.BUSINESS_LIST);
  };
}
