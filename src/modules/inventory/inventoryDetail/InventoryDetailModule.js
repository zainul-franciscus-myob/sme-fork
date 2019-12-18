import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_INVENTORY_DETAIL,
  DELETE_INVENTORY_DETAIL,
  LOAD_INVENTORY_DETAIL,
  LOAD_NEW_INVENTORY_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_ENABLE_FOR_BUYING,
  SET_ENABLE_FOR_SELLING,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BUYING_DETAILS,
  UPDATE_INVENTORY_DETAIL,
  UPDATE_ITEM_DETAILS,
  UPDATE_SELLING_DETAILS,
} from '../InventoryIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_ITEM, SUCCESSFULLY_SAVED_ITEM } from '../InventoryMessageTypes';
import {
  getBusinessId, getIsCreating, getItem, getRegion, isPageEdited,
} from './inventoryDetailSelectors';
import InventoryDetailView from './components/InventoryDetailView';
import Store from '../../../store/Store';
import inventoryDetailReducer from './inventoryDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class InventoryDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.store = new Store(inventoryDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  saveItem = () => {
    const isCreating = getIsCreating(this.store.getState());

    if (isCreating) {
      this.createInventoryDetail();
    } else {
      this.updateInventoryDetail();
    }
  }

  render = () => {
    const inventoryDetailView = (
      <InventoryDetailView
        onEnableForSellingChange={this.setEnableForSellingState}
        onEnableForBuyingChange={this.setEnableForBuyingState}
        onItemDetailsChange={this.updateItemDetails}
        onSellingDetailsChange={this.updateSellingDetails}
        onBuyingDetailsChange={this.updateBuyingDetails}
        onSaveButtonClick={this.saveItem}
        onDeleteButtonClick={this.openDeleteModal}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.closeModal}
        onDeleteModal={this.deleteInventoryDetail}
        onCancelModal={this.redirectToInventoryList}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {inventoryDetailView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  };

  displayAlert = (errorMessage) => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  }

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  loadInventoryDetail = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? LOAD_NEW_INVENTORY_DETAIL
      : LOAD_INVENTORY_DETAIL;

    this.setLoadingState(true);

    const urlParams = {
      businessId: getBusinessId(state),
      itemId: this.itemId,
    };

    const onSuccess = (response) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = () => {
      console.log('Failed to load item');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  setEnableForSellingState = ({ value }) => {
    this.store.dispatch({
      intent: SET_ENABLE_FOR_SELLING,
      isEnableForSelling: value,
    });
  }

  setEnableForBuyingState = ({ value }) => {
    this.store.dispatch({
      intent: SET_ENABLE_FOR_BUYING,
      isEnableForBuying: value,
    });
  }

  updateItemDetails = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_ITEM_DETAILS,
      key,
      value,
    });
  }

  updateSellingDetails = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_SELLING_DETAILS,
      key,
      value,
    });
  }

  updateBuyingDetails = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_BUYING_DETAILS,
      key,
      value,
    });
  }

  updateInventoryDetail = () => {
    const intent = UPDATE_INVENTORY_DETAIL;
    const state = this.store.getState();
    const content = getItem(state);

    const urlParams = {
      businessId: getBusinessId(state),
      itemId: this.itemId,
    };
    this.saveInventoryDetail(intent, content, urlParams);
  }

  createInventoryDetail = () => {
    const intent = CREATE_INVENTORY_DETAIL;
    const state = this.store.getState();
    const content = getItem(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };
    this.saveInventoryDetail(intent, content, urlParams);
  }

  setSubmittingState = (isSubmitting) => {
    this.store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  }

  redirectToInventoryList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/inventory`;
  };

  saveInventoryDetail(intent, content, urlParams) {
    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_ITEM,
        content: message,
      });
      this.redirectToInventoryList();
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
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }

  deleteInventoryDetail = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_ITEM,
        content: message,
      });
      this.redirectToInventoryList();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent: DELETE_INVENTORY_DETAIL,
      urlParams: {
        businessId: getBusinessId(this.store.getState()),
        itemId: this.itemId,
      },
      onSuccess,
      onFailure,
    });
  }

  openCancelModal = () => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.store.dispatch({
        intent: OPEN_MODAL,
        modalType: 'cancel',
      });
    } else {
      this.redirectToInventoryList();
    }
  };

  openDeleteModal = () => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modalType: 'delete',
    });
  };

  closeModal = () => {
    this.store.dispatch({ intent: CLOSE_MODAL });
  };

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  handlers = {
    SAVE_ACTION: this.saveItem,
  };

  run(context) {
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.itemId = context.itemId;
    this.render();
    this.loadInventoryDetail();
  }
}
