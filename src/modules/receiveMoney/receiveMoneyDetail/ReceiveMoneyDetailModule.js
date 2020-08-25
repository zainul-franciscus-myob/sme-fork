import { Provider } from 'react-redux';
import React from 'react';

import {
  DUPLICATE_RECEIVE_MONEY,
  SUCCESSFULLY_DELETED_RECEIVE_MONEY,
  SUCCESSFULLY_SAVED_RECEIVE_MONEY,
} from '../../../common/types/MessageTypes';
import {
  getAccountModalContext,
  getContactModalContext,
  getIndexOfLastLine,
  getIsActionsDisabled,
  getIsCreating,
  getIsLineEdited,
  getIsTableEmpty,
  getJobModalContext,
  getModal,
  getModalUrl,
  getOpenedModalType,
  getReceiveMoneyId,
  getTaxCalculations,
  isPageEdited,
} from './selectors/receiveMoneyDetailSelectors';
import {
  getCreateReceiveMoneyUrl,
  getSaveUrl,
  getTransactionListUrl,
} from './selectors/redirectSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactModalModule from '../../contact/contactModal/ContactModalModule';
import FeatureToggle from '../../../FeatureToggles';
import JobModalModule from '../../job/jobModal/JobModalModule';
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
    integration,
    setRootView,
    pushMessage,
    navigateTo,
    popMessages,
    isToggleOn,
  }) {
    this.integration = integration;
    this.store = new Store(receiveMoneyDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.navigateTo = navigateTo;

    this.dispatcher = createReceiveMoneyDetailDispatcher({ store: this.store });
    this.integrator = createReceiveMoneyDetailIntegrator({
      store: this.store,
      integration,
    });

    this.isToggleOn = isToggleOn;

    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.jobModalModule = new JobModalModule({ integration });
    this.contactModalModule = new ContactModalModule({ integration });
  }

  openContactModal = ({ onSuccess }) => {
    const state = this.store.getState();
    const context = getContactModalContext(state);

    this.contactModalModule.run({
      context,
      onLoadFailure: (message) => this.displayFailureAlert(message),
      onSaveSuccess: ({ id, message }) =>
        this.loadContactAfterCreate({
          id,
          message,
          onCreateContactSuccess: onSuccess,
        }),
    });
  };

  loadContactAfterCreate = ({ id, message, onCreateContactSuccess }) => {
    this.contactModalModule.resetState();
    this.displaySuccessAlert(message);
    this.dispatcher.setContactLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setContactLoadingState(false);
      this.dispatcher.loadContactAfterCreate(payload);
      onCreateContactSuccess(payload);
    };

    const onFailure = () => {
      this.dispatcher.setContactLoadingState(false);
    };

    this.integrator.loadContactAfterCreate({ id, onSuccess, onFailure });
  };

  openJobModal = (onChange) => {
    const state = this.store.getState();
    const context = getJobModalContext(state);

    this.jobModalModule.run({
      context,
      onLoadFailure: (message) => this.displayFailureAlert(message),
      onSaveSuccess: (payload) => this.loadJobAfterCreate(payload, onChange),
    });
  };

  loadJobAfterCreate = ({ message, id }, onChange) => {
    this.jobModalModule.resetState();
    this.displaySuccessAlert(message);
    this.dispatcher.setJobLoadingState(true);

    const onSuccess = (payload) => {
      const job = { ...payload, id };
      this.dispatcher.setJobLoadingState(false);
      this.dispatcher.loadJobAfterCreate(job);
      onChange(job);
    };

    const onFailure = () => {
      this.dispatcher.setJobLoadingState(false);
    };

    this.integrator.loadJobAfterCreate({ id, onSuccess, onFailure });
  };

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: (payload) =>
        this.loadAccountAfterCreate(payload, onChange),
      onLoadFailure: (message) => this.displayFailureAlert(message),
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

  loadContactOptions = () => {
    this.dispatcher.setContactOptionsLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setContactOptionsLoadingState(false);
      this.dispatcher.loadContactOptions(payload);
    };

    const onFailure = () => {
      this.dispatcher.setContactOptionsLoadingState(false);
    };

    this.integrator.loadContactOptions({ onSuccess, onFailure });
  };

  searchContact = ({
    keywords,
    onSuccess: onSearchContactSuccess,
    onFailure: onSearchJobFailure,
  }) => {
    const onSuccess = ({ entries }) => {
      onSearchContactSuccess(entries);
    };

    const onFailure = () => {
      onSearchJobFailure();
    };

    this.integrator.searchContact({ keywords, onSuccess, onFailure });
  };

  loadReceiveMoney = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadReceiveMoney(response);

      this.loadContactOptions();
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
  };

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
  };

  saveReceiveMoney = () => {
    const onSuccess = (response) => {
      this.pushSuccessfulSaveMessage(response.message);
      this.setSubmittingState(false);

      const url = getSaveUrl(this.store.getState());
      this.navigateTo(url);
    };

    this.createOrUpdateReceiveMoney(onSuccess);
  };

  saveAndDuplicate = () => {
    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      const duplicateId = isCreating ? id : getReceiveMoneyId(state);

      this.pushSuccessfulSaveMessage(message);
      this.pushMessage({
        type: DUPLICATE_RECEIVE_MONEY,
        duplicateId,
      });

      this.redirectToCreateReceiveMoney();
    };

    this.createOrUpdateReceiveMoney(onSuccess);
  };

  saveAndCreateNew = () => {
    const onSuccess = ({ message }) => {
      this.pushSuccessfulSaveMessage(message);

      this.redirectToCreateReceiveMoney();
    };

    this.createOrUpdateReceiveMoney(onSuccess);
  };

  saveAnd = (saveActionType) => {
    if (saveActionType === SaveActionType.SAVE_AND_DUPLICATE) {
      this.saveAndDuplicate();
    }

    if (saveActionType === SaveActionType.SAVE_AND_CREATE_NEW) {
      this.saveAndCreateNew();
    }
  };

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
  };

  addReceiveMoneyLine = (line) => {
    this.dispatcher.addReceiveMoneyLine();

    const { id, ...partialLine } = line;
    const newLineKey = Object.keys(partialLine)[0];
    const newLineValue = line[newLineKey];

    const state = this.store.getState();
    const newLineIndex = getIndexOfLastLine(state);

    this.updateReceiveMoneyLine(newLineIndex, newLineKey, newLineValue);
  };

  deleteReceiveMoneyLine = (index) => {
    this.dispatcher.deleteReceiveMoneyLine(index);
    this.getCalculatedTotals(false);
  };

  getCalculatedTotals = (isSwitchingTaxInclusive) => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.dispatcher.resetTotals();
      return;
    }

    const { lines, totals } = getTaxCalculations(
      state,
      isSwitchingTaxInclusive
    );
    this.dispatcher.getCalculatedTotals({ lines, totals });
  };

  calculateLineTotals = () => {
    const state = this.store.getState();
    const isLineEdited = getIsLineEdited(state);
    if (isLineEdited) {
      this.getCalculatedTotals(false);
    }
  };

  setSubmittingState = (isSubmitting) =>
    this.dispatcher.setSubmittingState(isSubmitting);

  displayFailureAlert = (message) =>
    this.dispatcher.setAlert({ type: 'danger', message });

  displaySuccessAlert = (message) =>
    this.dispatcher.setAlert({ type: 'success', message });

  openCancelModal = () => {
    if (isPageEdited(this.store.getState())) {
      this.dispatcher.openCancelModal();
    } else {
      this.redirectToTransactionList();
    }
  };

  openDeleteModal = () => this.dispatcher.openDeleteModal();

  openUnsavedModal = (url) => this.dispatcher.openUnsavedModal(url);

  closeModal = () => this.dispatcher.closeModal();

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  dismissAlert = () => this.dispatcher.dismissAlert();

  pushSuccessfulSaveMessage = (message) => {
    this.pushMessage({
      type: SUCCESSFULLY_SAVED_RECEIVE_MONEY,
      content: message,
    });
  };

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);
    this.navigateTo(transactionListUrl);
  };

  handleOnDiscardClickFromUnsavedModal = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);

    this.navigateTo(url);
  };

  redirectToCreateReceiveMoney = () => {
    const state = this.store.getState();
    const url = getCreateReceiveMoneyUrl(state);

    this.navigateTo(url);
  };

  render = () => {
    const accountModal = this.accountModalModule.render();
    const contactModal = this.contactModalModule.render();
    const jobModal = this.jobModalModule.render();

    const receiveMoneyView = (
      <ReceiveMoneyDetailView
        accountModal={accountModal}
        contactModal={contactModal}
        jobModal={jobModal}
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
        onRowInputBlur={this.calculateLineTotals}
        onAddAccount={this.openAccountModal}
        onAddContact={this.openContactModal}
        onAddJob={this.openJobModal}
        onLoadMoreContacts={this.loadContactOptions}
        onContactSearch={this.searchContact}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{receiveMoneyView}</Provider>
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
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  readMessages = () => {
    this.popMessages([
      SUCCESSFULLY_SAVED_RECEIVE_MONEY,
      DUPLICATE_RECEIVE_MONEY,
    ]).forEach((message) => {
      if (message.type === SUCCESSFULLY_SAVED_RECEIVE_MONEY) {
        this.dispatcher.setAlert({ message: message.content, type: 'success' });
      } else if (message.type === DUPLICATE_RECEIVE_MONEY) {
        this.dispatcher.setDuplicateId(message.duplicateId);
      }
    });
  };

  run(context) {
    this.dispatcher.setInitialState({
      ...context,
      isReceiveMoneyJobColumnEnabled: this.isToggleOn(
        FeatureToggle.EssentialsJobs
      ),
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
      this.navigateTo(url);
    }
  };
}
