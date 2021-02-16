import { Provider } from 'react-redux';
import React from 'react';

import { getEventId } from './JobMakerSelector';
import { isValidJobMakerAction } from './JobMakerActionTypes';
import JobMakerView from './components/JobMakerView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import StpDeclarationModalModule from '../../stpDeclarationModal/StpDeclarationModalModule';
import createJobMakerDispatcher from './createJobMakerDispatcher';
import createJobMakerIntegrator from './createJobMakerIntegrator';
import jobMakerReducer from './JobMakerReducer';

export default class JobMakerModule {
  constructor({ integration, context, setAlert, pushMessage, featureToggles }) {
    this.store = new Store(jobMakerReducer);

    this.dispatcher = createJobMakerDispatcher(this.store);
    this.integrator = createJobMakerIntegrator(this.store, integration);
    this.stpDeclarationModule = new StpDeclarationModalModule({ integration });
    this.setAlert = setAlert;
    this.pushMessage = pushMessage;
    this.featureToggles = featureToggles;
    this.dispatcher.setInitialState(context);
  }

  loadInitialEmployeesAndHeaderDetails = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setInitialJobMaker(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.loadInitialEmployeesAndHeaderDetails({
      onSuccess,
      onFailure,
    });
  };

  openStpDeclarationModal = () => {
    this.dispatcher.setNewEventId();
    const state = this.store.getState();
    const context = {
      eventId: getEventId(state),
      businessId: state.businessId,
    };
    this.stpDeclarationModule.run(context, this.createJobMakerEmployeeAction);
  };

  createJobMakerEmployeeAction = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const onSuccess = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
      this.setAlert({ type: 'danger', message });
    };
    this.integrator.createJobMakerEmployeeAction({ onSuccess, onFailure });
  };

  onJobmakerTableDropdownItemClicked = (employee, action) => {
    // invalid action, return
    if (!isValidJobMakerAction(action)) return;
    // valid actions
    this.dispatcher.setDropdownActionEmployee(employee);
    this.dispatcher.setDropdownAction(action);
    this.dispatcher.setIsShowingJobMakerActionModal(true);
  };

  onModalActionClicked() {
    this.dispatcher.setIsShowingJobMakerActionModal(false);
    this.openStpDeclarationModal();
  }

  onCloseModal = () => {
    this.dispatcher.setDropdownActionEmployee({});
    this.dispatcher.setDropdownAction(undefined);
    this.dispatcher.setIsShowingJobMakerActionModal(false);
  };

  run = () => {
    this.loadInitialEmployeesAndHeaderDetails();
  };

  getView() {
    const declarationModal = this.stpDeclarationModule.getView();
    return (
      <Provider store={this.store}>
        {declarationModal}
        <JobMakerView
          featureToggles={this.featureToggles}
          onJobMakerTableDropdownItemClicked={
            this.onJobmakerTableDropdownItemClicked
          }
          onCloseModal={() => this.onCloseModal()}
          onModalActionClicked={() => this.onModalActionClicked()}
        />
      </Provider>
    );
  }
}
