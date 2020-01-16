import { Provider } from 'react-redux';
import React from 'react';

import { getIsLoading, getIsOpen } from './selectors/InventoryModalSelectors';
import InventoryModalView from './components/InventoryModalView';
import Store from '../../../store/Store';
import createInventoryModalDispatcher from './createInventoryModalDispatcher';
import createInventoryModalIntegrator from './createInventoryModalIntegrator';
import inventoryModalReducer from './inventoryModalReducer';

export default class InventoryModalModule {
  constructor({ integration }) {
    this.store = new Store(inventoryModalReducer);
    this.dispatcher = createInventoryModalDispatcher(this.store);
    this.integrator = createInventoryModalIntegrator(this.store, integration);
  }

  isOpened = () => getIsOpen(this.store.getState());

  isLoading = () => getIsLoading(this.store.getState());

  loadItem = () => {
    const onSuccess = (response) => {
      this.dispatcher.loadItem(response);
    };

    const onFailure = (response) => {
      this.onLoadFailure(response);
    };

    this.integrator.loadItem({ onSuccess, onFailure });
  }

  save = () => {
    if (this.isLoading()) return;

    const onSuccess = (response) => {
      this.dispatcher.stopLoading();
      this.onSaveSuccess(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopLoading();
      this.dispatcher.openDangerAlert({ message });
    };

    this.dispatcher.startLoading();
    this.integrator.saveItem({ onSuccess, onFailure });
  }

  run = ({ context, onSaveSuccess, onLoadFailure }) => {
    this.onSaveSuccess = onSaveSuccess;
    this.onLoadFailure = onLoadFailure;
    this.dispatcher.setInitialState(context);
    this.dispatcher.open();
    this.loadItem();
  }

  resetState = () => {
    this.dispatcher.resetState();
  }

  render() {
    return (
      <Provider store={this.store}>
        <InventoryModalView
          onUpdateItemOption={this.dispatcher.updateItemOption}
          onUpdateSellingOption={this.dispatcher.updateSellingOption}
          onUpdateBuyingOption={this.dispatcher.updateBuyingOption}
          onClose={this.dispatcher.resetState}
          onSave={this.save}
          onDismissAlert={this.dispatcher.closeAlert}
          onOpenBuyingDetails={this.dispatcher.openBuyingDetails}
          onOpenSellingDetails={this.dispatcher.openSellingDetails}
          onUpdateIsBuying={this.dispatcher.updateIsBuying}
          onUpdateIsSelling={this.dispatcher.updateIsSelling}
        />
      </Provider>
    );
  }
}
