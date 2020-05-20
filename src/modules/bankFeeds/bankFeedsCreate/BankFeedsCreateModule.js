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
  constructor({
    integration,
    setRootView,
    navigateTo,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(BankFeedsCreateReducer);
    this.dispatcher = BankFeedsCreateDispatcher(this.store);
    this.integrator = BankFeedsCreateIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
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

  redirectToUrl = (url) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    this.navigateTo(`/#/${region}/${businessId}/${url}`);
  }

  render = () => {
    this.setRootView(
      <Provider store={this.store}>
        <BankFeedsCreateView
          onUpdateForm={({ key, value }) => this.dispatcher.updateForm({ key, value })}
          redirectToConnectBankFeed={() => this.redirectToUrl('bankFeeds/connect')}
          redirectToImportStatements={() => this.redirectToUrl('bankStatementImport')}
          setAccountType={(param) => this.dispatcher.setAccountType(param)}
          setApplicationPreference={(param) => this.dispatcher.setApplicationPreference(param)}
          setModalState={() => this.dispatcher.setModalState()}
          setFinancialInstitution={(value) => this.dispatcher.setFinancialInstitution(value)}
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
