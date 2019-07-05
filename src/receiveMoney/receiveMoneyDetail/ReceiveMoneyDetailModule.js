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
  SET_TOTALS_LOADING_STATE,
  UPDATE_RECEIVE_MONEY,
  UPDATE_RECEIVE_MONEY_HEADER,
  UPDATE_RECEIVE_MONEY_LINE,
} from '../ReceiveMoneyIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_RECEIVE_MONEY, SUCCESSFULLY_SAVED_RECEIVE_MONEY,
} from '../receiveMoneyMessageTypes';
import {
  getBusinessId,
  getCalculatedTotalsPayload,
  getIsTableEmpty,
  getReceiveMoneyForCreatePayload,
  getReceiveMoneyForUpdatePayload,
  getReceiveMoneyId,
  getRegion,
  isPageEdited,
} from './receiveMoneyDetailSelectors';
import ReceiveMoneyDetailView from './components/ReceiveMoneyDetailView';
import Store from '../../store/Store';
import keyMap from '../../hotKeys/keyMap';
import receiveMoneyDetailReducer from './receiveMoneyDetailReducer';
import setupHotKeys from '../../hotKeys/setupHotKeys';

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

    const onSuccess = ({ receiveMoney, newLine, totals }) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        receiveMoney,
        totals,
        newLine,
        isLoading: false,
      });
    };

    const onFailure = () => {
      console.log('Failed to load receive money details');
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
    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_RECEIVE_MONEY,
        content: response.message,
      });
      this.setSubmittingState(false);
      this.redirectToTransactionList();
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

  addReceiveMoneyLine = (partialLine) => {
    const intent = ADD_RECEIVE_MONEY_LINE;

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
      this.store.dispatch({
        intent,
        modalType: 'cancel',
      });
    } else {
      this.redirectToTransactionList();
    }
  };

  openDeleteModal = () => {
    const intent = OPEN_MODAL;

    this.store.dispatch({
      intent,
      modalType: 'delete',
    });
  };

  closeModal = () => {
    const intent = CLOSE_MODAL;

    this.store.dispatch({ intent });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setTotalsLoadingState = (isTotalsLoading) => {
    const intent = SET_TOTALS_LOADING_STATE;

    this.store.dispatch({
      intent,
      isTotalsLoading,
    });
  }

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/transactionList`;
  };

  render = () => {
    const receiveMoneyView = (
      <ReceiveMoneyDetailView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        isCreating={this.isCreating}
        onSaveButtonClick={this.isCreating
          ? this.createReceiveMoneyEntry : this.updateReceiveMoneyEntry}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.closeModal}
        onDeleteModal={this.deleteReceiveMoney}
        onCancelModal={this.redirectToTransactionList}
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

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
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

  handlers = {
    SAVE_ACTION: this.saveReceivedMoney,
  };

  run(context) {
    this.setInitialState(context);
    this.receiveMoneyId = context.receiveMoneyId;
    this.isCreating = context.receiveMoneyId === 'new';
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.setLoadingState(true);
    this.loadReceiveMoney();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
