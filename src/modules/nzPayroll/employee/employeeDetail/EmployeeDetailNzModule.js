import { Provider } from 'react-redux';
import React from 'react';

import { getURLParams } from './EmployeeDetailNzSelectors';
import { tabItems } from './tabItems';
import ContactDetailsNzTabModule from './contactDetails/ContactDetailsNzTabModule';
import EmployeeDetailsNzView from './components/EmployeeDetailsNzView';
import EmploymentDetailsNzModule from './employmentDetails/EmploymentDetailsNzModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import createEmployeeDetailNzDispatcher from './createEmployeeDetailNzDispatcher';
import createEmployeeDetailNzIntegrator from './createEmployeeDetailNzIntegrator';
import employeeDetailNzReducer from './employeeDetailNzReducer';

export default class EmployeeDetailNzModule {
  constructor({ setRootView, integration, replaceURLParams }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(employeeDetailNzReducer);
    this.dispatcher = createEmployeeDetailNzDispatcher({ store: this.store });
    this.integrator = createEmployeeDetailNzIntegrator({ store: this.store, integration });
    this.subModules = {
      contactDetails: new ContactDetailsNzTabModule(),
      employmentDetails: new EmploymentDetailsNzModule(),
    };
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  updateURLFromState = state => this.replaceURLParams(getURLParams(state));

  setInitialState = context => this.dispatcher.setInitialState(context);

  resetState = () => this.dispatcher.resetState();

  loadEmployeeDetails = () => {
    const onSuccess = (response) => {
      this.dispatcher.loadEmployeeDetails(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeeDetails({ onSuccess, onFailure });
  };

  setMainTab = (mainTab) => {
    this.dispatcher.setMainTab(mainTab);
    this.replaceURLParams(getURLParams(this.store.getState()));
  }

  setSubTab = (mainTab, subTab) => {
    this.dispatcher.setSubTab(mainTab, subTab);
    this.replaceURLParams({ mainTab, subTab });
  }

  render() {
    const employeeDetailNzView = <EmployeeDetailsNzView
      tabItems={tabItems}
      subModules={this.subModules}
      onMainTabSelected={this.setMainTab}
      onSubTabSelected={this.setSubTab}
    />;
    const wrappedView = <Provider store={this.store}>{employeeDetailNzView}</Provider>;
    this.setRootView(wrappedView);
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadEmployeeDetails();
  }
}
