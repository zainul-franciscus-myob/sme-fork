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
  UPDATE_ENTITY_TYPE,
  UPDATE_INCOME_ALLOCATION_LINE,
} from './IncomeAllocationIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  getBusinessId,
  getIncomeAllocationSavePayload,
  getLoadingState,
} from './IncomeAllocationSelectors';
import IncomeAllocationView from './components/IncomeAllocationView';
import LoadingState from '../../components/PageView/LoadingState';
import Store from '../../store/Store';
import incomeAllocationReducer from './IncomeAllocationReducer';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class IncomeAllocationModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(incomeAllocationReducer);
    this.setRootView = setRootView;
  }

  loadIncomeAllocation = () => {
    const intent = LOAD_INCOME_ALLOCATION;
    const urlParams = { businessId: getBusinessId(this.store.getState()) };
    this.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({
      incomeAllocation,
      newLine,
      accounts,
      entityTypes,
    }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        incomeAllocation,
        accounts,
        newLine,
        entityTypes,
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

  setLoadingState = (loadingState) => {
    const intent = SET_LOADING_STATE;

    this.store.dispatch({
      intent,
      loadingState,
    });
  };

  updateEntityType = (value) => {
    const intent = UPDATE_ENTITY_TYPE;

    this.store.dispatch({
      intent,
      entityType: value,
    });
  };

  updateIncomeAllocationLine = (lineIndex, lineKey, lineValue) => {
    const intent = UPDATE_INCOME_ALLOCATION_LINE;

    this.store.dispatch({
      intent,
      lineIndex,
      lineKey,
      lineValue,
    });
  };

  addIncomeAllocationLine = (partialLine) => {
    const intent = ADD_INCOME_ALLOCATION_LINE;

    this.store.dispatch({
      intent,
      line: partialLine,
    });
  };

  deleteIncomeAllocationLine = (index) => {
    const intent = DELETE_INCOME_ALLOCATION_LINE;

    this.store.dispatch({
      intent,
      index,
    });
  };

  formatIncomeAllocationLine = (index) => {
    const intent = FORMAT_INCOME_ALLOCATION_LINE;

    this.store.dispatch({
      intent,
      index,
    });
  };

  setAlert = ({ message, type }) => {
    const intent = SET_ALERT;

    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  };

  dismissAlert = () => {
    const intent = SET_ALERT;

    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  saveIncomeAllocation = () => {
    const state = this.store.getState();
    if (getLoadingState(state) === LoadingState.LOADING) return;

    const intent = SAVE_INCOME_ALLOCATION;

    const content = getIncomeAllocationSavePayload(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.setAlert({
        message: response.message,
        type: 'success',
      });

      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.loadIncomeAllocation();
    };

    const onFailure = (error) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);

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

    this.setLoadingState(LoadingState.LOADING);
  };

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
      <Provider store={this.store}>{incomeAllocationView}</Provider>
    );

    this.setRootView(wrappedView);
  };

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  handlers = {
    SAVE_ACTION: this.saveIncomeAllocation,
  };

  run = (context) => {
    this.setInitialState(context);
    this.render();
    setupHotKeys(keyMap, this.handlers);
    this.loadIncomeAllocation();
  };
}
