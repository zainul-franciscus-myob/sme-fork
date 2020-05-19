import { Provider } from 'react-redux';
import React from 'react';

import { getBusinessId, getRegion } from './BankFeedsCreateSelectors';
import BankFeedsCreateDispatcher from './BankFeedsCreateDispatcher';
import BankFeedsCreateIntegrator from './BankFeedsCreateIntegrator';
import BankFeedsCreateReducer from './BankFeedsCreateReducer';
import BankFeedsCreateView from './components/BankFeedsCreateView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';

class BankFeedsCreateModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(BankFeedsCreateReducer);
    this.dispatcher = BankFeedsCreateDispatcher(this.store);
    this.integrator = BankFeedsCreateIntegrator(this.store, integration);
  }

  loadBankFeedApplicationData = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBankFeedApplicationData(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBankFeedApplicationData({ onSuccess, onFailure });
  }

  submitBankFeedApplication = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.submitBankFeedApplication(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.submitBankFeedApplication({ onSuccess, onFailure });
  }

  redirectToImportStatements = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/bankStatementImport`;
  }

  render = () => {
    this.setRootView(
      <Provider store={this.store}>
        <BankFeedsCreateView
          onUpdateForm={({ key, value }) => this.dispatcher.updateForm({ key, value })}
          redirectToImportStatements={() => this.redirectToImportStatements()}
          resetAccountInformation={() => this.dispatcher.resetAccountInformationState()}
          setAccountNameRequired={() => this.dispatcher.setAccountNameRequiredState(true)}
          setAccountNumberRequired={() => this.dispatcher.setAccountNumberRequiredState(true)}
          setAccountSuffixRequired={() => this.dispatcher.setAccountSuffixRequiredState(true)}
          setAccountTypeRequired={() => this.dispatcher.setAccountTypeRequiredState(true)}
          setApplicationPreference={(param) => this.dispatcher.setApplicationPreference(param)}
          setBranchNameRequired={() => this.dispatcher.setBranchNameRequiredState(true)}
          setBSBBankRequired={() => this.dispatcher.setBsbBankRequiredState(true)}
          setBSBBranchRequired={() => this.dispatcher.setBsbBranchRequiredState(true)}
          setBSBRequired={() => this.dispatcher.setBsbRequiredState(true)}
          setLastFourDigitsRequired={() => this.dispatcher.setLastFourDigitsRequiredState(true)}
          setModalState={() => this.dispatcher.setModalState()}
          setNameOnCardRequired={() => this.dispatcher.setNameOnCardRequiredState(true)}
          setNotes={(notes) => this.dispatcher.setNotesState(notes)}
          setOnlineApplicationSupported={
            (param) => this.dispatcher.setOnlineApplicationSupportedState(param)
          }
          setPaperApplicationSupported={
            (param) => this.dispatcher.setPaperApplicationSupportedState(param)
          }
        />
      </Provider>,
    );
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadBankFeedApplicationData();
    // this.submitBankFeedApplication();
  }

  resetState = () => this.dispatcher.resetState();

  unsubscribeFromStore = () => this.store.unsubscribeAll();
}

export default BankFeedsCreateModule;
