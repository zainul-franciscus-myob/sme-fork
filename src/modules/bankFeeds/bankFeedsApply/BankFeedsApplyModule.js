import { Provider } from 'react-redux';
import React from 'react';
import copy from 'copy-to-clipboard';

import {
  getApplicationPreference,
  getBusinessId,
  getOnlineBankLink,
  getRegion,
} from './BankFeedsApplySelectors';
import BankFeedsApplyDispatcher from './BankFeedsApplyDispatcher';
import BankFeedsApplyIntegrator from './BankFeedsApplyIntegrator';
import BankFeedsApplyReducer from './BankFeedsApplyReducer';
import BankFeedsApplyView from './components/BankFeedsApplyView';
import Config from '../../../Config';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import openBlob from '../../../common/blobOpener/openBlob';

export default class BankFeedsApplyModule {
  constructor({ integration, setRootView, navigateTo }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(BankFeedsApplyReducer);
    this.dispatcher = BankFeedsApplyDispatcher(this.store);
    this.integrator = BankFeedsApplyIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
  }

  getAuthorityForm = () => {
    const onSuccess = (data) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      openBlob({ blob: data });
    };

    const onFailure = () =>
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.integrator.getAuthorityForm({ onSuccess, onFailure });
  };

  loadBankFeedApplicationData = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBankFeedApplicationData(response);
    };

    const onFailure = () =>
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    this.integrator.loadBankFeedApplicationData({ onSuccess, onFailure });
  };

  onCopy = (item) => {
    copy(item);
    this.setCopyAlertState();
  };

  setCopyAlertState = () => this.dispatcher.setCopyAlertState();

  onlineApplication = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setReferenceNumber(response.referenceNumber);
      this.dispatcher.setDisplayConnectFormState();
    };

    const onFailure = () =>
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    this.integrator.getReferenceNumber({ onSuccess, onFailure });
  };

  formApplication = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setFormAlertState('');
      this.dispatcher.setApplicationId(response.applicationId);
      this.dispatcher.setDisplayConnectFormState();
    };

    const onFailure = () =>
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    this.integrator.submitBankFeedApplication({ onSuccess, onFailure });
  };

  submitBankFeedApplication = () => {
    if (getApplicationPreference(this.store.getState()) === 'online') {
      this.onlineApplication();
    } else {
      this.formApplication();
    }
  };

  redirectToPath = (url) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    this.navigateTo(`/#/${region}/${businessId}/${url}`);
  };

  render = () => {
    this.setRootView(
      <Provider store={this.store}>
        <BankFeedsApplyView
          getAuthorityForm={() => this.getAuthorityForm()}
          onCopy={this.onCopy}
          onNext={() => this.submitBankFeedApplication()}
          onUpdateForm={({ key, value }) =>
            this.dispatcher.updateForm({ key, value })
          }
          redirectToBank={() =>
            this.navigateTo(getOnlineBankLink(this.store.getState()), true)
          }
          redirectToBankFeeds={() => this.redirectToPath('bankFeeds')}
          redirectToImportStatements={() =>
            this.redirectToPath('bankStatementImport')
          }
          setAccountType={(type) => this.dispatcher.setAccountType(type)}
          setApplicationPreference={(preference) =>
            this.dispatcher.setApplicationPreference(preference)
          }
          setCopyAlertState={this.setCopyAlertState}
          setCopyAlertText={(text) => this.dispatcher.setCopyAlertText(text)}
          setFinancialInstitution={(value) =>
            this.dispatcher.setFinancialInstitution(value)
          }
          setFormAlertState={(state) =>
            this.dispatcher.setFormAlertState(state)
          }
          setModalState={() => this.dispatcher.setModalState()}
          uploadAuthorityForm={() =>
            this.navigateTo(Config.BANKFEED_PORTAL_URL, true)
          }
        />
      </Provider>
    );
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadBankFeedApplicationData();
  }

  resetState = () => this.dispatcher.resetState();

  unsubscribeFromStore = () => this.store.unsubscribeAll();
}
