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
    const { dispatcher, integrator } = this;

    const onSuccess = (data) => {
      dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      openBlob({ blob: data });
    };

    const onFailure = () =>
      dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    dispatcher.setLoadingState(LoadingState.LOADING);
    integrator.getAuthorityForm({ onSuccess, onFailure });
  };

  getBankFeedsAccess = () => {
    const { dispatcher, integrator } = this;

    const onSuccess = (response) => {
      const canUserAccessNewFlow = response;
      dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      if (!canUserAccessNewFlow) {
        dispatcher.setDisplayEmptyState(true);
      }
    };

    const onFailure = () =>
      dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    integrator.getBankFeedsAccess({ onSuccess, onFailure });
  };

  loadBankFeedApplicationData = () => {
    const { dispatcher, integrator } = this;

    const onSuccess = (response) => {
      dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      dispatcher.loadBankFeedApplicationData(response);
    };

    const onFailure = () =>
      dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    integrator.loadBankFeedApplicationData({ onSuccess, onFailure });
  };

  onCopy = (item) => {
    copy(item);
    this.setCopyAlertState();
  };

  setCopyAlertState = () => this.dispatcher.setCopyAlertState();

  onlineApplication = () => {
    const { dispatcher, integrator } = this;

    dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      dispatcher.setReferenceNumber(response.referenceNumber);

      if (response.commBankUrl) dispatcher.setCommBankUrl(response.commBankUrl);

      dispatcher.setDisplayConnectFormState();
    };

    const onFailure = () =>
      dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    integrator.getReferenceNumber({ onSuccess, onFailure });
  };

  formApplication = () => {
    const { dispatcher, integrator } = this;

    dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      dispatcher.setFormAlertState('');
      dispatcher.setApplicationId(response.applicationId);
      dispatcher.setDisplayConnectFormState();
    };

    const onFailure = () =>
      dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    integrator.submitBankFeedApplication({ onSuccess, onFailure });
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
    const { dispatcher, navigateTo, redirectToPath } = this;

    this.setRootView(
      <Provider store={this.store}>
        <BankFeedsApplyView
          getAuthorityForm={() => this.getAuthorityForm()}
          onCopy={this.onCopy}
          onNext={() => this.submitBankFeedApplication()}
          onUpdateForm={({ key, value }) =>
            dispatcher.updateForm({ key, value })
          }
          redirectToBank={() =>
            navigateTo(getOnlineBankLink(this.store.getState()), true)
          }
          redirectToBankFeeds={() => redirectToPath('bankFeeds')}
          redirectToImportStatements={() =>
            redirectToPath('bankStatementImport')
          }
          setAccountType={(type) => dispatcher.setAccountType(type)}
          setApplicationPreference={(preference) =>
            dispatcher.setApplicationPreference(preference)
          }
          setCopyAlertState={this.setCopyAlertState}
          setCopyAlertText={(text) => dispatcher.setCopyAlertText(text)}
          setFinancialInstitution={(value) =>
            dispatcher.setFinancialInstitution(value)
          }
          setFormAlertState={(state) => dispatcher.setFormAlertState(state)}
          setModalState={() => dispatcher.setModalState()}
          uploadAuthorityForm={() =>
            navigateTo(Config.BANKFEED_PORTAL_URL, true)
          }
        />
      </Provider>
    );
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.getBankFeedsAccess();
    this.loadBankFeedApplicationData();
  }

  resetState = () => this.dispatcher.resetState();

  unsubscribeFromStore = () => this.store.unsubscribeAll();
}
