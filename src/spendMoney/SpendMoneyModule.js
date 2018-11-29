import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import { SUCCESSFULLY_CREATED_ENTRY } from './spendMoneyMessageTypes';
import {
  getHeaderOptions,
  getNewLineData,
  getSpendMoneyForCreatePayload,
  getTotals,
} from './spendMoneySelectors';
import CancelModal from './components/SpendMoneyCancelModal';
import SpendMoneyAlert from './components/SpendMoneyAlert';
import SpendMoneyIntents from './SpendMoneyIntents';
import SpendMoneyView from './components/SpendMoneyView';
import Store from '../store/Store';
import SystemIntents from '../SystemIntents';
import spendMoneyReducer from './spendMoneyReducer';

export default class SpendMoneyModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.store = new Store(spendMoneyReducer);
    this.setRootView = setRootView;
    this.businessId = '';
    this.pushMessage = pushMessage;
  }

  loadSpendMoney = () => {
    const intent = SpendMoneyIntents.LOAD_NEW_SPEND_MONEY;

    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({ spendMoney, newLine }) => {
      this.setLoadingState(false);
      this.store.publish({
        intent,
        spendMoney,
        newLine,
        isLoading: false,
      });
    };

    const onFailure = () => {
      console.log('Failed to load spend money details');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  updateHeaderOptions = ({ key, value }) => {
    const intent = SpendMoneyIntents.UPDATE_SPEND_MONEY_HEADER;

    this.store.publish({
      intent,
      key,
      value,
    });
  };

  displayAlert = (errorMessage) => {
    this.store.publish({
      intent: SpendMoneyIntents.SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  }

  createSpendMoneyEntry = () => {
    const intent = SpendMoneyIntents.CREATE_SPEND_MONEY;
    const content = getSpendMoneyForCreatePayload(this.store.state);
    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = () => {
      this.pushMessage({
        type: SUCCESSFULLY_CREATED_ENTRY,
        content: 'Success! Your spend money was saved.',
      });
      this.redirectToGeneralJournalList();
    };

    const onFailure = (error) => {
      this.displayAlert(error.message);
    };


    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  openCancelModal = () => {
    const intent = SpendMoneyIntents.OPEN_MODAL;

    this.store.publish({
      intent,
      modalType: 'cancel',
    });
  };

  openDeleteModal = () => {
    const intent = SpendMoneyIntents.OPEN_MODAL;

    this.store.publish({
      intent,
      modalType: 'delete',
    });
  };

  closeModal = () => {
    const intent = SpendMoneyIntents.CLOSE_MODAL;

    this.store.publish({ intent });
  };

  redirectToGeneralJournalList = () => {
    window.location.href = `/#/${this.businessId}/features`;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  updateSpendMoneyLine = (lineIndex, lineKey, lineValue) => {
    const intent = SpendMoneyIntents.UPDATE_SPEND_MONEY_LINE;

    this.store.publish({
      intent,
      lineIndex,
      lineKey,
      lineValue,
    });
  }

  addSpendMoneyLine = (partialLine) => {
    const intent = SpendMoneyIntents.ADD_SPEND_MONEY_LINE;

    this.store.publish({
      intent,
      line: partialLine,
    });
  }

  deleteJournalLine = (index) => {
    const intent = SpendMoneyIntents.DELETE_SPEND_MONEY_LINE;

    this.store.publish({
      intent,
      index,
    });
  }

  formatJournalLine = (index) => {
    const intent = SpendMoneyIntents.FORMAT_SPEND_MONEY_LINE;

    this.store.publish({
      intent,
      index,
    });
  }

  dismissAlert = () => {
    this.store.publish({
      intent: SpendMoneyIntents.SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  render = (state) => {
    let modal;
    if (state.modalType === 'cancel') {
      modal = (
        <CancelModal
          onCancel={this.closeModal}
          onConfirm={this.redirectToGeneralJournalList}
        />
      );
    }

    const alertComponent = state.alertMessage && (
      <SpendMoneyAlert type="danger" onDismiss={this.dismissAlert}>
        {state.alertMessage}
      </SpendMoneyAlert>
    );

    const spendMoneyView = (
      <SpendMoneyView
        headerOptions={getHeaderOptions(state)}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={this.createSpendMoneyEntry}
        onCancelButtonClick={this.openCancelModal}
        modal={modal}
        alertComponent={alertComponent}
        isCreating={this.isCreating}
        lines={[]}
        newLineData={getNewLineData(state)}
        onUpdateRow={this.updateSpendMoneyLine}
        onAddRow={this.addSpendMoneyLine}
        onRemoveRow={this.deleteJournalLine}
        onRowInputBlur={this.formatJournalLine}
        indexOfLastLine={-1}
        amountTotals={getTotals(state)}
      />
    );
    const view = state.isLoading ? (<Spinner />) : spendMoneyView;
    this.setRootView(view);
  };

  setLoadingState = (isLoading) => {
    this.store.publish({
      intent: SpendMoneyIntents.SET_LOADING_STATE,
      isLoading,
    });
  }

  run(context) {
    this.businessId = context.businessId;
    this.store.subscribe(this.render);
    this.setLoadingState(true);
    this.loadSpendMoney();
  }

  resetState() {
    const intent = SystemIntents.RESET_STATE;
    this.store.publish({
      intent,
    });
  }

  exit() {
    this.resetState();
  }
}
