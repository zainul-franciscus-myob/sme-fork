import { Provider } from 'react-redux';
import React from 'react';
import copy from 'copy-to-clipboard';

import {
  getAppStoreLink,
  getEmail,
  getFilterOptions,
  getGooglePlayLink,
  getIsEntryLoading,
  getNewSortOrder,
  getSuppliersWikiLink,
  getUploadCompleteAlert,
  getUploadingEntry,
  getUploadingErrorMessage,
} from './selectors/InTrayModalSelectors';
import InTrayModalView from './components/InTrayModalView';
import Store from '../../../store/Store';
import createInTrayModalDispatcher from './createInTrayModalDispatcher';
import createInTrayModalIntegrator from './createInTrayModalIntegrator';
import debounce from '../../../common/debounce/debounce';
import inTrayModalReducer from './reducers/InTrayModalReducer';

export default class InTrayModalModule {
  constructor({ integration, navigateTo }) {
    this.integration = integration;
    this.store = new Store(inTrayModalReducer);
    this.dispatcher = createInTrayModalDispatcher(this.store);
    this.integrator = createInTrayModalIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
  }

  loadInTrayModal = () => {
    const filterOptions = getFilterOptions(this.store.getState());

    this.dispatcher.setLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadInTrayModal(payload);
    };

    const onFailure = ({ message }) => {
      this.close();
      this.onLoadFailure(message);
    };

    this.integrator.loadInTrayModal({ filterOptions, onSuccess, onFailure });
  };

  sortAndFilterInTrayList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterInTrayList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.loadInTrayModal({ onSuccess, onFailure });
  };

  debouncedSortAndFilterInTrayList = debounce(this.sortAndFilterInTrayList);

  updateFilterOptions = ({ key, value }) => {
    this.dispatcher.setFilterOptions({ key, value });
    this.debouncedSortAndFilterInTrayList();
  };

  resetFilterOptions = () => {
    this.dispatcher.resetFilterOptions();
    this.sortAndFilterInTrayList();
  };

  updateSortOrder = (orderBy) => {
    const state = this.store.getState();

    if (getIsEntryLoading(state)) return;

    const sortOrder = getNewSortOrder(orderBy)(state);

    this.dispatcher.setSortOrder(orderBy, sortOrder);
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

    if (entries.length) this.createInTrayDocuments(entries);
  };

  createInTrayDocuments = (entries) => {
    const onProgress = () => {};

    const onSuccess = ({ entry }, index) => {
      const { uploadId } = entries[index] || { uploadId: 'none' };

      this.dispatcher.createInTrayDocument(uploadId, entry);
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

  viewInTrayDocument = (id) => {
    this.dispatcher.setEntrySubmittingState(id, true);

    const onSuccess = ({ fileUrl }) => {
      this.dispatcher.setEntrySubmittingState(id, false);
      this.openInNewTab(fileUrl);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setEntrySubmittingState(id, false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.viewInTrayDocument({
      onSuccess,
      onFailure,
      id,
    });
  };

  linkInTrayDocument = () => {
    const state = this.store.getState();

    this.onSaveSuccess(state.selectedId);
  };

  openInNewTab = (url) => this.navigateTo(url, true);

  openInSameTab = (url) => this.navigateTo(url, false);

  copyEmail = () => {
    copy(getEmail(this.store.getState()));

    this.dispatcher.setUploadOptionsAlert({
      message: 'Copied!',
      type: 'success',
    });
  };

  showEmailGenerationConfirmation = () =>
    this.dispatcher.setConfirmingEmailGeneration(true);

  hideEmailGenerationConfirmation = () =>
    this.dispatcher.setConfirmingEmailGeneration(false);

  setUploadPopoverState = () => this.dispatcher.setUploadPopoverState(true);

  generateNewEmail = () => {
    this.dispatcher.setUploadOptionsLoading(true);

    const onFailure = ({ message }) => {
      this.dispatcher.setUploadOptionsLoading(false);
      this.dispatcher.setUploadOptionsAlert({
        message,
        type: 'danger',
      });
    };

    const onSuccess = ({ message, email }) => {
      this.hideEmailGenerationConfirmation();
      this.dispatcher.setUploadOptionsLoading(false);
      this.dispatcher.setUploadOptionsAlert({
        message,
        type: 'success',
      });
      this.dispatcher.generateNewEmail(message, email);
    };

    this.integrator.generateNewEmail({ onSuccess, onFailure });
  };

  render = () => (
    <Provider store={this.store}>
      <InTrayModalView
        inTrayModalListeners={{
          onCloseModal: this.close,
          onDismissAlert: this.dispatcher.dismissAlert,
          onLinkButtonClick: this.linkInTrayDocument,
        }}
        inTrayListListeners={{
          onResetFilterOptions: this.resetFilterOptions,
          onSelect: this.dispatcher.setSelectedDocumentId,
          onSort: this.updateSortOrder,
          onUpdateFilterOptions: this.updateFilterOptions,
          onUpload: this.uploadInTrayFiles,
          onView: this.viewInTrayDocument,
        }}
        emptyStateListeners={{
          navigateToAppStore: () =>
            this.openInNewTab(getAppStoreLink(this.store.getState())),
          navigateToGooglePlay: () => this.openInNewTab(getGooglePlayLink),
          navigateToSuppliersWiki: () =>
            this.openInNewTab(getSuppliersWikiLink),
          onConfirmEmailGenerationButtonClick: this
            .showEmailGenerationConfirmation,
          onCopyEmailButtonClicked: this.copyEmail,
          onDismissAlert: this.dispatcher.dismissUploadOptionsAlert,
          onDismissConfirmEmailGeneration: this.hideEmailGenerationConfirmation,
          onGenerateNewEmailButtonClick: this.generateNewEmail,
          onUpload: this.uploadInTrayFiles,
          setUploadPopoverState: () => this.setUploadPopoverState(),
        }}
      />
    </Provider>
  );

  close = () => this.dispatcher.resetState();

  run = ({ context, onSaveSuccess, onLoadFailure }) => {
    this.onSaveSuccess = onSaveSuccess;
    this.onLoadFailure = onLoadFailure;
    this.dispatcher.setInitialState(context);
    this.loadInTrayModal();
  };

  resetState = () => this.dispatcher.resetState();
}
