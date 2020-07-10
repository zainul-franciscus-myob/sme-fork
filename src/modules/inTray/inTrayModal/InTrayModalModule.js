/* eslint-disable react/no-this-in-sfc */
import { Provider } from 'react-redux';
import React from 'react';

import {
  getFilterOptions,
  getIsEntryLoading,
  getNewSortOrder,
  getUploadCompleteAlert,
  getUploadingEntry,
  getUploadingErrorMessage,
} from './InTrayModalSelectors';
import InTrayModalView from './components/InTrayModalView';
import Store from '../../../store/Store';
import createInTrayModalDispatcher from './createInTrayModalDispatcher';
import createInTrayModalIntegrator from './createInTrayModalIntegrator';
import debounce from '../../../common/debounce/debounce';
import inTrayModalReducer from './InTrayModalReducer';

export default class InTrayModalModule {
  constructor({ integration }) {
    this.integration = integration;
    this.store = new Store(inTrayModalReducer);
    this.dispatcher = createInTrayModalDispatcher(this.store);
    this.integrator = createInTrayModalIntegrator(this.store, integration);
  }

  loadInTrayModal = () => {
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

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

  updateSortOrder = (orderBy) => {
    const state = this.store.getState();
    if (getIsEntryLoading(state)) {
      return;
    }

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

    if (entries.length) {
      this.createInTrayDocuments(entries);
    }
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
  };

  viewInTrayDocument = (id) => {
    this.dispatcher.setEntrySubmittingState(id, true);

    const onSuccess = ({ fileUrl }) => {
      this.dispatcher.setEntrySubmittingState(id, false);
      window.open(fileUrl, '_blank');
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

  render = () => (
    <Provider store={this.store}>
      <InTrayModalView
        inTrayModalListeners={{
          onDismissAlert: this.dispatcher.dismissAlert,
          onLinkButtonClick: this.linkInTrayDocument,
          onCloseModal: this.close,
        }}
        inTrayListListeners={{
          onUpdateFilterOptions: this.updateFilterOptions,
          onSort: this.updateSortOrder,
          onUpload: this.uploadInTrayFiles,
          onView: this.viewInTrayDocument,
          onSelect: this.dispatcher.setSelectedDocumentId,
        }}
      />
    </Provider>
  );

  close = () => {
    this.dispatcher.resetState();
  };

  run = ({ context, onSaveSuccess, onLoadFailure }) => {
    this.onSaveSuccess = onSaveSuccess;
    this.onLoadFailure = onLoadFailure;
    this.dispatcher.setInitialState(context);
    this.loadInTrayModal();
  };

  resetState = () => this.dispatcher.resetState();
}
