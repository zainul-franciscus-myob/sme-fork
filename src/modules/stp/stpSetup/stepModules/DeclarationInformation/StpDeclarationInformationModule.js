import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_BUSINESS_CONTACT_INFORMATION,
  LOAD_CONTEXT,
  SET_ALERT,
  SET_FIELD,
  SET_IS_LOADING,
  SUBMIT_BUSINESS_CONTACT_INFORMATION,
} from './StpDeclarationInformationIntents';
import {
  getBusinessId,
  getPayerAbnWithoutSpaces,
  getSubmitBusinessInformationContent,
} from './StpDeclarationInformationSelectors';
import Store from '../../../../../store/Store';
import StpDeclarationInformationView from './components/StpDeclarationInformationView';
import stpDeclarationInformationReducer from './stpDeclarationInformationReducer';

export default class StpDeclarationInformationModule {
  constructor({ onPrevious, onFinish, integration, context }) {
    this.onPreviousFunc = onPrevious;
    this.onFinishFunc = onFinish;
    this.integration = integration;
    this.store = new Store(stpDeclarationInformationReducer);
    this.store.dispatch({
      intent: LOAD_CONTEXT,
      context,
    });
  }

  onNextClick = () => {
    this.setIsLoading(true);
    const state = this.store.getState();
    const payerAbn = getPayerAbnWithoutSpaces(state);

    const onSuccess = () => {
      this.setIsLoading(false);
      this.onFinishFunc({ payerAbn });
    };

    const onFailure = (error) => {
      this.setIsLoading(false);
      this.showError(error);
    };

    this.submitBusinessInformation({ onSuccess, onFailure });
  };

  submitBusinessInformation = ({ onSuccess, onFailure }) => {
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getSubmitBusinessInformationContent(state);

    this.integration.write({
      intent: SUBMIT_BUSINESS_CONTACT_INFORMATION,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  };

  showError = ({ message }) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: {
        type: 'danger',
        message,
      },
    });
  };

  handleFieldChange = ({ key, value }) => {
    this.store.dispatch({
      intent: SET_FIELD,
      key,
      value,
    });
  };

  loadBusinessInformation = () => {
    this.setIsLoading(true);
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (businessContactInformation) => {
      this.setIsLoading(false);
      this.store.dispatch({
        intent: LOAD_BUSINESS_CONTACT_INFORMATION,
        businessContactInformation,
      });
    };

    const onFailure = () => {
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
