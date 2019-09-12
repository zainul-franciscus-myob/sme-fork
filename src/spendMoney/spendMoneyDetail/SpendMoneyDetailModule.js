import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
} from '../spendMoneyMessageTypes';
import {
  getBusinessId,
  getFilesForUpload,
  getIsTableEmpty,
  getRegion,
  isPageEdited,
  isReferenceIdDirty,
} from './spendMoneyDetailSelectors';
import SpendMoneyDetailView from './components/SpendMoneyDetailView';
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
    this.spendMoneyId = '';
    this.dispatcher = createSpendMoneyDispatcher(this.store);
    this.integrator = createSpendMoneyIntegrator(this.store, integration);
  }

  loadSpendMoney = () => {
    const onSuccess = intent => (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadSpendMoney(intent, response);
    };

    const onFailure = () => {
      console.log('Failed to load spend money details');
    };

    this.integrator.loadSpendMoney({
      onSuccess, onFailure, spendMoneyId: this.spendMoneyId, isCreating: this.isCreating,
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
    if (key === 'selectedPayFromAccountId' && this.isCreating) {
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
      this.redirectToTransactionList();
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
      this.dispatcher.openModal('cancel');
    } else {
      this.redirectToTransactionList();
    }
  };

  openDeleteModal = () => this.dispatcher.openModal('delete');

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/transactionList`;
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

  addSpendMoneyLine = (partialLine) => {
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

  formatAndCalculateTotals = (index) => {
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
      spendMoneyId: this.spendMoneyId,
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

  render = () => {
    const spendMoneyView = (
      <SpendMoneyDetailView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={this.isCreating
          ? this.createSpendMoneyEntry : this.updateSpendMoneyEntry}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.dispatcher.closeModal}
        onCancelModal={this.redirectToTransactionList}
        onDeleteModal={this.deleteSpendMoneyTransaction}
        onDismissAlert={this.dispatcher.dismissAlert}
        isCreating={this.isCreating}
        onUpdateRow={this.updateSpendMoneyLine}
        onAddRow={this.addSpendMoneyLine}
        onRemoveRow={this.deleteSpendMoneyLine}
        onRowInputBlur={this.formatAndCalculateTotals}
        onAddAttachments={this.addAttachments}
        onRemoveAttachment={this.openDeleteAttachmentModal}
        onDeleteAttachmentModal={this.removeAttachment}
        onOpenAttachment={this.openAttachment}
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
    if (this.isCreating) {
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
    this.spendMoneyId = context.spendMoneyId;
    this.isCreating = context.spendMoneyId === 'new';
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.dispatcher.setLoadingState(true);
    this.loadSpendMoney();
  }

  resetState() {
    this.dispatcher.resetState();
  }
}
