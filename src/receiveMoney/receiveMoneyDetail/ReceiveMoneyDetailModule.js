import { Provider } from 'react-redux';
import React from 'react';

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
    const intent = ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_DETAIL;

    const urlParams = {
      businessId: this.businessId,
      receiveMoneyId: this.receiveMoneyId,
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

  formatReceiveMoneyLine = (index) => {
    const intent = ReceiveMoneyIntents.FORMAT_RECEIVE_MONEY_LINE;

    this.store.dispatch({
      intent,
      index,
    });
  }

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
    window.location.href = `/#/${this.businessId}/receiveMoney/1`;
  }

  render = () => {
    const receiveMoneyView = (
      <ReceiveMoneyDetailView
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.closeModal}
        onCancelModal={this.redirectToReceiveMoneyList}
        onDismissAlert={this.dismissAlert}
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
