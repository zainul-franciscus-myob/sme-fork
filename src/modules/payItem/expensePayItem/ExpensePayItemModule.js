import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_ALLOCATED_EMPLOYEE,
  ADD_EXEMPTION_PAY_ITEM,
  CHANGE_EXPENSE_PAY_ITEM_INPUT,
  CREATE_EXPENSE_PAY_ITEM,
  DELETE_EXPENSE_PAY_ITEM,
  FORMAT_EXPENSE_PAY_ITEM_AMOUNT_INPUT,
  LOAD_EXPENSE_PAY_ITEM,
  LOAD_NEW_EXPENSE_PAY_ITEM,
  REMOVE_ALLOCATED_EMPLOYEE,
  REMOVE_EXEMPTION_PAY_ITEM,
  SET_ALERT_MESSAGE,
  SET_IS_LOADING,
  SET_IS_PAGE_EDITED,
  SET_IS_SUBMITTING,
  SET_MODAL_TYPE,
  UPDATE_EXPENSE_PAY_ITEM,
} from './ExpensePayItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_EXPENSE_PAY_ITEM,
  SUCCESSFULLY_SAVED_EXPENSE_PAY_ITEM,
} from './ExpensePayItemMessageTypes';
import {
  getBusinessId,
  getCreateExpensePayItemUrlParams,
  getIsCreating,
  getRegion,
  getSaveExpensePayItemContent,
  getUpdateExpensePayItemUrlParams,
} from './ExpensePayItemSelectors';
import ExpensePayItemView from './components/ExpensePayItemView';
import ModalType from './ModalType';
import Store from '../../../store/Store';
import expensePayItemReducer from './expensePayItemReducer';

class ExpensePayItemModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.store = new Store(expensePayItemReducer);
  }

  redirectToExpensePayItemsList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/payItem?tab=expenses`;
  }

  loadNewExpensePayItem = () => {
    const state = this.store.getState();
    const intent = LOAD_NEW_EXPENSE_PAY_ITEM;

    const urlParams = getCreateExpensePayItemUrlParams(state);

    const onSuccess = (expensePayItem) => {
      this.store.dispatch({
        intent,
        expensePayItem,
      });

      this.setIsLoading(false);
    };

    const onFailure = () => {
      console.error('Failed to load an expense pay item');
    };

    this.setIsLoading(true);

    this.integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  }

  loadExistingExpensePayItem = () => {
    const state = this.store.getState();
    const intent = LOAD_EXPENSE_PAY_ITEM;

    const urlParams = getUpdateExpensePayItemUrlParams(state);

    const onSuccess = (expensePayItem) => {
      this.store.dispatch({
        intent,
        expensePayItem,
      });

      this.setIsLoading(false);
    };

    const onFailure = () => {
      console.error('Failed to load an expense pay item');
    };

    this.setIsLoading(true);

    this.integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  }

  loadExpensePayItem = () => {
    const state = this.store.getState();

    const isCreating = getIsCreating(state);

    if (isCreating) {
      this.loadNewExpensePayItem();
    } else {
      this.loadExistingExpensePayItem();
    }
  }

  createExpensePayItem = () => {
    const state = this.store.getState();

    const urlParams = getCreateExpensePayItemUrlParams(state);
    const content = getSaveExpensePayItemContent(state);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_EXPENSE_PAY_ITEM,
        content: message,
      });

      this.redirectToExpensePayItemsList();
    };

    const onFailure = ({ message }) => {
      this.setAlertMessage(message);
      this.setIsSubmitting(false);
    };

    this.setIsSubmitting(true);

    this.integration.write({
      intent: CREATE_EXPENSE_PAY_ITEM,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  updateExpensePayItem = () => {
    const state = this.store.getState();

    const urlParams = getUpdateExpensePayItemUrlParams(state);
    const content = getSaveExpensePayItemContent(state);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_EXPENSE_PAY_ITEM,
        content: message,
      });

      this.redirectToExpensePayItemsList();
    };

    const onFailure = ({ message }) => {
      this.setAlertMessage(message);
      this.setIsSubmitting(false);
    };

    this.setIsSubmitting(true);

    this.integration.write({
      intent: UPDATE_EXPENSE_PAY_ITEM,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  saveExpensePayItem = () => {
    const state = this.store.getState();

    const isCreating = getIsCreating(state);

    if (isCreating) {
      this.createExpensePayItem();
    } else {
      this.updateExpensePayItem();
    }
  }

  deleteExpensePayItem = () => {
    const state = this.store.getState();

    const urlParams = getUpdateExpensePayItemUrlParams(state);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_EXPENSE_PAY_ITEM,
        content: message,
      });
      this.redirectToExpensePayItemsList();
    };

    const onFailure = ({ message }) => {
      this.dismissModal();
      this.setAlertMessage(message);
      this.setIsSubmitting(false);
    };

    this.setIsSubmitting(true);
    this.integration.write({
      intent: DELETE_EXPENSE_PAY_ITEM,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  changeExpensePayItemInput = ({ key, value }) => {
    this.store.dispatch({
      intent: CHANGE_EXPENSE_PAY_ITEM_INPUT,
      key,
      value,
    });

    this.setIsPageEdited(true);
  }

  formatExpensePayItemAmountInput = () => {
    this.store.dispatch({
      intent: FORMAT_EXPENSE_PAY_ITEM_AMOUNT_INPUT,
    });
  }

  addAllocatedEmployee = ({ value }) => {
    this.store.dispatch({
      intent: ADD_ALLOCATED_EMPLOYEE,
      id: value,
    });

    this.setIsPageEdited(true);
  }

  removeAllocatedEmployee = (id) => {
    this.store.dispatch({
      intent: REMOVE_ALLOCATED_EMPLOYEE,
      id,
    });

    this.setIsPageEdited(true);
  }

  addExemptionPayItem = ({ value }) => {
    this.store.dispatch({
      intent: ADD_EXEMPTION_PAY_ITEM,
      id: value,
    });

    this.setIsPageEdited(true);
  }

  removeExemptionPayItem = (id) => {
    this.store.dispatch({
      intent: REMOVE_EXEMPTION_PAY_ITEM,
      id,
    });

    this.setIsPageEdited(true);
  }

  openDeleteModal = () => {
    this.setModalType(ModalType.DELETE);
  }

  openCancelModal = () => {
    this.setModalType(ModalType.CANCEL);
  }

  cancelExpensePayItem = () => {
    this.redirectToExpensePayItemsList();
  }

  dismissAlert = () => {
    this.setAlertMessage('');
  }

  dismissModal = () => {
    this.setModalType('');
  }

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  }

  setIsSubmitting = (isSubmitting) => {
    this.store.dispatch({
      intent: SET_IS_SUBMITTING,
      isSubmitting,
    });
  }

  setIsPageEdited = (isPageEdited) => {
    this.store.dispatch({
      intent: SET_IS_PAGE_EDITED,
      isPageEdited,
    });
  }

  setModalType = (modalType) => {
    this.store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType,
    });
  }

  setAlertMessage = (alertMessage) => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage,
    });
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadExpensePayItem();
  }

  render = () => {
    const view = (
      <Provider store={this.store}>
        <ExpensePayItemView
          onDismissAlert={this.dismissAlert}
          onDismissModal={this.dismissModal}
          onChangeExpensePayItemInput={this.changeExpensePayItemInput}
          onBlurExpensePayItemAmountInput={this.formatExpensePayItemAmountInput}
          onAddAllocatedEmployee={this.addAllocatedEmployee}
          onRemoveAllocatedEmployee={this.removeAllocatedEmployee}
          onAddExemptionPayItem={this.addExemptionPayItem}
          onRemoveExemptionPayItem={this.removeExemptionPayItem}
          onConfirmDeleteButtonClick={this.deleteExpensePayItem}
          onConfirmCancelButtonClick={this.cancelExpensePayItem}
          onSaveButtonClick={this.saveExpensePayItem}
          onDeleteButtonClick={this.openDeleteModal}
          onCancelButtonClick={this.openCancelModal}
        />
      </Provider>
    );

    this.setRootView(view);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}

export default ExpensePayItemModule;
