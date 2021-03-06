import React from 'react';

import {
  EMAIL_TAB_SELECT_ALL,
  EMAIL_TAB_SELECT_ITEM,
  SET_EMPLOYEES_SENT,
  SET_PDF_LOADING_STATE,
  SET_TAB,
} from './PreparePaySlipsIntents';
import { EXPORT_TRANSACTION_PDF } from '../../payRunIntents';
import {
  getBusinessId,
  getEmailPaySlipModalContext,
  getEmailSettings,
  getSelectedEmployeesToEmail,
} from './PreparePaySlipsSelectors';
import { getPayRunListUrl } from '../PayRunSelectors';
import EmailPaySlipModalModule from '../../../employeePay/emailPaySlipModal/EmailPaySlipModalModule';
import PreparePaySlipsView from './components/PreparePaySlipsView';
import createPayRunDispatchers from '../createPayRunDispatchers';
import openBlob from '../../../../common/blobOpener/openBlob';

export default class PreparePaySlipsModule {
  constructor({ integration, store, pushMessage }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.dispatcher = createPayRunDispatchers(store);
    this.store = store;
    this.emailPaySlipModal = new EmailPaySlipModalModule({ integration });
  }

  redirectToPayRunList = () => {
    const state = this.store.getState();
    window.location.href = getPayRunListUrl(state);
  };

  setSelectedTab = (newTabId) => {
    this.store.dispatch({
      intent: SET_TAB,
      selectedTab: newTabId,
    });
  };

  emailTabSelectAll = (isSelected) => {
    this.store.dispatch({
      intent: EMAIL_TAB_SELECT_ALL,
      isSelected,
    });
  };

  emailTabSelectItem = (item, isSelected) => {
    this.store.dispatch({
      intent: EMAIL_TAB_SELECT_ITEM,
      isSelected,
      item,
    });
  };

  setEmployeesPaySlipSent = (employees) => {
    this.store.dispatch({
      intent: SET_EMPLOYEES_SENT,
      employees,
    });
  };

  setPdfIsLoading(transactionId, isLoading) {
    this.store.dispatch({
      intent: SET_PDF_LOADING_STATE,
      transactionId,
      isLoading,
    });
  }

  exportPdf = (transactionId) => {
    const intent = EXPORT_TRANSACTION_PDF;
    const state = this.store.getState();
    this.setPdfIsLoading(transactionId, true);

    const onSuccess = (data) => {
      const filename = `payslip-${transactionId}.pdf`;
      openBlob({ blob: data, filename });
      this.setPdfIsLoading(transactionId, false);
    };

    const onFailure = (message) => {
      // eslint-disable-next-line no-console
      console.log(`Failed to download Pay Slip. ${message}`);
    };

    const businessId = getBusinessId(state);
    const urlParams = { businessId, transactionId };

    this.integration.readFile({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  openEmailPaySlipModal = () => {
    const state = this.store.getState();
    const employees = getSelectedEmployeesToEmail(state);
    const emailSettings = getEmailSettings(state);
    const context = getEmailPaySlipModalContext({
      state,
      employees,
      emailSettings,
    });
    this.emailPaySlipModal.run({
      context,
      onClose: this.setEmployeesPaySlipSent,
    });
  };

  getView() {
    const emailPaySlipModalView = this.emailPaySlipModal.render();

    return (
      <PreparePaySlipsView
        setSelectedTab={this.setSelectedTab}
        exportPdf={this.exportPdf}
        emailPaySlipModal={emailPaySlipModalView}
        emailTabListeners={{
          selectAll: this.emailTabSelectAll,
          selectItem: this.emailTabSelectItem,
          onEmailClick: this.openEmailPaySlipModal,
        }}
        onCancelClick={this.redirectToPayRunList}
        onNextClick={this.dispatcher.nextStep}
      />
    );
  }
}
