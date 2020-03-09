import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_RECEIVE_MONEY, SUCCESSFULLY_SAVED_RECEIVE_MONEY } from '../receiveMoneyMessageTypes';
import {
  getAccountModalContext,
  getContactModalContext,
  getIndexOfLastLine,
  getIsActionsDisabled,
  getIsLineEdited,
  getIsTableEmpty,
  getModalUrl,
  getOpenedModalType,
  getSaveUrl,
  getTaxCalculations,
  getTransactionListUrl,
  isPageEdited,
} from './receiveMoneyDetailSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactModalModule from '../../contact/contactModal/ContactModalModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import ReceiveMoneyDetailView from './components/ReceiveMoneyDetailView';
import Store from '../../../store/Store';
import createReceiveMoneyDetailDispatcher from './createReceiveMoneyDetailDispatcher';
import createReceiveMoneyDetailIntegrator from './createReceiveMoneyDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import receiveMoneyDetailReducer from './receiveMoneyDetailReducer';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class ReceiveMoneyDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.store = new Store(receiveMoneyDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;

    this.dispatcher = createReceiveMoneyDetailDispatcher({ store: this.store });
    this.integrator = createReceiveMoneyDetailIntegrator({ store: this.store, integration });

    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.contactModalModule = new ContactModalModule({ integration });
  }

  openContactModal = () => {
    const state = this.store.getState();
    const context = getContactModalContext(state);

    this.contactModalModule.run({
      context,
      onLoadFailure: message => this.displayFailureAlert(message),
      onSaveSuccess: this.loadContactAfterCreate,
    });
  }

  loadContactAfterCreate = ({ id, message }) => {
    this.contactModalModule.resetState();
    this.displaySuccessAlert(message);
    this.dispatcher.setContactLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setContactLoadingState(false);
      this.dispatcher.loadContactAfterCreate(payload);
    };

    const onFailure = () => {
      this.dispatcher.setContactLoadingState(false);
    };

    this.integrator.loadContactAfterCreate({ id, onSuccess, onFailure });
  }

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: payload => this.loadAccountAfterCreate(payload, onChange),
      onLoadFailure: message => this.displayFailureAlert(message),
    });
  };

  loadAccountAfterCreate = ({ id, message }, onChange) => {
    this.dispatcher.setSubmittingState(true);
    this.displaySuccessAlert(message);
    this.accountModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.loadAccountAfterCreate(payload);
      onChange(payload);
    };

    const onFailure = () => {
      this.dispatcher.setSubmittingState(false);
    };
    this.integrator.loadAccountAfterCreate({ id, onSuccess, onFailure });
  };

  loadReceiveMoney = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadReceiveMoney(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadReceiveMoney({ onSuccess, onFailure });
  };

  deleteReceiveMoney = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_RECEIVE_MONEY,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayFailureAlert(error.message);
    };

    this.integrator.deleteReceiveMoney({ onSuccess, onFailure });
  }

  saveReceiveMoneyEntry = () => {
    if (getIsActionsDisabled(this.store.getState())) return;

    this.setSubmittingState(true);

    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_RECEIVE_MONEY,
        content: response.message,
      });
      this.setSubmittingState(false);

      const state = this.store.getState();
      const url = getSaveUrl(state);
      this.redirectToUrl(url);
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayFailureAlert(error.message);
    };

    this.integrator.saveReceiveMoneyEntry({ onSuccess, onFailure });
  }

  updateHeaderOptions = ({ key, value }) => {
    this.dispatcher.updateHeaderOptions({ key, value });

    if (key === 'isTaxInclusive') {
      this.getCalculatedTotals(true);
    }
  };

  updateReceiveMoneyLine = (lineIndex, lineKey, lineValue) => {
    this.dispatcher.updateReceiveMoneyLine(lineIndex, lineKey, lineValue);

    const taxKeys = ['accountId', 'taxCodeId'];
    if (taxKeys.includes(lineKey)) {
      this.getCalculatedTotals(false);
    }
  }

  addReceiveMoneyLine = (line) => {
    this.dispatcher.addReceiveMoneyLine();

    const { id, ...partialLine } = line;
    const newLineKey = Object.keys(partialLine)[0];
    const newLineValue = line[newLineKey];

    const state = this.store.getState();
    const newLineIndex = getIndexOfLastLine(state);

    this.updateReceiveMoneyLine(newLineIndex, newLineKey, newLineValue);
  }

  deleteReceiveMoneyLine = (index) => {
    this.dispatcher.deleteReceiveMoneyLine(index);
    this.getCalculatedTotals(false);
  }

  getCalculatedTotals = (isSwitchingTaxInclusive) => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.dispatcher.resetTotals();
      return;
    }

    const { lines, totals } = getTaxCalculations(state, isSwitchingTaxInclusive);
    this.dispatcher.getCalculatedTotals({ lines, totals });
  }

  formatAndCalculateTotals = () => {
    const state = this.store.getState();
    const isLineEdited = getIsLineEdited(state);
    if (isLineEdited) {
      this.getCalculatedTotals(false);
    }
  }

  setSubmittingState = isSubmitting => this.dispatcher.setSubmittingState(isSubmitting);

  displayFailureAlert = message => this.dispatcher.setAlert({ type: 'danger', message });

  displaySuccessAlert = message => this.dispatcher.setAlert({ type: 'success', message });

  openCancelModal = () => {
    if (isPageEdited(this.store.getState())) {
      this.dispatcher.openCancelModal();
    } else {
      this.redirectToTransactionList();
    }
  };

  openDeleteModal = () => this.dispatcher.openDeleteModal();

  openUnsavedModal = url => this.dispatcher.openUnsavedModal(url);

  closeModal = () => this.dispatcher.closeModal();

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  dismissAlert = () => this.dispatcher.dismissAlert();

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);
    this.redirectToUrl(transactionListUrl);
  };

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.redirectToUrl(url);
  }

  redirectToUrl = (url) => {
    window.location.href = url;
  }

  render = () => {
    const accountModal = this.accountModalModule.render();
    const contactModal = this.contactModalModule.render();

    const receiveMoneyView = (
      <ReceiveMoneyDetailView
        accountModal={accountModal}
        contactModal={contactModal}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={this.saveReceiveMoneyEntry}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissModal={this.closeModal}
        onConfirmDeleteButtonClick={this.deleteReceiveMoney}
        onConfirmCancelButtonClick={this.redirectToModalUrl}
        onDismissAlert={this.dismissAlert}
        onUpdateRow={this.updateReceiveMoneyLine}
        onAddRow={this.addReceiveMoneyLine}
        onRemoveRow={this.deleteReceiveMoneyLine}
        onRowInputBlur={this.formatAndCalculateTotals}
        onAddAccount={this.openAccountModal}
        onAddContact={this.openContactModal}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {receiveMoneyView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  saveHandler = () => {
    if (this.accountModalModule.isOpened()) {
      this.accountModalModule.save();
      return;
    }
    if (this.contactModalModule.isOpened()) {
      this.contactModalModule.save();
      return;
    }

    const state = this.store.getState();
    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case ModalType.CANCEL:
      case ModalType.DELETE:
        // DO NOTHING
        break;
      case ModalType.UNSAVED:
      default:
        this.saveReceiveMoneyEntry();
        break;
    }
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadReceiveMoney();
  }

  resetState() {
    this.accountModalModule.resetState();
    this.contactModalModule.resetState();
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
