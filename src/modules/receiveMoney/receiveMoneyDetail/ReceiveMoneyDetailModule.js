import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_RECEIVE_MONEY, SUCCESSFULLY_SAVED_RECEIVE_MONEY } from '../receiveMoneyMessageTypes';
import {
  getAccountModalContext,
  getContactModalContext,
  getIndexOfLastLine,
  getIsActionsDisabled,
  getIsCreating,
  getIsLineEdited,
  getIsTableEmpty,
  getModal,
  getModalUrl,
  getOpenedModalType,
  getTaxCalculations,
  isPageEdited,
} from './selectors/receiveMoneyDetailSelectors';
import {
  getCreateReceiveMoneyUrl,
  getDuplicateReceiveMoneyUrl,
  getSaveUrl,
  getShouldReload,
  getTransactionListUrl,
} from './selectors/redirectSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactModalModule from '../../contact/contactModal/ContactModalModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import ReceiveMoneyDetailView from './components/ReceiveMoneyDetailView';
import SaveActionType from './components/SaveActionType';
import Store from '../../../store/Store';
import createReceiveMoneyDetailDispatcher from './createReceiveMoneyDetailDispatcher';
import createReceiveMoneyDetailIntegrator from './createReceiveMoneyDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import receiveMoneyDetailReducer from './receiveMoneyDetailReducer';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class ReceiveMoneyDetailModule {
  constructor({
    integration, setRootView, pushMessage, reload, popMessages, featureToggles,
  }) {
    this.integration = integration;
    this.store = new Store(receiveMoneyDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.reload = reload;

    this.dispatcher = createReceiveMoneyDetailDispatcher({ store: this.store });
    this.integrator = createReceiveMoneyDetailIntegrator({ store: this.store, integration });

    this.isReceiveMoneyJobColumnEnabled = featureToggles.isReceiveMoneyJobColumnEnabled;

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

  createOrUpdateReceiveMoney = (onSuccess) => {
    if (getIsActionsDisabled(this.store.getState())) return;

    this.setSubmittingState(true);

    const onFailure = (error) => {
      const state = this.store.getState();
      if (getModal(state)) {
        this.closeModal();
      }
      this.setSubmittingState(false);
      this.displayFailureAlert(error.message);
    };

    this.integrator.saveReceiveMoney({ onSuccess, onFailure });
  }

  saveReceiveMoney = () => {
    const onSuccess = (response) => {
      this.pushSuccessfulSaveMessage(response.message);
      this.setSubmittingState(false);

      const url = getSaveUrl(this.store.getState());
      this.redirectToUrlOrReloadModule(url);
    };

    this.createOrUpdateReceiveMoney(onSuccess);
  }

  saveAndDuplicate = () => {
    const onSuccess = ({ message, id }) => {
      if (getIsCreating(this.store.getState())) {
        this.dispatcher.updateIdAfterCreate(id);
      }

      this.pushSuccessfulSaveMessage(message);
      this.redirectToDuplicateReceiveMoney();
    };

    this.createOrUpdateReceiveMoney(onSuccess);
  }

  saveAndCreateNew = () => {
    const onSuccess = ({ message }) => {
      this.pushSuccessfulSaveMessage(message);

      if (getShouldReload(this.store.getState())) {
        this.reload();
      } else {
        this.redirectToCreateReceiveMoney();
      }
    };

    this.createOrUpdateReceiveMoney(onSuccess);
  }

  saveAnd = saveAndAction => ({
    [SaveActionType.SAVE_AND_CREATE_NEW]: this.saveAndCreateNew,
    [SaveActionType.SAVE_AND_DUPLICATE]: this.saveAndDuplicate,
  }[saveAndAction]())

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

  pushSuccessfulSaveMessage = (message) => {
    this.pushMessage({
      type: SUCCESSFULLY_SAVED_RECEIVE_MONEY,
      content: message,
    });
  }

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);
    this.redirectToUrl(transactionListUrl);
  };

  handleOnDiscardClickFromUnsavedModal = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);

    this.redirectToUrlOrReloadModule(url);
  }

  redirectToDuplicateReceiveMoney = () => {
    const state = this.store.getState();
    const url = getDuplicateReceiveMoneyUrl(state);

    this.redirectToUrl(url);
  }

  redirectToCreateReceiveMoney = () => {
    const state = this.store.getState();
    const url = getCreateReceiveMoneyUrl(state);

    this.redirectToUrl(url);
  }

  redirectToUrlOrReloadModule = (url) => {
    const state = this.store.getState();

    if (window.location.href.includes(url)) {
      if (window.location.href.includes(getDuplicateReceiveMoneyUrl(state))) {
        this.redirectToCreateReceiveMoney();
      } else {
        this.reload();
      }
    } else this.redirectToUrl(url);
  }

  redirectToUrl = (url) => {
    window.location.href = url;
  };

  render = () => {
    const accountModal = this.accountModalModule.render();
    const contactModal = this.contactModalModule.render();

    const receiveMoneyView = (
      <ReceiveMoneyDetailView
        accountModal={accountModal}
        contactModal={contactModal}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={this.saveReceiveMoney}
        onSaveAndButtonClick={this.saveAnd}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissModal={this.closeModal}
        onConfirmDeleteButtonClick={this.deleteReceiveMoney}
        onConfirmCancelButtonClick={this.handleOnDiscardClickFromUnsavedModal}
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
        this.saveReceiveMoney();
        break;
    }
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  readMessages = () => {
    const messageTypes = [SUCCESSFULLY_SAVED_RECEIVE_MONEY];
    const [successMessage] = this.popMessages(messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ message, type: 'success' });
    }
  };

  run(context) {
    this.dispatcher.setInitialState({
      ...context,
      isReceiveMoneyJobColumnEnabled: this.isReceiveMoneyJobColumnEnabled,
    });
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.readMessages();
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
