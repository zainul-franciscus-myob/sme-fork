import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
} from '../spendMoneyMessageTypes';
import {
  getFilesForUpload,
  getInTrayDocumentId,
  getIsCreating,
  getIsTableEmpty,
  getLoadSpendMoneyRequestParams,
  getModalUrl,
  getSaveUrl,
  getSpendMoneyId,
  getTransactionListUrl,
  isPageEdited,
  isReferenceIdDirty,
} from './spendMoneyDetailSelectors';
import ModalType from './components/ModalType';
import SpendMoneyDetailView from './components/SpendMoneyDetailView';
import SpendMoneyElementId from './SpendMoneyElementId';
import Store from '../../store/Store';
import createSpendMoneyDispatcher from './createSpendMoneyDispatcher';
import createSpendMoneyIntegrator from './createSpendMoneyIntegrator';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';
import spendMoneyDetailReducer from './spendMoneyDetailReducer';

export default class SpendMoneyDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.store = new Store(spendMoneyDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.dispatcher = createSpendMoneyDispatcher(this.store);
    this.integrator = createSpendMoneyIntegrator(this.store, integration);
  }

  prefillBillFromInTray(inTrayDocumentId) {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.prefillDataFromInTray(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.dispatcher.setLoadingState(true);
    this.integrator.prefillDataFromInTray({ onSuccess, onFailure, inTrayDocumentId });
  }

  loadSpendMoney = () => {
    const state = this.store.getState();

    const onSuccess = intent => (response) => {
      this.dispatcher.loadSpendMoney(intent, response);
      this.dispatcher.setLoadingState(false);
      const inTrayDocumentId = getInTrayDocumentId(state);
      if (inTrayDocumentId) {
        this.prefillBillFromInTray(inTrayDocumentId);
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.displayAlert(message);
    };

    const params = getLoadSpendMoneyRequestParams(this.store.getState());

    this.integrator.loadSpendMoney({
      onSuccess, onFailure, ...params,
    });
  };

  loadNextReferenceId = (accountId) => {
    const onSuccess = ({ referenceId }) => {
      if (!isReferenceIdDirty(this.store.getState())) {
        this.dispatcher.loadReferenceId(referenceId);
      }
    };

    const onFailure = () => {
      console.log('Failed to load the next reference Id');
    };

    this.integrator.loadNextReferenceId({
      onSuccess,
      onFailure,
      accountId,
    });
  };

  updateHeaderOptions = ({ key, value }) => {
    if (key === 'selectedPayFromAccountId' && getIsCreating(this.store.getState())) {
      this.loadNextReferenceId(value);
    }

    this.dispatcher.updateHeaderOptions({ key, value });

    if (key === 'isTaxInclusive') {
      this.getCalculatedTotals();
    }
  };

  getSaveHandlers = () => ({
    onSuccess: (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SPEND_MONEY,
        content: response.message,
      });
      this.dispatcher.setSubmittingState(false);

      const state = this.store.getState();
      const url = getSaveUrl(state);
      this.redirectToUrl(url);
    },

    onFailure: (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(error.message);
    },
  });

  createSpendMoneyEntry = () => {
    this.dispatcher.setSubmittingState(true);

    this.integrator.createSpendMoneyEntry(this.getSaveHandlers());
  };

  updateSpendMoneyEntry = () => {
    this.dispatcher.setSubmittingState(true);

    this.integrator.updateSpendMoneyEntry(this.getSaveHandlers());
  };

  openCancelModal = () => {
    if (isPageEdited(this.store.getState())) {
      const state = this.store.getState();
      const transactionListUrl = getTransactionListUrl(state);
      this.dispatcher.openModal({ type: ModalType.CANCEL, url: transactionListUrl });
    } else {
      this.redirectToTransactionList();
    }
  };

  openDeleteModal = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);
    this.dispatcher.openModal({ type: ModalType.DELETE, url: transactionListUrl });
  }

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
  }

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.redirectToUrl(url);
  }

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  }

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);

    window.location.href = transactionListUrl;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  updateSpendMoneyLine = (lineIndex, lineKey, lineValue) => {
    this.dispatcher.updateSpendMoneyLine(lineIndex, lineKey, lineValue);

    const taxKeys = ['accountId', 'taxCodeId'];
    if (taxKeys.includes(lineKey)) {
      this.getCalculatedTotals();
    }
  }

  addSpendMoneyLine = (line) => {
    const { id, ...partialLine } = line;
    this.dispatcher.addSpendMoneyLine(partialLine);

    this.getCalculatedTotals();
  }

  deleteSpendMoneyLine = (index) => {
    this.dispatcher.deleteSpendMoneyLine(index);

    this.getCalculatedTotals();
  }

  getCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.dispatcher.resetTotals();
      return;
    }

    const onSuccess = (totals) => {
      this.dispatcher.getCalculatedTotals(totals);
    };

    const onFailure = error => this.dispatcher.displayAlert(error.message);

    this.integrator.getCalculatedTotals({
      onSuccess,
      onFailure,
    });
  };

  formatAndCalculateTotals = ({ index }) => {
    this.dispatcher.formatSpendMoneyLine(index);
    this.getCalculatedTotals();
  }

  deleteSpendMoneyTransaction = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_SPEND_MONEY,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(error.message);
    };

    this.integrator.deleteSpendMoneyTransaction({
      onSuccess,
      onFailure,
      spendMoneyId: getSpendMoneyId(this.store.getState()),
    });
  };

  addAttachments = (files) => {
    this.dispatcher.addAttachments(files);

    this.uploadAttachments(files);
  };

  uploadAttachments = (files) => {
    const state = this.store.getState();

    getFilesForUpload(state, files).forEach(file => this.uploadAttachment(file));
  };

  uploadAttachment = (file) => {
    const onSuccess = (response) => {
      this.dispatcher.uploadAttachment({ response, file });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.uploadAttachmentFailed({ message, file });
    };

    const onProgress = (uploadProgress) => {
      this.dispatcher.updateUploadProgress({ uploadProgress, file });
    };

    this.integrator.uploadAttachment({
      onSuccess,
      onFailure,
      onProgress,
      file,
    });
  };

  openDeleteAttachmentModal = (index) => {
    const state = this.store.getState();
    const { id } = state.attachments[index];

    if (id) {
      this.dispatcher.openRemoveAttachmentModal(id);
    } else {
      this.dispatcher.removeAttachmentByIndex(index);
    }
  };

  removeAttachment = () => {
    this.dispatcher.closeModal();
    const state = this.store.getState();
    const id = state.pendingDeleteId;

    this.dispatcher.setOperationInProgressState(id, true);

    const onSuccess = () => {
      this.dispatcher.setOperationInProgressState(id, false);
      this.dispatcher.removeAttachment(id);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setOperationInProgressState(id, false);
      this.dispatcher.appendAlert(message);
    };

    this.integrator.removeAttachment({
      onSuccess,
      onFailure,
    });
  };

  openAttachment = (index) => {
    const state = this.store.getState();
    const { id } = state.attachments[index];

    this.dispatcher.setOperationInProgressState(id, true);

    const onSuccess = ({ fileUrl }) => {
      window.open(fileUrl, '_blank');
      this.dispatcher.setOperationInProgressState(id, false);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.appendAlert(message);
      this.dispatcher.setOperationInProgressState(id, false);
    };

    this.integrator.openAttachment({
      onSuccess,
      onFailure,
      id,
    });
  };

  focusSpendMoneyAttachments = () => {
    const element = document.getElementById(SpendMoneyElementId.ATTACHMENTS_ELEMENT_ID);
    element.scrollIntoView();
  }

  closeSplitView = () => {
    this.dispatcher.setShowSplitView(false);
    this.dispatcher.clearInTrayDocumentUrl();
  };

  openSplitView = () => {
    this.dispatcher.setShowSplitView(true);

    const onSuccess = (blob) => {
      const url = URL.createObjectURL(blob);
      this.dispatcher.setInTrayDocumentUrl(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.displayAlert(message);
    };

    this.integrator.downloadInTrayDocument({
      onSuccess,
      onFailure,
      inTrayDocumentId: getInTrayDocumentId(this.store.getState()),
    });
  };

  render = () => {
    const isCreating = getIsCreating(this.store.getState());
    const spendMoneyView = (
      <SpendMoneyDetailView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={isCreating
          ? this.createSpendMoneyEntry : this.updateSpendMoneyEntry}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.dispatcher.closeModal}
        onConfirmCancelButtonClick={this.redirectToModalUrl}
        onConfirmDeleteButtonClick={this.deleteSpendMoneyTransaction}
        onDismissAlert={this.dispatcher.dismissAlert}
        isCreating={isCreating}
        onUpdateRow={this.updateSpendMoneyLine}
        onAddRow={this.addSpendMoneyLine}
        onRemoveRow={this.deleteSpendMoneyLine}
        onRowInputBlur={this.formatAndCalculateTotals}
        onAddAttachments={this.addAttachments}
        onRemoveAttachment={this.openDeleteAttachmentModal}
        onDeleteAttachmentModal={this.removeAttachment}
        onOpenAttachment={this.openAttachment}
        onFocusAttachments={this.focusSpendMoneyAttachments}
        onCloseSplitView={this.closeSplitView}
        onOpenSplitView={this.openSplitView}
        onClosePrefillInfo={this.dispatcher.hidePrefillInfo}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {spendMoneyView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  saveSpendMoney = () => {
    if (getIsCreating(this.store.getState())) {
      this.createSpendMoneyEntry();
    } else {
      this.updateSpendMoneyEntry();
    }
  }

  handlers = {
    SAVE_ACTION: this.saveSpendMoney,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.dispatcher.setLoadingState(true);
    this.loadSpendMoney();
  }

  resetState() {
    this.dispatcher.resetState();
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }
}
