import { Provider } from 'react-redux';
import React from 'react';
import copy from 'copy-to-clipboard';

import {
  PREFILL_INTRAY_DOCUMENT_FOR_BILL,
  PREFILL_INTRAY_DOCUMENT_FOR_SPEND_MONEY,
  SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL,
  SUCCESSFULLY_SAVED_BILL,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
} from '../../../common/types/MessageTypes';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getAppStoreLink,
  getGooglePlayLink,
  getIsEntryLoading,
  getIsEntryUploadingDone,
  getNewSortOrder,
  getShouldPolling,
  getSuppliersWikiLink,
  getUploadCompleteAlert,
  getUploadingEntry,
  getUploadingErrorMessage,
} from './selectors/InTrayListSelectors';
import {
  getBusinessId,
  getInTrayUploadOptionsModalContext,
  getRegion,
} from './selectors/InTraySelectors';
import { getEmail } from './selectors/UploadOptionsSelectors';
import { isToggleOn } from '../../../splitToggle';
import { trackUserEvent } from '../../../telemetry';
import InTrayUploadOptionsModalModule from '../inTrayUploadOptionsModal/InTrayUploadOptionsModalModule';
import InTrayView from './components/InTrayView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import actionTypes from './actionTypes';
import createInTrayDispatcher from './createInTrayDispatcher';
import createInTrayIntegrator from './createInTrayIntegrator';
import debounce from '../../../common/debounce/debounce';
import featureToggle from '../../../FeatureToggles';
import inTrayReducer from './reducer/inTrayReducer';
import openBlob from '../../../common/blobOpener/openBlob';

const messageTypes = [
  SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL,
  SUCCESSFULLY_SAVED_BILL,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
  SUCCESSFULLY_SAVED_SPEND_MONEY,
  SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK,
];

export default class InTrayModule {
  constructor({
    integration,
    setRootView,
    popMessages,
    pushMessage,
    globalCallbacks,
    navigateTo,
  }) {
    this.integration = integration;
    this.store = new Store(inTrayReducer);
    this.popMessages = popMessages;
    this.pushMessage = pushMessage;
    this.messageTypes = messageTypes;
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.globalCallbacks = globalCallbacks;
    this.dispatcher = createInTrayDispatcher(this.store);
    this.integrator = createInTrayIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
    this.inTrayUploadOptionsModalModule = new InTrayUploadOptionsModalModule({
      globalCallbacks,
      integration,
      navigateTo,
    });
  }

