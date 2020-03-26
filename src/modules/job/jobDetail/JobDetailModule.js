import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_JOB,
  SUCCESSFULLY_SAVED_JOB,
} from '../JobMessageTypes';
import {
  getBusinessId,
  getIsCreating,
  getModal,
  getRegion,
  isPageEdited,
} from './jobDetailSelectors';
import { getIsSubmitting } from '../jobModal/JobModalSelectors';
import JobDetailView from './components/JobDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import Store from '../../../store/Store';
import createJobDetailDispatcher from './createJobDetailDispatcher';
import createJobDetailIntegrator from './createJobDetailIntegrator';
import jobDetailReducer from './jobDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class JobDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.store = new Store(jobDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.dispatcher = createJobDetailDispatcher(this.store);
    this.integrator = createJobDetailIntegrator(this.store, integration);
  }

  render = () => {
    const jobDetailView = (
      <JobDetailView
        onJobDetailsChange={this.dispatcher.updateJobDetails}
        onDismissAlert={this.dispatcher.dismissAlert}
        onDeleteButtonClick={this.openDeleteModal}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.dispatcher.closeModal}
        onSaveButtonClick={this.updateOrCreateJob}
        onDeleteModal={this.deleteJob}
        onCancelModal={this.onCancel}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {jobDetailView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  updateOrCreateJob = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    const modal = getModal(state);

    if (getIsSubmitting(state)) return;

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_JOB,
        content: message,
      });
      this.dispatcher.setSubmittingState(false);

      this.redirectToUrl(modal.url);
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(error.message);
    };

    this.dispatcher.setSubmittingState(true);

    if (isCreating) {
      this.integrator.createJob({
        onSuccess, onFailure,
      });
    } else {
      this.integrator.updateJob({
        onSuccess, onFailure,
      });
    }
  }

  loadJobDetail = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    if (isCreating) {
      this.loadNewJob();
      return;
    }

    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadJobDetail(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadJobDetail({
      onSuccess,
      onFailure,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  openCancelModal = () => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.dispatcher.openModal({ type: ModalType.CANCEL });
    } else {
      this.redirectToJobList();
    }
  };

  openDeleteModal = () => {
    this.dispatcher.openModal({ type: ModalType.DELETE });
  };

  redirectToJobList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/job`;
  };

  loadNewJob = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadNewJob(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.integrator.loadNewJob({
      onSuccess,
      onFailure,
    });
  }

  deleteJob = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_JOB,
        content: message,
      });
      this.redirectToJobList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(error.message);
    };

    this.integrator.deleteJob({
      onSuccess,
      onFailure,
    });
  }

  saveHandler = () => {
    const state = this.store.getState();
    const modal = getModal(state);
    if (modal.type) return;

    this.updateOrCreateJob();
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadJobDetail();
  }

  resetState() {
    this.dispatcher.resetState();
  }

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
  }

  onCancel = () => {
    const state = this.store.getState();
    const modal = getModal(state);

    this.redirectToUrl(modal.url);
  }

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    } else {
      this.redirectToJobList();
    }
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }
}
