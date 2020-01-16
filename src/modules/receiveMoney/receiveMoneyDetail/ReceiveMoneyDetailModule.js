import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_RECEIVE_MONEY_LINE,
  CLOSE_MODAL,
  CREATE_RECEIVE_MONEY,
  DELETE_RECEIVE_MONEY,
  DELETE_RECEIVE_MONEY_LINE,
  FORMAT_RECEIVE_MONEY_LINE,
  GET_CALCULATED_TOTALS,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
  OPEN_MODAL,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_RECEIVE_MONEY,
  UPDATE_RECEIVE_MONEY_HEADER,
  UPDATE_RECEIVE_MONEY_LINE,
} from '../ReceiveMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_RECEIVE_MONEY, SUCCESSFULLY_SAVED_RECEIVE_MONEY } from '../receiveMoneyMessageTypes';
import {
  getBusinessId,
  getCalculatedTotalsPayload,
  getIsActionsDisabled,
  getIsTableEmpty,
  getModalUrl,
  getOpenedModalType,
  getReceiveMoneyForCreatePayload,
  getReceiveMoneyForUpdatePayload,
  getReceiveMoneyId,
  getSaveUrl,
  getTransactionListUrl,
  isPageEdited,
} from './receiveMoneyDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import ReceiveMoneyDetailView from './components/ReceiveMoneyDetailView';
import Store from '../../../store/Store';
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
    this.receiveMoneyId = '';
  }

  loadReceiveMoney = () => {
    const intent = this.isCreating
      ? LOAD_NEW_RECEIVE_MONEY
      : LOAD_RECEIVE_MONEY_DETAIL;

    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
      ...(!this.isCreating && { receiveMoneyId: this.receiveMoneyId }),
    };

    const onSuccess = ({
      receiveMoney, newLine, totals, pageTitle,
    }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        receiveMoney,
        totals,
        newLine,
        pageTitle,
      });
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
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
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent: DELETE_RECEIVE_MONEY,
      urlParams: {
        businessId: getBusinessId(this.store.getState()),
        receiveMoneyId: this.receiveMoneyId,
      },
      onSuccess,
      onFailure,
    });
  }

  createReceiveMoneyEntry = () => {
    const intent = CREATE_RECEIVE_MONEY;
    const state = this.store.getState();
    const content = getReceiveMoneyForCreatePayload(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };
    this.saveReceiveMoneyEntry(intent, content, urlParams);
  };

  updateReceiveMoneyEntry = () => {
    const intent = UPDATE_RECEIVE_MONEY;
    const state = this.store.getState();
    const content = getReceiveMoneyForUpdatePayload(state);
    const receiveMoneyId = getReceiveMoneyId(state);
    const urlParams = {
      businessId: getBusinessId(state),
      receiveMoneyId,
    };
    this.saveReceiveMoneyEntry(intent, content, urlParams);
  }

  saveReceiveMoneyEntry(intent, content, urlParams) {
    if (getIsActionsDisabled(this.store.getState())) return;

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
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
    this.setSubmittingState(true);
  }

  updateHeaderOptions = ({ key, value }) => {
    const intent = UPDATE_RECEIVE_MONEY_HEADER;
    this.store.dispatch({
      intent,
      key,
      value,
    });

    if (key === 'isTaxInclusive') {
      this.getCalculatedTotals();
    }
  };

  updateReceiveMoneyLine = (lineIndex, lineKey, lineValue) => {
    const intent = UPDATE_RECEIVE_MONEY_LINE;

    this.store.dispatch({
      intent,
      lineIndex,
      lineKey,
      lineValue,
    });

    const taxKeys = ['accountId', 'taxCodeId'];
    if (taxKeys.includes(lineKey)) {
      this.getCalculatedTotals();
    }
  }

  addReceiveMoneyLine = (line) => {
    const intent = ADD_RECEIVE_MONEY_LINE;

    const { id, ...partialLine } = line;
    this.store.dispatch({
      intent,
      line: partialLine,
    });

    this.getCalculatedTotals();
  }

  deleteReceiveMoneyLine = (index) => {
    const intent = DELETE_RECEIVE_MONEY_LINE;

    this.store.dispatch({
      intent,
      index,
    });

    this.getCalculatedTotals();
  }

  getCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.store.dispatch({
        intent: RESET_TOTALS,
      });
      return;
    }

    const intent = GET_CALCULATED_TOTALS;

    const onSuccess = (totals) => {
      this.store.dispatch({
        intent,
        totals,
      });
    };

    const onFailure = error => this.displayAlert(error.message);

    this.integration.write({
      intent,
      urlParams: { businessId: getBusinessId(state) },
      content: getCalculatedTotalsPayload(state),
      onSuccess,
      onFailure,
    });
  }

  formatReceiveMoneyLine = (index) => {
    const intent = FORMAT_RECEIVE_MONEY_LINE;

    this.store.dispatch({
      intent,
      index,
    });
  }

  formatAndCalculateTotals = (line) => {
    this.formatReceiveMoneyLine(line);
    this.getCalculatedTotals();
  }

  setSubmittingState = (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;

    this.store.dispatch({
      intent,
      isSubmitting,
    });
  }

  displayAlert = (errorMessage) => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  }

  openCancelModal = () => {
    const intent = OPEN_MODAL;
    if (isPageEdited(this.store.getState())) {
      const state = this.store.getState();
      const transactionListUrl = getTransactionListUrl(state);
      this.store.dispatch({
        intent,
        modal: {
          type: ModalType.CANCEL,
          url: transactionListUrl,
        },
      });
    } else {
      this.redirectToTransactionList();
    }
  };

  openDeleteModal = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);
    const intent = OPEN_MODAL;

    this.store.dispatch({
      intent,
      modal: {
        type: ModalType.DELETE,
        url: transactionListUrl,
      },
    });
  };

  openUnsavedModal = (url) => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type: ModalType.UNSAVED,
        url,
      },
    });
  }

  closeModal = () => {
    const intent = CLOSE_MODAL;

    this.store.dispatch({ intent });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

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
    const receiveMoneyView = (
      <ReceiveMoneyDetailView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        isCreating={this.isCreating}
        onSaveButtonClick={this.isCreating
          ? this.createReceiveMoneyEntry : this.updateReceiveMoneyEntry}
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
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {receiveMoneyView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  saveReceivedMoney = () => {
    if (this.isCreating) {
      this.createReceiveMoneyEntry();
    } else {
      this.updateReceiveMoneyEntry();
    }
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case ModalType.CANCEL:
      case ModalType.DELETE:
        // DO NOTHING
        break;
      case ModalType.UNSAVED:
      default:
        this.saveReceivedMoney();
        break;
    }
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.setInitialState(context);
    this.receiveMoneyId = context.receiveMoneyId;
    this.isCreating = context.receiveMoneyId === 'new';
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.setLoadingState(LoadingState.LOADING);
    this.loadReceiveMoney();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
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
