import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_ENTRY, SUCCESSFULLY_SAVED_ENTRY } from '../receiveMoneyMessageTypes';
import {
  getCalculatedTotalsPayload, getReceiveMoney, getReceiveMoneyForCreatePayload, getReceiveMoneyId,
} from './receiveMoneyDetailSelectors';
import ReceiveMoneyDetailView from './components/ReceiveMoneyDetailView';
import ReceiveMoneyIntents from '../ReceiveMoneyIntents';
import Store from '../../store/Store';
import SystemIntents from '../../SystemIntents';
import receiveMoneyDetailReducer from './receiveMoneyDetailReducer';

export default class ReceiveMoneyDetailModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.store = new Store(receiveMoneyDetailReducer);
    this.setRootView = setRootView;
    this.businessId = '';
    this.pushMessage = pushMessage;
    this.receiveMoneyId = '';
  }

  loadReceiveMoney = () => {
    const intent = this.isCreating
      ? ReceiveMoneyIntents.LOAD_NEW_RECEIVE_MONEY
      : ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_DETAIL;

    const urlParams = {
      businessId: this.businessId,
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

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_ENTRY,
        content: message,
      });
      this.redirectToReceiveMoneyList();
    };

    const onFailure = (error) => {
      this.closeModal();
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent: ReceiveMoneyIntents.DELETE_RECEIVE_MONEY,
      urlParams: {
        businessId: this.businessId,
        receiveMoneyId: this.receiveMoneyId,
      },
      onSuccess,
      onFailure,
    });
  }

  createReceiveMoneyEntry = () => {
    const intent = ReceiveMoneyIntents.CREATE_RECEIVE_MONEY;
    const content = getReceiveMoneyForCreatePayload(this.store.state);
    const urlParams = {
      businessId: this.businessId,
    };
    this.saveReceiveMoneyEntry(intent, content, urlParams);
  };

  updateReceiveMoneyEntry = () => {
    const intent = ReceiveMoneyIntents.UPDATE_RECEIVE_MONEY;
    const content = getReceiveMoney(this.store.state);
    const receiveMoneyId = getReceiveMoneyId(this.store.state);
    const urlParams = {
      businessId: this.businessId,
      receiveMoneyId,
    };
    this.saveReceiveMoneyEntry(intent, content, urlParams);
  }

  saveReceiveMoneyEntry(intent, content, urlParams) {
    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_ENTRY,
        content: response.message,
      });
      this.setSubmittingState(false);
      this.redirectToReceiveMoneyList();
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
    const intent = ReceiveMoneyIntents.UPDATE_RECEIVE_MONEY_HEADER;
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
    const intent = ReceiveMoneyIntents.UPDATE_RECEIVE_MONEY_LINE;

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
    const intent = ReceiveMoneyIntents.ADD_RECEIVE_MONEY_LINE;

    this.store.dispatch({
      intent,
      line: partialLine,
    });

    this.getCalculatedTotals();
  }

  deleteReceiveMoneyLine = (index) => {
    const intent = ReceiveMoneyIntents.DELETE_RECEIVE_MONEY_LINE;

    this.store.dispatch({
      intent,
      index,
    });

    this.getCalculatedTotals();
  }

  getCalculatedTotals = () => {
    const intent = ReceiveMoneyIntents.GET_CALCULATED_TOTALS;

    const onSuccess = (totals) => {
      this.store.dispatch({
        intent,
        totals,
      });
    };

    const onFailure = error => this.displayAlert(error.message);

    this.integration.write({
      intent,
      urlParams: { businessId: this.businessId },
      content: getCalculatedTotalsPayload(this.store.state),
      onSuccess,
      onFailure,
    });
  }

  formatReceiveMoneyLine = (index) => {
    const intent = ReceiveMoneyIntents.FORMAT_RECEIVE_MONEY_LINE;

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
    const intent = ReceiveMoneyIntents.SET_SUBMITTING_STATE;

    this.store.dispatch({
      intent,
      isSubmitting,
    });
  }

  displayAlert = (errorMessage) => {
    this.store.dispatch({
      intent: ReceiveMoneyIntents.SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  }

  openCancelModal = () => {
    const intent = ReceiveMoneyIntents.OPEN_MODAL;
    this.store.dispatch({
      intent,
      modalType: 'cancel',
    });
  };

  openDeleteModal = () => {
    const intent = ReceiveMoneyIntents.OPEN_MODAL;

    this.store.dispatch({
      intent,
      modalType: 'delete',
    });
  };

  closeModal = () => {
    const intent = ReceiveMoneyIntents.CLOSE_MODAL;

    this.store.dispatch({ intent });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setTotalsLoadingState = (isTotalsLoading) => {
    const intent = ReceiveMoneyIntents.SET_TOTALS_LOADING_STATE;

    this.store.dispatch({
      intent,
      isTotalsLoading,
    });
  }

  dismissAlert = () => {
    this.store.dispatch({
      intent: ReceiveMoneyIntents.SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  redirectToReceiveMoneyList= () => {
    window.location.href = `/#/${this.businessId}/receiveMoney/`;
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
        onCloseModal={this.closeModal}
        onDeleteModal={this.deleteReceiveMoney}
        onCancelModal={this.redirectToReceiveMoneyList}
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
      intent: ReceiveMoneyIntents.SET_LOADING_STATE,
      isLoading,
    });
  }

  run(context) {
    this.businessId = context.businessId;
    this.receiveMoneyId = context.receiveMoneyId;
    this.isCreating = context.receiveMoneyId === 'new';
    this.resetState();
    this.render();
    this.setLoadingState(true);
    this.loadReceiveMoney();
  }

  resetState() {
    const intent = SystemIntents.RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
