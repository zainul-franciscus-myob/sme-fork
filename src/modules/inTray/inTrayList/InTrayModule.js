import { Provider } from 'react-redux';
import React from 'react';
import copy from 'copy-to-clipboard';

import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL } from '../inTrayMessageTypes';
import {
  SUCCESSFULLY_SAVED_BILL,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
} from '../../bill/billDetail/types/BillMessageTypes';
import { SUCCESSFULLY_SAVED_SPEND_MONEY, SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK } from '../../spendMoney/spendMoneyMessageTypes';
import { getBusinessId, getRegion } from './selectors/InTraySelectors';
import { getEmail, getIsUploadOptionsLoading } from './selectors/UploadOptionsSelectors';
import {
  getIsEntryLoading,
  getIsEntryUploadingDone,
  getNewSortOrder,
  getUploadCompleteAlert,
  getUploadingEntry,
  getUploadingErrorMessage,
} from './selectors/InTrayListSelectors';
import InTrayView from './components/InTrayView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import actionTypes from './actionTypes';
import createInTrayDispatcher from './createInTrayDispatcher';
import createInTrayIntegrator from './createInTrayIntegrator';
import inTrayReducer from './reducer/inTrayReducer';
import modalTypes from './modalTypes';
import openBlob from '../../../common/blobOpener/openBlob';

const messageTypes = [
  SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL,
  SUCCESSFULLY_SAVED_BILL,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
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
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadInTray(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInTray({ onSuccess, onFailure });
  }

  handleActionSelect = id => (action) => {
    switch (action) {
      case actionTypes.linkToExistingBill:
        this.redirectToLinkToExistingBill(id);
        break;
      case actionTypes.createBill:
        this.redirectToCreateBill(id);
        break;
      case actionTypes.createSpendMoney:
        this.redirectToCreateSpendMoney(id);
        break;
      case actionTypes.download:
        this.openInTrayDocument(id);
        break;
      case actionTypes.delete:
        this.dispatcher.openInTrayDeleteModal(id);
        break;
      default:
    }
  };

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

  openInTrayDocument = (id) => {
    this.dispatcher.setInTrayListEntrySubmittingState(id, true);

    const onSuccess = (blob) => {
      this.dispatcher.setInTrayListEntrySubmittingState(id, false);
      openBlob({ blob, filename: `${id}.pdf` });
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
  }

  setDocumentViewerUrl = (id) => {
    const onSuccess = (blob) => {
      const url = URL.createObjectURL(blob);
      this.dispatcher.setDocumentViewerUrl(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.downloadInTrayDocument({
      onSuccess,
      onFailure,
      id,
    });
  }

  redirectToCreateBill = (id) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/bill/new?inTrayDocumentId=${id}&source=inTray`;
  }

  redirectToCreateSpendMoney = (id) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/spendMoney/new?inTrayDocumentId=${id}`;
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

  activateEntryRow = (id) => {
    const state = this.store.getState();
    if (getIsEntryUploadingDone(state, id)) {
      this.dispatcher.activeEntryRow(id);
      this.setDocumentViewerUrl(id);
    }
  }

  deactivateEntryRow = (id) => {
    this.dispatcher.removeActiveEntryRow(id);
    this.dispatcher.unsetDocumentViewerUrl();
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
          handleActionSelect: this.handleActionSelect,
          onEntryActive: this.activateEntryRow,
          onCloseDetail: this.deactivateEntryRow,
          onAddAttachments: this.uploadInTrayFiles,
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
      const { content: message, type: messageType } = successMessage;
      const type = messageType === SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK ? 'info' : 'success';
      this.dispatcher.setAlert({
        type,
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
