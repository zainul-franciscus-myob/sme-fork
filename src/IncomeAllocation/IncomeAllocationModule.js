import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_INCOME_ALLOCATION_LINE,
  DELETE_INCOME_ALLOCATION_LINE,
  FORMAT_INCOME_ALLOCATION_LINE,
  LOAD_INCOME_ALLOCATION,
  SAVE_INCOME_ALLOCATION,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_ENTITY_TYPE,
  UPDATE_INCOME_ALLOCATION_LINE,
} from './IncomeAllocationIntents';
import { RESET_STATE } from '../SystemIntents';
import { getIncomeAllocationSavePayload } from './IncomeAllocationSelectors';
import IncomeAllocationView from './components/IncomeAllocationView';
import Store from '../store/Store';
import incomeAllocationReducer from './IncomeAllocationReducer';

export default class IncomeAllocationModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(incomeAllocationReducer);
    this.setRootView = setRootView;
    this.businessId = '';
  }

  loadIncomeAllocation = () => {
    const intent = LOAD_INCOME_ALLOCATION;
    const urlParams = { businessId: this.businessId };
    this.setLoadingState(true);

    const onSuccess = ({
      incomeAllocation, newLine, accounts, entityTypes,
    }) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        incomeAllocation,
        accounts,
        newLine,
        entityTypes,
      });
    };

    const onFailure = () => {
      console.log('Failed to load income allocation');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;

    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  updateEntityType = (value) => {
    const intent = UPDATE_ENTITY_TYPE;

    this.store.dispatch({
      intent,
      entityType: value,
    });
  }

  updateIncomeAllocationLine = (lineIndex, lineKey, lineValue) => {
    const intent = UPDATE_INCOME_ALLOCATION_LINE;

    this.store.dispatch({
      intent,
      lineIndex,
      lineKey,
      lineValue,
    });
  }

  addIncomeAllocationLine = (partialLine) => {
    const intent = ADD_INCOME_ALLOCATION_LINE;

    this.store.dispatch({
      intent,
      line: partialLine,
    });
  }

  deleteIncomeAllocationLine = (index) => {
    const intent = DELETE_INCOME_ALLOCATION_LINE;

    this.store.dispatch({
      intent,
      index,
    });
  }

  formatIncomeAllocationLine = (index) => {
    const intent = FORMAT_INCOME_ALLOCATION_LINE;

    this.store.dispatch({
      intent,
      index,
    });
  }

  setSubmittingState = (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;

    this.store.dispatch({
      intent,
      isSubmitting,
    });
  }

  setAlert = ({ message, type }) => {
    const intent = SET_ALERT;

    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  }

  dismissAlert = () => {
    const intent = SET_ALERT;

    this.store.dispatch({
      intent,
      alert: undefined,
    });
  }

  saveIncomeAllocation = () => {
    const intent = SAVE_INCOME_ALLOCATION;

    const state = this.store.getState();
    const content = getIncomeAllocationSavePayload(state);
    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = (response) => {
      this.setAlert({
        message: response.message,
        type: 'success',
      });

      this.setSubmittingState(false);
      this.loadIncomeAllocation();
    };

    const onFailure = (error) => {
      this.setAlert({
        message: error.message,
        type: 'danger',
      });
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

  render = () => {
    const incomeAllocationView = (
      <IncomeAllocationView
        onEntityTypeChange={this.updateEntityType}
        onAddRow={this.addIncomeAllocationLine}
        onRemoveRow={this.deleteIncomeAllocationLine}
        onUpdateRow={this.updateIncomeAllocationLine}
        onRowInputBlur={this.formatIncomeAllocationLine}
        onSaveButtonClick={this.saveIncomeAllocation}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {incomeAllocationView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  run = (context) => {
    this.businessId = context.businessId;
    this.render();
    this.loadIncomeAllocation();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }
}
