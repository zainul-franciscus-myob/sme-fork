import { Provider } from 'react-redux';
import React from 'react';
import copy from 'copy-to-clipboard';

import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import { SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL } from './inTrayMessageTypes';
import {
  SUCCESSFULLY_SAVED_BILL,
} from '../bill/billDetail/types/BillMessageTypes';
import {
  getBusinessId,
  getRegion,
} from './selectors/InTraySelectors';
import { getEmail, getIsUploadOptionsLoading } from './selectors/UploadOptionsSelectors';
import {
  getIsEntryLoading,
  getNewSortOrder,
  getUploadCompleteAlert,
  getUploadingEntry,
  getUploadingErrorMessage,
} from './selectors/InTrayListSelectors';
import InTrayView from './components/InTrayView';
import Store from '../store/Store';
import createInTrayDispatcher from './createInTrayDispatcher';
import createInTrayIntegrator from './createInTrayIntegrator';
import inTrayReducer from './reducer/inTrayReducer';
import modalTypes from './modalTypes';

const messageTypes = [
  SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL,
  SUCCESSFULLY_SAVED_BILL,
];

export default class InTrayModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(inTrayReducer);
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.dispatcher = createInTrayDispatcher(this.store);
    this.integrator = createInTrayIntegrator(this.store, integration);
  }

  loadInTray = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadInTray(payload);
    };

    const onFailure = () => {
      console.log('Failed to load in tray');
    };

    this.integrator.loadInTray({ onSuccess, onFailure });
  }

  filterInTrayList = () => {
    const state = this.store.getState();
    if (getIsEntryLoading(state)) {
      return;
    }

    this.dispatcher.setInTrayListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setInTrayListTableLoadingState(false);
      this.dispatcher.filterInTrayList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setInTrayListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.filterInTrayList({ onSuccess, onFailure });
  }

  sortInTrayList = (orderBy) => {
    const state = this.store.getState();
    if (getIsEntryLoading(state)) {
      return;
    }

    this.dispatcher.setInTrayListTableLoadingState(true);

    const sortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setInTrayListSortOrder(orderBy, sortOrder);

    const onSuccess = (response) => {
      this.dispatcher.setInTrayListTableLoadingState(false);
      this.dispatcher.sortInTrayList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setInTrayListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.sortInTrayList({
      orderBy, sortOrder, onSuccess, onFailure,
    });
  }

  uploadInTrayFiles = (files) => {
    const entries = files.reverse().reduce((acc, file, index) => {
      const errorMessage = getUploadingErrorMessage(file);
      if (errorMessage) {
        this.dispatcher.setAlert({ message: errorMessage, type: 'danger' });

        return acc;
      }

      const entry = getUploadingEntry(index);
      const { uploadId } = entry;

      this.dispatcher.addInTrayListEntry(entry);

      return [...acc, { uploadId, file }];
    }, []);

    if (entries.length) {
      this.createInTrayDocuments(entries);
    }
  }

  createInTrayDocuments = (entries) => {
    const onProgress = () => { };

    const onSuccess = ({ entry }, index) => {
      const { uploadId } = entries[index] || { uploadId: 'none' };

      this.dispatcher.createInTrayDocument(uploadId, entry);
    };

    const onFailure = (response, index) => {
      const { uploadId } = entries[index] || { uploadId: 'none' };

      this.dispatcher.removeInTrayListEntry(uploadId);
    };

    const onComplete = (results) => {
      const alert = getUploadCompleteAlert(results);

      this.dispatcher.setAlert(alert);
    };

    this.integrator.createInTrayDocuments({
      onProgress,
      onSuccess,
      onFailure,
      onComplete,
      entries,
    });
  }

  deleteInTrayDocument = (id) => {
    const state = this.store.getState();
    if (getIsEntryLoading(state)) {
      return;
    }

    this.dispatcher.closeInTrayDeleteModal();
    this.dispatcher.setInTrayListEntrySubmittingState(id, true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setAlert({ message, type: 'success' });
      this.dispatcher.deleteInTrayDocument(id);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setInTrayListEntrySubmittingState(id, false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.deleteInTrayDocument({
      id,
      onSuccess,
      onFailure,
    });
  }

  downloadInTrayDocument = (id) => {
    this.dispatcher.setInTrayListEntrySubmittingState(id, true);

    const onSuccess = ({ fileUrl }) => {
      this.dispatcher.setInTrayListEntrySubmittingState(id, false);
      window.open(fileUrl, '_blank');
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setInTrayListEntrySubmittingState(id, false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.downloadInTrayDocument({
      onSuccess,
      onFailure,
      id,
    });
  };

  redirectToCreateBill = (id) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/bill/new?inTrayDocumentId=${id}`;
  }

  openMoreUploadOptionsDialog = () => {
    this.dispatcher.openModal(modalTypes.uploadOptions);
  }

  showEmailGenerationConfirmation = () => this.dispatcher.setConfirmingEmailGeneration(true);

  hideEmailGenerationConfirmation = () => this.dispatcher.setConfirmingEmailGeneration(false);

  generateNewEmail = () => {
    this.dispatcher.setUploadOptionsLoading(true);

    const onFailure = ({ message }) => {
      this.dispatcher.setUploadOptionsLoading(false);
      this.dispatcher.setUploadOptionsAlert('danger', message);
    };

    const onSuccess = ({ message, email }) => {
      this.hideEmailGenerationConfirmation();
      this.dispatcher.setUploadOptionsLoading(false);
      this.dispatcher.setUploadOptionsAlert('success', message);
      this.dispatcher.generateNewEmail(message, email);
    };

    this.integrator.generateNewEmail({ onSuccess, onFailure });
  }

  onCloseUploadOptionsModal = () => {
    if (!getIsUploadOptionsLoading(this.store.getState())) {
      this.hideEmailGenerationConfirmation();
      this.dispatcher.closeModal();
    }
  }

  copyEmail = () => {
    copy(getEmail(this.store.getState()));
    this.dispatcher.setUploadOptionsAlert('success', 'Copied!');
  }

  redirectToLinkToExistingBill = (id) => {
    const state = this.store.getState();
    const region = getRegion(state);
    const businessId = getBusinessId(state);

    window.location.href = `/#/${region}/${businessId}/linkBill/${id}`;
  }

  render = () => {
    const inTrayView = (
      <InTrayView
        inTrayListeners={{
          onDismissAlert: this.dispatcher.dismissAlert,
          onUploadOptionsButtonClicked: this.openMoreUploadOptionsDialog,
          onUploadButtonClick: this.uploadInTrayFiles,
        }}
        inTrayListListeners={{
          onUpdateFilterOptions: this.dispatcher.setInTrayListFilterOptions,
          onApplyFilter: this.filterInTrayList,
          onSort: this.sortInTrayList,
          onUpload: this.uploadInTrayFiles,
          onDownload: this.downloadInTrayDocument,
          onDelete: this.dispatcher.openInTrayDeleteModal,
          onLinkToExistingBill: this.redirectToLinkToExistingBill,
          onCreateBill: this.redirectToCreateBill,
        }}
        deleteModalListeners={{
          onConfirmClose: this.dispatcher.closeInTrayDeleteModal,
          onConfirmDelete: this.deleteInTrayDocument,
        }}
        uploadOptionsModalListeners={{
          onCancel: this.onCloseUploadOptionsModal,
          onConfirmEmailGenerationButtonClick: this.showEmailGenerationConfirmation,
          onGenerateNewEmailButtonClick: this.generateNewEmail,
          onDismissAlert: this.dispatcher.dismissUploadOptionsAlert,
          onDismissConfirmEmailGeneration: this.hideEmailGenerationConfirmation,
          onCopyEmailButtonClicked: this.copyEmail,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {inTrayView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    }
  };

  run = (context) => {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadInTray();
  }
}
