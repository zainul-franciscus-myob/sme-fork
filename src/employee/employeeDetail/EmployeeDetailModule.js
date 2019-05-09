import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_NEW_EMPLOYEE_DETAIL,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MAIN_TAB,
  SET_PAGE_EDITED_STATE,
  SET_SUBMITTING_STATE,
  SET_SUB_TAB,
  UPDATE_CONTACT_DETAILS,
  UPDATE_EMPLOYEE,
} from '../EmployeeIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_EMPLOYEE, SUCCESSFULLY_SAVED_EMPLOYEE } from '../EmployeeMessageTypes';
import {
  getBusinessId, getEmployeeId, getEmployeePayload, getIsCreating,
  getRegion, getURLParams, isPageEdited,
} from './EmployeeDetailSelectors';
import EmployeeDetailView from './components/EmployeeDetailView';
import Store from '../../store/Store';
import employeeDetailReducer from './employeeDetailReducer';

const popMessageTypes = [
  SUCCESSFULLY_SAVED_EMPLOYEE,
];

export default class EmployeeDetailModule {
  constructor({
    integration, setRootView, popMessages, pushMessage, replaceURLParams,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(employeeDetailReducer);
    this.replaceURLParams = replaceURLParams;
    this.popMessages = popMessages;
    this.pushMessage = pushMessage;
    this.popMessageTypes = popMessageTypes;
  }

  loadEmployeeDetails = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_EMPLOYEE_DETAIL : LOAD_EMPLOYEE_DETAIL;

    const employeeId = isCreating ? undefined : getEmployeeId(state);

    const urlParams = {
      businessId: getBusinessId(state),
      employeeId,
    };

    const onSuccess = (response) => {
      this.setLoadingState(false);

      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = () => {
      console.log('Failed to load employee detail');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  updateContactDetails = ({ key, value }) => {
    const intent = UPDATE_CONTACT_DETAILS;

    this.store.dispatch({
      intent,
      key,
      value,
    });
  };

  displaySuccessMessage = successMessage => this.displayAlert({
    message: successMessage,
    type: 'success',
  });

  displayFailureAlert = errorMessage => this.displayAlert({
    message: errorMessage,
    type: 'danger',
  });

  displayAlert = ({ message, type }) => {
    const intent = SET_ALERT;
    const alert = {
      message,
      type,
    };
    this.store.dispatch({
      intent,
      alert,
    });
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  }

  redirectToEmployeeList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/employee`;
  }

  openDeleteModal = () => this.store.dispatch({
    intent: OPEN_MODAL,
    modalType: 'delete',
  });

  openCancelModal = () => {
    const intent = OPEN_MODAL;

    const state = this.store.getState();

    if (isPageEdited(state)) {
      this.store.dispatch({
        intent,
        modalType: 'cancel',
      });
    } else {
      this.redirectToEmployeeList();
    }
  };

  closeModal = () => this.store.dispatch({
    intent: CLOSE_MODAL,
  });

  setSubmittingState = isSubmitting => this.store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  });

  deleteEmployee = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = (response) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_EMPLOYEE,
        content: response.message,
      });
      this.redirectToEmployeeList();
    };

    const onFailure = (response) => {
      this.setSubmittingState(false);
      this.displayFailureAlert(response.message);
    };

    const state = this.store.getState();

    const employeeId = getEmployeeId(state);

    const urlParams = {
      businessId: getBusinessId(state),
      employeeId,
    };

    this.integration.write({
      intent: DELETE_EMPLOYEE,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  redirectToReadEmployee = (employeeId) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/employee/${employeeId}`;
  }

  saveEmployee = (intent, content, urlParams, onSuccess) => {
    this.setSubmittingState(true);

    const onFailure = (response) => {
      this.setSubmittingState(false);
      this.displayFailureAlert(response.message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  createContact = () => {
    const intent = CREATE_EMPLOYEE;

    const state = this.store.getState();
    const content = getEmployeePayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_EMPLOYEE,
        content: response.message,
      });
      this.redirectToReadEmployee(response.employeeId);
    };

    this.saveEmployee(intent, content, urlParams, onSuccess);
  }

  updateContact = () => {
    const intent = UPDATE_EMPLOYEE;

    const state = this.store.getState();
    const content = getEmployeePayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
      employeeId: getEmployeeId(state),
    };

    const onSuccess = (response) => {
      this.setSubmittingState(false);
      this.setIsPageEdited(false);
      this.displaySuccessMessage(response.message);
    };

    this.saveEmployee(intent, content, urlParams, onSuccess);
  }

  setIsPageEdited = isEdited => this.store.dispatch({
    intent: SET_PAGE_EDITED_STATE,
    isPageEdited: isEdited,
  });

  readMessages = () => {
    const [successMessage] = this.popMessages(this.popMessageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.displaySuccessMessage(message);
    }
  };

  render = () => {
    const onSaveButtonClick = getIsCreating(this.store.getState())
      ? this.createContact
      : this.updateContact;

    const employeeDetailView = (
      <EmployeeDetailView
        onMainTabSelected={this.setMainTab}
        onSubTabSelected={this.setSubTab}
        onContactDetailsChange={this.updateContactDetails}
        onCancelButtonClick={this.openCancelModal}
        onSaveButtonClick={onSaveButtonClick}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissAlert={this.dismissAlert}
        onCloseModal={this.closeModal}
        onCancelModal={this.redirectToEmployeeList}
        onDeleteModal={this.deleteEmployee}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {employeeDetailView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  setMainTab = selectedTab => this.store.dispatch({
    intent: SET_MAIN_TAB,
    selectedTab,
  });

  setSubTab = selectedTab => this.store.dispatch({
    intent: SET_SUB_TAB,
    selectedTab,
  })

  updateURLFromState = state => this.replaceURLParams(getURLParams(state))

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  run(context) {
    this.setInitialState(context);
    this.store.subscribe(this.updateURLFromState);
    this.render();
    this.readMessages();
    this.loadEmployeeDetails();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
