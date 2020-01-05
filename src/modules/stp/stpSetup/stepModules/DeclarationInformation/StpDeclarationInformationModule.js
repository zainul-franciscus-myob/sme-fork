import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_BUSINESS_CONTACT_INFORMATION,
  SET_ALERT,
  SET_FIELD,
  SET_IS_LOADING,
  SUBMIT_BUSINESS_CONTACT_INFORMATION,
} from './StpDeclarationInformationIntents';
import { getBusinessId, getSubmitBusinessInformationParams } from './StpDeclarationInformationSelectors';
import Store from '../../../../../store/Store';
import StpDeclarationInformationView from './components/StpDeclarationInformationView';
import stpDeclarationInformationReducer from './stpDeclarationInformationReducer';

export default class StpDeclarationInformationModule {
  constructor({
    onPrevious,
    onFinish,
    integration,
  }) {
    this.onPreviousFunc = onPrevious;
    this.onFinishFunc = onFinish;
    this.integration = integration;
    this.store = new Store(stpDeclarationInformationReducer);
  }

  onEnter = () => {
    this.loadBusinessInformation();
  }

  onNextClick = () => {
    this.setIsLoading(true);

    const onSuccess = () => {
      this.setIsLoading(false);
      this.onFinishFunc();
    };

    const onFailure = ({ message }) => {
      this.setIsLoading(false);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.submitBusinessInformation({ onSuccess, onFailure });
  }

  submitBusinessInformation = ({ onSuccess, onFailure }) => {
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getSubmitBusinessInformationParams(state);

    this.integration.write({
      intent: SUBMIT_BUSINESS_CONTACT_INFORMATION,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  }

  setAlert = (alert) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  }

  handleFieldChange = ({ key, value }) => {
    this.store.dispatch({
      intent: SET_FIELD,
      key,
      value,
    });
  }

  loadBusinessInformation = () => {
    this.setIsLoading(true);
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (businessContactInformation) => {
      this.store.dispatch({
        intent: LOAD_BUSINESS_CONTACT_INFORMATION,
        businessContactInformation,
      });
      this.setIsLoading(false);
    };

    const onFailure = ({ message }) => {
      this.setAlert({
        type: 'danger',
        message,
      });
      this.setIsLoading(false);
    };

    this.integration.read({
      intent: LOAD_BUSINESS_CONTACT_INFORMATION,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  getView() {
    return (
      <Provider store={this.store}>
        <StpDeclarationInformationView
          onPreviousClick={this.onPreviousFunc}
          onFieldChange={this.handleFieldChange}
          onNextClick={this.onNextClick}
        />
      </Provider>
    );
  }
}
