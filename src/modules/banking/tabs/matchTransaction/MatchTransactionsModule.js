import { Provider } from 'react-redux';
import React from 'react';

import {
  getIsMatchTransactionsEdited,
  getIsMatchTransactionsTabOpen,
  getMatchTransactionContactComboboxContext,
  getMatchTransactionFlipSortOrder,
  getMatchTransactionOrderBy,
  getShowType,
} from './matchTransactionSelectors';
import ContactComboboxModule from '../../../contact/contactCombobox/ContactComboboxModule';
import MatchTransactionBody from './components/MatchTransactionBody';
import MatchTransactionShowType from '../../types/MatchTransactionShowType';
import Store from '../../../../store/Store';
import createMatchTransactionDispatcher from './createMatchTransactionDispatcher';
import createMatchTransactionIntegrator from './createMatchTransactionIntegrator';
import debounce from '../../../../common/debounce/debounce';
import matchTransactionReducer from './matchTransactionReducer';

export default class MatchTransactionsModule {
  constructor({ integration, setAlert }) {
    this.store = new Store(matchTransactionReducer);
    this.integration = integration;
    this.setAlert = setAlert;
    this.dispatcher = createMatchTransactionDispatcher(this.store);
    this.integrator = createMatchTransactionIntegrator(this.store, integration);

    this.contactComboboxModule = new ContactComboboxModule({
      integration,
    });
  }

  loadMatchTransactions = (onSuccess, onFailure) => {
    const onLoadSuccess = (payload) => {
      const state = this.store.getState();

      if (getIsMatchTransactionsTabOpen(state)) {
        onSuccess();
        this.dispatcher.loadMatchTransactions(payload);
        this.loadContactCombobox();
      }
    };

    this.integrator.loadMatchTransactions({
      onSuccess: onLoadSuccess,
      onFailure,
    });
  };

  sortOrFilterMatchTransaction = () => {
    const state = this.store.getState();
    const showType = getShowType(state);

    if (showType === MatchTransactionShowType.SELECTED) {
      this.dispatcher.showSelectedMatchTransactions();
    } else {
      const onSuccess = (payload) => {
        const updatedState = this.store.getState();
        if (getIsMatchTransactionsTabOpen(updatedState)) {
          this.dispatcher.setMatchTransactionLoadingState(false);
          this.dispatcher.sortAndFilterMatchTransactions(payload);
        }
      };

      const onSortFailure = (error) => {
        this.dispatcher.setMatchTransactionLoadingState(false);
        this.setAlert({
          type: 'failure',
          message: error.message,
        });
      };

      this.dispatcher.setMatchTransactionLoadingState(true);
      this.integrator.sortOrFilterMatchTransaction({
        onSuccess,
        onFailure: onSortFailure,
      });
    }
  };

  saveMatchTransaction = (onSuccess, onFailure) => {
    this.integrator.saveMatchTransaction({
      onSuccess,
      onFailure,
    });
  };

  unmatchTransaction = (onSuccess, onFailure) => {
    this.integrator.unmatchTransaction({
      onSuccess,
      onFailure,
    });
  };

  sortMatchTransaction = (orderBy) => {
    this.updateMatchTransactionSortOrder(orderBy);
    this.sortOrFilterMatchTransaction();
  };

  updateMatchTransactionSortOrder = (orderBy) => {
    const state = this.store.getState();

    const newSortOrder =
      orderBy === getMatchTransactionOrderBy(state)
        ? getMatchTransactionFlipSortOrder(state)
        : 'asc';

    this.dispatcher.updateMatchTransactionSortOrder(orderBy, newSortOrder);
  };

  updateMatchTransactionOptions = ({ key, value }) => {
    this.dispatcher.updateMatchTransactionOptions({ key, value });

    if (key === 'keywords') {
      debounce(this.sortOrFilterMatchTransaction)();
    } else {
      this.sortOrFilterMatchTransaction();
    }
  };

  resetMatchTransactionOptions = () => {
    this.dispatcher.resetMatchTransactionOptions();
    this.sortOrFilterMatchTransaction();
  };

  loadContactCombobox = () => {
    const state = this.store.getState();
    const context = getMatchTransactionContactComboboxContext(state);
    this.contactComboboxModule.run(context);
  };

  render = (props) => {
    const renderContactCombobox = (contactComboboxProps) => {
      return this.contactComboboxModule
        ? this.contactComboboxModule.render(contactComboboxProps)
        : null;
    };

    return (
      <Provider store={this.store}>
        <MatchTransactionBody
          renderContactCombobox={renderContactCombobox}
          onUpdateMatchTransactionOptions={this.updateMatchTransactionOptions}
          onSortMatchTransactions={this.sortMatchTransaction}
          onResetMatchTransactionOptions={this.resetMatchTransactionOptions}
          onUpdateMatchTransactionSelection={
            this.dispatcher.updateMatchTransactionSelection
          }
          onUpdateSelectedTransactionDetails={
            this.dispatcher.updateSelectedTransactionDetails
          }
          onToggleSelectAllState={this.dispatcher.toggleSelectAllState}
          onAddAdjustment={this.dispatcher.addMatchTransactionAdjustment}
          onUpdateAdjustment={this.dispatcher.updateMatchTransactionAdjustment}
          onRemoveAdjustment={this.dispatcher.removeMatchTransactionAdjustment}
          onExpandAdjustmentSection={this.dispatcher.expandAdjustmentSection}
          {...props}
        />
      </Provider>
    );
  };

  setLoadingSingleAccountState = (isLoadingAccount) =>
    this.dispatcher.setLoadingSingleAccountState(isLoadingAccount);

  setJobLoadingState = (isJobLoading) =>
    this.dispatcher.setJobLoadingState(isJobLoading);

  loadAccountAfterCreate = (payload) =>
    this.dispatcher.loadAccountAfterCreate(payload);

  loadJobAfterCreate = (id, job) => this.dispatcher.loadJobAfterCreate(id, job);

  getIsEdited = () => getIsMatchTransactionsEdited(this.store.getState());

  resetState = () => {
    this.dispatcher.resetMatchTransactionState();
    this.contactComboboxModule.resetState();
  };

  run(context) {
    this.dispatcher.setInitialMatchTransactionState(context);
  }
}