  loadInTray = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadInTray(payload);
      this.startPolling();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInTray({ onSuccess, onFailure });
  };

  handleActionSelect = (id) => (action) => {
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

  sortAndFilterInTrayList = () => {
    this.dispatcher.setInTrayListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setInTrayListTableLoadingState(false);
      this.dispatcher.sortAndFilterInTrayList(response);
      this.startPolling();
    };

    const onFailure = (error) => {
      this.dispatcher.setInTrayListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.sortAndfilterInTrayList({ onSuccess, onFailure });
  };

  sortInTrayList = (orderBy) => {
    const state = this.store.getState();

    if (getIsEntryLoading(state)) return;

    const sortOrder = getNewSortOrder(orderBy)(state);

    this.dispatcher.setInTrayListSortOrder(orderBy, sortOrder);
    this.sortAndFilterInTrayList();
  };

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
  };

  createInTrayDocuments = (entries) => {
    const onProgress = () => {};

    const onSuccess = ({ entry }, index) => {
      const { uploadId } = entries[index] || { uploadId: 'none' };

      this.dispatcher.createInTrayDocument(uploadId, entry);
      this.startPolling();
    };

    const onFailure = (response, index) => {
      const { uploadId } = entries[index] || { uploadId: 'none' };

      this.dispatcher.removeInTrayListEntry(uploadId);
    };

    const onComplete = (results) =>
      this.dispatcher.setAlert(getUploadCompleteAlert(results));

    this.integrator.createInTrayDocuments({
      onProgress,
      onSuccess,
      onFailure,
      onComplete,
      entries,
    });
  };

  stopPolling = () => {
    this.pollTimer = undefined;
  };

  startPolling = () => {
    if (!this.pollTimer && getShouldPolling(this.store.getState())) {
      this.pollTimer = setTimeout(() => this.pollEntries(), 7000);
    }
  };

  pollEntries = () => {
    const onSuccess = ({ entries }) => {
      this.dispatcher.pollIntrayList(entries);
      this.stopPolling();
      this.startPolling();
    };

    const onFailure = () => {
      this.dispatcher.setAlert({
        message: 'Failed to get OCR data',
        type: 'danger',
      });
      this.stopPolling();
    };

    this.integrator.pollInTrayList({ onSuccess, onFailure });
  };

  deleteInTrayDocument = (id) => {
    if (getIsEntryLoading(this.store.getState())) return;

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
  };

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
  };

  setDocumentViewerUrl = (id) => {
    const onSuccess = (blob) => {
      this.dispatcher.setDocumentViewerUrl(URL.createObjectURL(blob));
    };

    const onFailure = ({ message }) => {
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

    this.pushMessage({
      type: PREFILL_INTRAY_DOCUMENT_FOR_BILL,
      inTrayDocumentId: id,
    });

    if (isToggleOn(featureToggle.SmartMeTask)) {
      this.globalCallbacks.refreshTaskEvent(true);
      trackUserEvent({
        eventName: 'tasks',
        customProperties: {
          action: 'create_via_event',
          task: 'SmartMeLearn',
        },
      });
    }

    this.openInSameTab(`/#/${region}/${businessId}/bill/new`);
  };

  redirectToCreateSpendMoney = (id) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    this.pushMessage({
      type: PREFILL_INTRAY_DOCUMENT_FOR_SPEND_MONEY,
      inTrayDocumentId: id,
    });

    this.openInSameTab(`/#/${region}/${businessId}/spendMoney/new`);
  };

  openMoreUploadOptionsDialog = () => {
    const state = this.store.getState();
    const modalContext = getInTrayUploadOptionsModalContext(state);
    this.inTrayUploadOptionsModalModule.run({
      context: modalContext,
    });
    this.dispatcher.setUploadPopoverState(false);
  };

  showEmailGenerationConfirmation = () =>
    this.dispatcher.setConfirmingEmailGeneration(true);

  hideEmailGenerationConfirmation = () =>
    this.dispatcher.setConfirmingEmailGeneration(false);

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
  };

  copyEmail = () => {
    copy(getEmail(this.store.getState()));
    this.dispatcher.setUploadOptionsAlert('success', 'Copied!');
  };

  redirectToLinkToExistingBill = (id) => {
    const state = this.store.getState();
    const region = getRegion(state);
    const businessId = getBusinessId(state);

    this.openInSameTab(`/#/${region}/${businessId}/linkBill/${id}`);
  };

  activateEntryRow = (id) => {
    const state = this.store.getState();

    if (getIsEntryUploadingDone(state, id)) {
      this.dispatcher.activeEntryRow(id);
      this.setDocumentViewerUrl(id);
    }
  };

  deactivateEntryRow = (id) => {
    this.dispatcher.removeActiveEntryRow(id);
    this.dispatcher.unsetDocumentViewerUrl();
  };

  updateFilterOptions = ({ key, value }) => {
    if (getIsEntryLoading(this.store.getState())) return;

    this.dispatcher.setInTrayListFilterOptions({ key, value });

    debounce(this.sortAndFilterInTrayList)();
  };

  setUploadPopoverState = () => this.dispatcher.setUploadPopoverState(true);

  openInNewTab = (url) => this.navigateTo(url, true);

  openInSameTab = (url) => this.navigateTo(url, false);

  render = () => {
    const inTrayUploadOptionsModal = this.inTrayUploadOptionsModalModule.render();

    const inTrayView = (
      <InTrayView
        inTrayListeners={{
          onDismissAlert: this.dispatcher.dismissAlert,
          onUploadButtonClick: this.uploadInTrayFiles,
          onUploadOptionsButtonClicked: this.openMoreUploadOptionsDialog,
        }}
        inTrayListListeners={{
          handleActionSelect: this.handleActionSelect,
          onUpload: this.uploadInTrayFiles,
          onCloseDetail: this.deactivateEntryRow,
          onEntryActive: this.activateEntryRow,
          onSort: this.sortInTrayList,
          onUpdateFilterOptions: this.updateFilterOptions,
        }}
        deleteModalListeners={{
          onConfirmClose: this.dispatcher.closeInTrayDeleteModal,
          onConfirmDelete: this.deleteInTrayDocument,
        }}
        inTrayUploadOptionsModal={inTrayUploadOptionsModal}
        emptyStateListeners={{
          onUpload: this.uploadInTrayFiles,
          setUploadPopoverState: () => this.setUploadPopoverState(),
          onConfirmEmailGenerationButtonClick: this
            .showEmailGenerationConfirmation,
          onCopyEmailButtonClicked: this.copyEmail,
          onDismissAlert: this.dispatcher.dismissUploadOptionsAlert,
          onDismissConfirmEmailGeneration: this.hideEmailGenerationConfirmation,
          onGenerateNewEmailButtonClick: this.generateNewEmail,
          navigateToAppStore: () =>
            this.openInNewTab(getAppStoreLink(this.store.getState())),
          navigateToGooglePlay: () => this.openInNewTab(getGooglePlayLink),
          navigateToSuppliersWiki: () =>
            this.openInNewTab(getSuppliersWikiLink),
        }}
      />
    );

    this.setRootView(<Provider store={this.store}>{inTrayView}</Provider>);
  };

  resetState = () => {
    this.inTrayUploadOptionsModalModule.resetState();
    this.store.dispatch({ intent: RESET_STATE });
  };

  unsubscribeFromStore = () => {
    if (this.pollTimer) {
      // If there is a running poll clear it.
      clearTimeout(this.pollTimer);
    }

    this.store.unsubscribeAll();
  };

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message, type: messageType } = successMessage;
      const type =
        messageType === SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK
          ? 'info'
          : 'success';
      this.dispatcher.setAlert({
        type,
        message,
      });
    }
  };

  run = (context) => {
    // Set up empty pollTimer
    this.hasPollRunning = false;
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadInTray();
  };
}
