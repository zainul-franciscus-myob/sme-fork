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
import { getBusinessId, getSubmitBusinessInformationContent } from './StpDeclarationInformationSelectors';
import Store from '../../../../../store/Store';
import StpDeclarationInformationView from './components/StpDeclarationInformationView';
import stpDeclarationInformationReducer from './stpDeclarationInformationReducer';

export default class StpDeclarationInformationModule {
  constructor({
    onPrevious,
    onFinish,
    integration,
    context,
  }) {
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
    const content = getSubmitBusinessInformationContent(state);

    this.integration.write({
      intent: SUBMIT_BUSINESS_CONTACT_INFORMATION,
      urlParams,
      content,
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

  showError = ({ message }) => {
    this.setAlert({
      type: 'danger',
      message,
    });
  }

  handleFieldChange = ({ key, value }) => {
    this.store.dispatch({
      intent: SET_FIELD,
      key,
      value,
    });
  }

  loadBusinessInformation = ({
    onSuccess = () => {},
    onFailure = () => {},
  }) => {
    this.setIsLoading(true);
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccessFunc = (businessContactInformation) => {
      this.store.dispatch({
        intent: LOAD_BUSINESS_CONTACT_INFORMATION,
        businessContactInformation,
      });
      this.setIsLoading(false);
      onSuccess();
    };

    const onFailureFunc = ({ message }) => {
      this.setAlert({
        type: 'danger',
        message,
      });
      this.setIsLoading(false);
      onFailure({ message });
    };

    this.integration.read({
      intent: LOAD_BUSINESS_CONTACT_INFORMATION,
      urlParams,
      onSuccess: onSuccessFunc,
      onFailure: onFailureFunc,
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
