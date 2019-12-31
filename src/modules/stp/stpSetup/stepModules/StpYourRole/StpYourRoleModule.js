import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_AGENT_CONTACT_INFO, SET_ERROR_MESSAGE, SET_FIELD, SUBMIT_AGENT_CONTACT_INFO,
} from './stpYourRoleIntents';
import {
  getAgentAbn,
  getAgentNumber,
  getAgentRoleSelected,
  getBusinessId,
  getEmail,
  getFirstName,
  getLastName,
  getPhone,
} from './stpYourRoleSelectors';
import Store from '../../../../../store/Store';
import StpYourRoleView from './components/StpYourRoleView';
import stpYourRoleReducer from './stpYourRoleReducer';

export default class StpYourRoleModule {
  constructor({ integration, onPrevious, onFinish }) {
    this.store = new Store(stpYourRoleReducer);
    this.onPrevious = onPrevious;
    this.integration = integration;
    this.onFinishFunc = onFinish;
  }

  onFinish = () => {
    const state = this.store.getState();
    const agentRoleSelected = getAgentRoleSelected(state);
    this.onFinishFunc({ agentRoleSelected });
  };

  onFieldChange = ({ key, value }) => {
    this.store.dispatch({
      intent: SET_FIELD,
      key,
      value,
    });
  }

  onSearchClick = () => {
    this.loadContactDetails();
  }

  loadContactDetails = () => {
    const state = this.store.getState();
    const intent = LOAD_AGENT_CONTACT_INFO;
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = {
      agentAbn: getAgentAbn(state),
      agentNumber: getAgentNumber(state),
    };

    const onSuccess = (response) => {
      this.store.dispatch({
        intent: LOAD_AGENT_CONTACT_INFO,
        contactInfo: response,
      });
    };

    const onFailure = ({ message }) => {
      this.store.dispatch({
        intent: SET_ERROR_MESSAGE,
        errorMessage: message,
      });
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  onNextClick = () => {
    const state = this.store.getState();
    if (!getAgentRoleSelected(state)) {
      this.onFinish();
      return;
    }

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = {
      agentAbn: getAgentAbn(state),
      agentNumber: getAgentNumber(state),
      firstName: getFirstName(state),
      lastName: getLastName(state),
      phone: getPhone(state),
      email: getEmail(state),
    };
    const onSuccess = () => {
      this.onFinish();
    };

    const onFailure = ({ message }) => {
      this.store.dispatch({
        intent: SET_ERROR_MESSAGE,
        errorMessage: message,
      });
    };

    this.integration.write({
      intent: SUBMIT_AGENT_CONTACT_INFO,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  getView = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <StpYourRoleView
          onFieldChange={this.onFieldChange}
          onSearchClick={this.onSearchClick}
          onPreviousClick={this.onPrevious}
          onNextClick={this.onNextClick}
        />
      </Provider>
    );

    return wrappedView;
  }
}
