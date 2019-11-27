import React from 'react';

import {
  EMAIL_TAB_SELECT_ALL,
  EMAIL_TAB_SELECT_ITEM,
  SET_TAB,
} from './PreparePaySlipsIntents';
import { EXPORT_TRANSACTION_PDF } from '../../payRunIntents';
import { getBusinessId } from './PreparePaySlipsSelectors';
import { getPayRunListUrl } from '../PayRunSelectors';
import PreparePaySlipsView from './components/PreparePaySlipsView';
import createPayRunDispatchers from '../createPayRunDispatchers';
import openBlob from '../../../blobOpener/openBlob';

export default class PreparePaySlipsModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.dispatcher = createPayRunDispatchers(store);
    this.store = store;
  }

  redirectToPayRunList = () => {
    const state = this.store.getState();
    window.location.href = getPayRunListUrl(state);
  }

  getView() {
    return (
      <PreparePaySlipsView
        setSelectedTab={this.setSelectedTab}
        exportPdf={this.exportPdf}
        emailTabListeners={{
          selectAll: this.emailTabSelectAll,
          selectItem: this.emailTabSelectItem,
        }}
        onCancelClick={this.redirectToPayRunList}
        onNextClick={this.dispatcher.nextStep}
      />
    );
  }

  setSelectedTab = (newTabId) => {
    this.store.dispatch({
      intent: SET_TAB,
      selectedTab: newTabId,
    });
  }

  emailTabSelectAll = (isSelected) => {
    this.store.dispatch({
      intent: EMAIL_TAB_SELECT_ALL,
      isSelected,
    });
  }

  emailTabSelectItem = (item, isSelected) => {
    this.store.dispatch({
      intent: EMAIL_TAB_SELECT_ITEM,
      isSelected,
      item,
    });
  }

  exportPdf = (transactionId) => {
    const intent = EXPORT_TRANSACTION_PDF;
    const state = this.store.getState();
    const onSuccess = (data) => {
      const filename = `payslip-${transactionId}.pdf`;
      openBlob(data, filename);
    };
    const onFailure = () => {
      console.log('Failed to download PDF.');
    };
    const businessId = getBusinessId(state);
    const urlParams = { businessId, transactionId };

    this.integration.readFile({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }
}
