import { Provider } from 'react-redux';
import React from 'react';

import { getItemModalContext } from './ItemComboboxSelectors';
import AlertType from '../../../common/types/AlertType';
import ItemComboboxView from './components/ItemComboboxView';
import ItemModalModule from '../inventoryModal/InventoryModalModule';
import Store from '../../../store/Store';
import createItemComboboxDispatcher from './createItemComboboxDispatcher';
import createItemComboboxIntegrator from './createItemComboboxIntegrator';
import itemComboboxReducer from './itemComboboxReducer';

export default class ItemComboboxModule {
  constructor({ integration, onAlert = () => {} }) {
    this.onAlert = onAlert;

    this.store = new Store(itemComboboxReducer);
    this.integrator = createItemComboboxIntegrator({
      store: this.store,
      integration,
    });
    this.dispatcher = createItemComboboxDispatcher({ store: this.store });

    this.itemModalModule = new ItemModalModule({ integration });
  }

  resetState = () => {
    this.itemModalModule.resetState();
    this.dispatcher.resetState();
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.loadItemOptions();
  };

  load = (itemIds) => {
    this.loadItemOptionsByIds(itemIds);
  };

  loadItemOptions = () => {
    this.dispatcher.setItemOptionsLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setItemOptionsLoadingState(false);
      this.dispatcher.loadItemOptions(payload);
    };

    const onFailure = () => {
      this.dispatcher.setItemOptionsLoadingState(false);
    };

    this.integrator.loadItemOptions({ onSuccess, onFailure });
  };

  loadItemOptionsByIds = (ids) => {
    this.dispatcher.setItemLoadingState(true);

    const onSuccess = (itemOptions) => {
      this.dispatcher.setItemLoadingState(false);
      this.dispatcher.loadItemOptionsByIds(itemOptions);
    };

    const onFailure = () => {
      this.dispatcher.setItemLoadingState(false);
    };

    this.integrator.loadItemOptionsByIds({ ids, onSuccess, onFailure });
  };

  searchItem = ({
    keywords,
    onSuccess: onSearchItemSuccess,
    onFailure: onSearchItemFailure,
  }) => {
    const onSuccess = ({ itemOptions }) => {
      onSearchItemSuccess(itemOptions);
    };

    const onFailure = () => {
      onSearchItemFailure();
    };

    this.integrator.searchItem({ keywords, onSuccess, onFailure });
  };

  loadItemOptionById = ({ itemId, onSuccess: next = () => {} }) => {
    this.dispatcher.setItemLoadingState(true);

    const onSuccess = (payload) => {
      const newItemOption = payload[0];

      this.dispatcher.setItemLoadingState(false);
      this.dispatcher.loadItemOptionById(newItemOption);

      next(newItemOption);
    };

    const onFailure = () => {
      this.dispatcher.setItemLoadingState(false);
    };

    this.integrator.loadItemOptionById({ itemId, onSuccess, onFailure });
  };

  loadItemAfterCreate = ({ itemId, message }, onChange) => {
    this.itemModalModule.resetState();
    this.onAlert({ type: AlertType.SUCCESS, message });

    this.loadItemOptionById({ itemId, onSuccess: onChange });
  };

  openItemModal = (onChange) => {
    const state = this.store.getState();
    const context = getItemModalContext(state);

    this.itemModalModule.run({
      context,
      onLoadFailure: (message) =>
        this.onAlert({ type: AlertType.DANGER, message }),
      onSaveSuccess: (payload) => this.loadItemAfterCreate(payload, onChange),
    });
  };

  isCreateItemModalOpened = () => {
    this.itemModalModule.isOpened();
  };

  createItem = () => {
    this.itemModalModule.save();
  };

  handleOnChange = (item, onChange) => {
    if (item) {
      this.dispatcher.updateItemOptions(item);
    }
    onChange(item);
  };

  render({ onChange = () => {}, ...otherProps }) {
    this.itemModal = this.itemModalModule.render();

    return (
      <Provider store={this.store}>
        <ItemComboboxView
          itemModal={this.itemModal}
          onLoadMore={this.loadItemOptions}
          onSearch={this.searchItem}
          onAddNew={() => this.openItemModal(onChange)}
          onChange={(item) => this.handleOnChange(item, onChange)}
          {...otherProps}
        />
      </Provider>
    );
  }
}
