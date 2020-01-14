import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_AGENT_CONTACT_INFO,
  SET_ERROR_MESSAGE,
  SET_FIELD,
  SET_LOADING_STATE,
  SUBMIT_AGENT_CONTACT_INFO,
} from './stpYourRoleIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import {
  getAgentAbn,
  getAgentNumber,
  getAgentRoleSelected,
  getBusinessId,
  getEmail,
  getFirstName,
  getLastName,
  getPhone,
  getRole,
} from './stpYourRoleSelectors';
import Store from '../../../../../store/Store';
import StpYourRoleView from './components/StpYourRoleView';
import stpYourRoleReducer from './stpYourRoleReducer';

export default class StpYourRoleModule {
  constructor({
    context, integration, onPrevious, onFinish,
  }) {
    this.store = new Store(stpYourRoleReducer);
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
    this.onPrevious = onPrevious;
    this.integration = integration;
    this.onFinishFunc = onFinish;
  }

  onFinish = () => {
    const state = this.store.getState();
    const selectedAgentRole = getRole(state);
    const agentAbn = getAgentAbn(state);
    const agentNumber = getAgentNumber(state);
    const roleDetails = {
      selectedAgentRole,
      agentAbn,
      agentNumber,
    };

    this.onFinishFunc({ roleDetails });
  };

  onSearchClick = () => {
    this.loadContactDetails();
  };

  onFieldChange = ({ key, value }) => {
    this.store.dispatch({
      intent: SET_FIELD,
      key,
      value,
    });
  };

  showError = ({ message }) => {
    this.store.dispatch({
      intent: SET_ERROR_MESSAGE,
      errorMessage: message,
    });
  };

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  };

  loadContactDetails = () => {
    this.setIsLoading(true);
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = {
      agentAbn: getAgentAbn(state),
      agentNumber: getAgentNumber(state),
    };

    const onSuccess = (response) => {
      this.setIsLoading(false);
      this.store.dispatch({
        intent: LOAD_AGENT_CONTACT_INFO,
        contactInfo: response,
      });
    };

    const onFailure = (error) => {
      this.setIsLoading(false);
      this.showError(error);
    };

    this.integration.read({
      intent: LOAD_AGENT_CONTACT_INFO,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  onNextClick = () => {
    const state = this.store.getState();
    if (!getAgentRoleSelected(state)) {
      this.onFinish();
      return;
    }

    this.setIsLoading(true);
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = {
      agentAbn: getAgentAbn(state),
      agentNumber: getAgentNumber(state),
      firstName: getFirstName(state),
      lastName: getLastName(state),
      phone: getPhone(state),
      email: getEmail(state),
    };
    const onSuccess = () => {
      this.setIsLoading(false);
      this.onFinish();
    };

    const onFailure = (error) => {
      this.setIsLoading(false);
      this.showError(error);
    };

    this.integration.write({
      intent: SUBMIT_AGENT_CONTACT_INFO,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  getView() {
    return (
      <Provider store={this.store}>
        <StpYourRoleView
          onFieldChange={this.onFieldChange}
          onSearchClick={this.onSearchClick}
          onPreviousClick={this.onPrevious}
          onNextClick={this.onNextClick}
        />
      </Provider>
    );
  }
}
