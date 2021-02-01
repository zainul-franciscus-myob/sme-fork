import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_SAVED_TAX_CODE } from '../../../common/types/MessageTypes';
import {
  getContactComboboxContext,
  getIsPageEdited,
  getModalUrl,
  getTaxCodeListUrl,
} from './taxDetailSelectors';
import AlertType from '../../../common/types/AlertType';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from './ModalType';
import Store from '../../../store/Store';
import TaxDetailView from './components/TaxDetailView';
import createTaxDetailDispatcher from './createTaxDetailDispatcher';
import createTaxDetailIntegrator from './createTaxDetailIntegrator';
import taxDetailReducer from './taxDetailReducer';

class TaxDetailModule {
  constructor({ integration, setRootView, navigateTo, pushMessage }) {
    this.store = new Store(taxDetailReducer);
    this.setRootView = setRootView;
    this.dispatcher = createTaxDetailDispatcher(this.store);
    this.integrator = createTaxDetailIntegrator(this.store, integration);
    this.contactComboboxModule = new ContactComboboxModule({
      integration,
    });
    this.navigateTo = navigateTo;
    this.pushMessage = pushMessage;
  }

  loadTaxDetail = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadTaxDetail(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadTaxDetail({
      onSuccess,
      onFailure,
    });
  };

  updateTaxField = ({ key, value }) => {
    this.dispatcher.updateTaxField(key, value);
  };

  saveTaxDetail = () => {
    this.dispatcher.setIsSubmitting(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_TAX_CODE,
        content: message,
      });

      const state = this.store.getState();
      const url = getModalUrl(state);
      this.redirectToUrl(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsSubmitting(false);
      this.dispatcher.setAlert({ type: AlertType.DANGER, message });
    };

    this.integrator.saveTaxDetail({ onSuccess, onFailure });
  };

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
  };

  openCancelModal = () => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.dispatcher.openModal({ type: ModalType.CANCEL });
    } else {
      this.redirectToTaxCodeList();
    }
  };

  onCancel = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.redirectToUrl(url);
  };

  redirectToTaxCodeList = () => {
    const state = this.store.getState();
    const taxCodeListUrl = getTaxCodeListUrl(state);

    this.navigateTo(taxCodeListUrl);
  };

  redirectToUrl = (url) => {
    if (url) {
      this.navigateTo(url);
    } else {
      this.redirectToTaxCodeList();
    }
  };

  loadContactCombobox = () => {
    const state = this.store.getState();
    const context = getContactComboboxContext(state);
    this.contactComboboxModule.run(context);
  };

  renderContactCombobox = (props) => {
    return this.contactComboboxModule
      ? this.contactComboboxModule.render(props)
      : null;
  };

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => {
    this.contactComboboxModule.resetState();
    this.dispatcher.resetState();
  };

  render = () =>
    this.setRootView(
      <Provider store={this.store}>
        <TaxDetailView
          onChangeTaxField={this.updateTaxField}
          onSaveButtonClick={this.saveTaxDetail}
          onCancelButtonClick={this.openCancelModal}
          onCloseModal={this.dispatcher.closeModal}
          onCancelModal={this.onCancel}
          onDismissAlert={this.dispatcher.dismissAlert}
          renderContactCombobox={this.renderContactCombobox}
        />
      </Provider>
    );

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadTaxDetail();
    this.loadContactCombobox();
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  };
}

export default TaxDetailModule;
