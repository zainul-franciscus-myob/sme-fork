import { Provider } from 'react-redux';
import React from 'react';

import {
  getAgentDetails,
  getRegistrationUrl,
  getSelectedTab,
  getUrlParams,
} from './ReportingCentreSelectors';
import { tabIds } from './TabItems';
import AtoSettingsModule from './atoSettings/AtoSettingsModule';
// import FinalisationModule from './finalistion/FinalisationModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ReportingCentreReducer from './ReportingCentreReducer';
import ReportingCentreView from './components/ReportingCentreView';
import ReportsModule from './reports/ReportsModule';
import Store from '../../../store/Store';
import TerminationModule from './termination/TerminationModule';
import createReportingCentreDispatcher from './createReportingCentreDispatcher';
import createReportingCentreIntegrator from './createReportingCentreIntegrator';

export default class ReportingCentreModule {
  constructor({
    integration,
    setRootView,
    replaceURLParams,
  }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(ReportingCentreReducer);
    this.integrator = createReportingCentreIntegrator(this.store, this.integration);
    this.dispatcher = createReportingCentreDispatcher(this.store);
    this.subModules = {};
  }

  setupSubModules = (context) => {
    this.subModules = {
      // Uncomment each module as it is built - Jordan
      [tabIds.reports]: new ReportsModule({
        integration: this.integration,
        context,
        setAlert: this.dispatcher.setAlert,
      }),
      [tabIds.terminations]: new TerminationModule({
        integration: this.integration,
        context,
        setAlert: this.dispatcher.setAlert,
      }),
      // [tabIds.finalisation]: new FinalisationModule({
      //   integration,
      // }),
      [tabIds.atoSettings]: new AtoSettingsModule({
        integration: this.integration,
        context,
        setAlert: this.dispatcher.setAlert,
      }),
    };
  };

  redirectToRegistration = () => {
    window.location.href = getRegistrationUrl(this.store.getState());
  };

  loadRegistrationStatus = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setRegistrationStatus(response);
      if (response.status === 'registered') {
        this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
        this.runTab();
      } else {
        this.redirectToRegistration();
      }
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadRegistrationStatus({ onSuccess, onFailure });
  };

  setSelectedTab = (tab) => {
    this.dispatcher.setTab(tab);
    this.runTab();
  };

  runTab = () => {
    const state = this.store.getState();
    this.subModules[getSelectedTab(state)].run(getAgentDetails(state));
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

  run(context) {
    this.setupSubModules(context);
    this.store.subscribe(this.updateURLFromState);
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadRegistrationStatus();
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <ReportingCentreView
          tabModules={this.subModules}
          onDismissAlert={this.dispatcher.clearAlert}
          onTabSelected={this.setSelectedTab}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  }
}
