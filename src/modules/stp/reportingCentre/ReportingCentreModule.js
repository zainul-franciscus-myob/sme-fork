import { Provider } from 'react-redux';
import React from 'react';

import { getRegistrationUrl, getUrlParams } from './ReportingCentreSelectors';
import { tabIds } from './TabItems';
import AtoSettingsModule from './atoSettings/AtoSettingsModule';
// import FinalisationModule from './finalistion/FinalisationModule';
import ReportingCentreView from './components/ReportingCentreView';
import ReportsModule from './reports/ReportsModule';
import Store from '../../../store/Store';
// import TerminationModule from './termination/TerminationModule';
import createReportingCentreDispatcher from './createReportingCentreDispatcher';
import createReportingCentreIntegrator from './createReportingCentreIntegrator';
import reportingCentreReducer from './ReportingCentreReducer';

export default class ReportingCentreModule {
  constructor({
    integration,
    setRootView,
    popMessages,
    pushMessage,
    replaceURLParams,
  }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.popMessages = popMessages;
    this.pushMessage = pushMessage;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(reportingCentreReducer);
    this.integrator = createReportingCentreIntegrator(this.store, this.integration);
    this.dispatcher = createReportingCentreDispatcher(this.store);
    this.subModules = {
      // Uncomment each module as it is built - Jordan
      [tabIds.reports]: new ReportsModule({
        integration,
        store: this.store,
        pushMessage,
      }),
      // [tabIds.terminations]: new TerminationModule({
      //   integration,
      //   store: this.store,
      //   pushMessage,
      // }),
      // [tabIds.finalisation]: new FinalisationModule({
      //   integration,
      //   store: this.store,
      //   pushMessage,
      // }),
      [tabIds.atoSettings]: new AtoSettingsModule({
        integration,
        store: this.store,
        pushMessage,
      }),
    };
  }

  redirectToRegistration = () => {
    window.location.href = getRegistrationUrl(this.store.getState());
  };

  loadRegistrationStatus = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (response) => {
      if (response.status === 'registered') {
        this.dispatcher.setLoadingState(false);
      } else {
        this.redirectToRegistration();
      }
    };

    const onFailure = ({ message }) => {
      console.log(`Failed to load STP registration status. ${message}`);
    };

    this.integrator.loadRegistrationStatus({ onSuccess, onFailure });
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
          onTabSelected={this.dispatcher.setTab}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  }
}
