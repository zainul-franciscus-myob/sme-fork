import { Provider } from 'react-redux';
import React from 'react';

import { getRegistrationUrl, getSelectedTab, getUrlParams } from './ReportingCentreSelectors';
import { tabIds } from './TabItems';
import AtoSettingsModule from './atoSettings/AtoSettingsModule';
// import FinalisationModule from './finalistion/FinalisationModule';
import ReportingCentreView from './components/ReportingCentreView';
import ReportsModule from './reports/ReportsModule';
import Store from '../../../store/Store';
// import TerminationModule from './termination/TerminationModule';
import ReportingCentreReducer from './ReportingCentreReducer';
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
      // [tabIds.terminations]: new TerminationModule({
      //   integration,
      // }),
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
    this.dispatcher.setLoadingState(true);

    const onSuccess = (response) => {
      if (response.status === 'registered') {
        this.dispatcher.setLoadingState(false);
        this.runTab();
      } else {
        this.redirectToRegistration();
      }
    };

    const onFailure = ({ message }) => {
      console.log(`Failed to load STP registration status. ${message}`);
    };

    this.integrator.loadRegistrationStatus({ onSuccess, onFailure });
  };

  setSelectedTab = (tab) => {
    this.dispatcher.setTab(tab);
    this.runTab();
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
