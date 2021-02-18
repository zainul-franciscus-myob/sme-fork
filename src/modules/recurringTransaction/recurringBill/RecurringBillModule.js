import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_RECURRING_TRANSACTION,
  SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
} from '../../../common/types/MessageTypes';
import {
  TaxCalculatorTypes,
  createTaxCalculator,
} from '../../../common/taxCalculator';
import {
  getAccountModalContext,
  getContactComboboxContext,
  getIsLineAmountsTaxInclusive,
  getIsLineEdited,
  getIsLinesEmpty,
  getIsPageEdited,
  getIsTaxInclusive,
  getItemComboboxContext,
  getJobModalContext,
  getLinesForTaxCalculation,
  getModalType,
  getNewLineIndex,
  getRecurringTransactionListUrl,
  getRedirectUrl,
  getShouldShowAbn,
  getSupplierId,
  getTaxCodeOptions,
  getUniqueSelectedItemIds,
  getUniqueSelectedJobIds,
} from './selectors/RecurringBillSelectors';
import { isToggleOn } from '../../../splitToggle';
import AbnStatus from '../../../components/autoFormatter/AbnInput/AbnStatus';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import AlertType from '../../../common/types/AlertType';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import FeatureToggles from '../../../FeatureToggles';
import ItemComboboxModule from '../../inventory/itemCombobox/ItemComboboxModule';
import JobComboboxModule from '../../job/jobCombobox/JobComboboxModule';
import ModalType from './types/ModalType';
import RecurringBillView from './components/RecurringBillView';
import Store from '../../../store/Store';
import createRecurringBillDispatcher from './createRecurringBillDispatcher';
import createRecurringBillIntegrator from './createRecurringBillIntegrator';
import isFeatureEnabled from '../../../common/feature/isFeatureEnabled';
import keyMap from '../../../hotKeys/keyMap';
import recurringBillReducer from './reducer/RecurringBillReducer';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

class RecurringBillModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    navigateTo,
    featureToggles,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.navigateTo = navigateTo;

    this.taxCalculate = createTaxCalculator(TaxCalculatorTypes.bill);

    this.store = new Store(recurringBillReducer);
    this.dispatcher = createRecurringBillDispatcher(this.store);
    this.integrator = createRecurringBillIntegrator(this.store, integration);

    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.contactComboboxModule = new ContactComboboxModule({
      integration,
      featureToggles,
    });
    this.itemComboboxModule = new ItemComboboxModule({
      integration,
      onAlert: this.openAlert,
      featureToggles,
    });
    this.jobComboboxModule = new JobComboboxModule({
      integration,
      onAlert: this.dispatcher.setAlert,
    });

    this.featureToggles = featureToggles;
  }

  loadRecurringBill = () => {
    const onSuccess = (response) => {
      this.dispatcher.stopLoading();
      this.dispatcher.loadRecurringBill(response);

      const state = this.store.getState();
      this.updateContactCombobox();
      this.updateItemCombobox();
      this.updateJobCombobox();

      const shouldShowAbn = getShouldShowAbn(state);
      if (shouldShowAbn) {
        this.loadAbnFromSupplier();
      }
    };

    const onFailure = () => {
      this.dispatcher.failLoading();
    };

    this.dispatcher.startLoading();
    this.integrator.loadRecurringBill({ onSuccess, onFailure });
  };

  createOrUpdateRecurringBill = ({ onSuccess: next }) => {
    this.dispatcher.startSubmitting();

    const onSuccess = (response) => {
      this.dispatcher.stopSubmitting();
      next(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopSubmitting();
      this.dispatcher.openDangerAlert({ message });
    };

    this.integrator.createOrUpdateRecurringBill({ onSuccess, onFailure });
  };

  saveRecurringBill = () => {
    const state = this.store.getState();

    if (getModalType(state)) {
      this.dispatcher.closeModal();
    }

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
        content: message,
      });

      this.redirectToRecurringTransactionList();
    };

    this.createOrUpdateRecurringBill({ onSuccess });
  };

  saveAndRedirect = () => {
    this.dispatcher.closeModal();

    const onSuccess = () => {
      const url = getRedirectUrl(this.store.getState());
      this.navigateTo(url);
    };

    this.createOrUpdateRecurringBill({ onSuccess });
  };

  discardAndRedirect = () => {
    this.dispatcher.closeModal();
    const url = getRedirectUrl(this.store.getState());
    this.navigateTo(url);
  };

  deleteRecurringBill = () => {
    this.dispatcher.closeModal();
    this.dispatcher.startSubmitting();

    const onSuccess = ({ message }) => {
      this.dispatcher.stopSubmitting();
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_RECURRING_TRANSACTION,
        content: message,
      });
      this.redirectToRecurringTransactionList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.stopSubmitting();
      this.dispatcher.openDangerAlert({ message });
    };

    this.integrator.deleteRecurringBill({ onSuccess, onFailure });
  };

  updateBillHeaderOption = ({ key, value }) => {
    this.dispatcher.updateBillHeaderOption({ key, value });

    if (key === 'isTaxInclusive') {
      this.getTaxCalculations({ isSwitchingTaxInclusive: true });
    }
  };

  updateBillSupplierOptions = ({ item }) => {
    this.dispatcher.updateBillSupplierOptions(item);

    if (item) {
      this.loadSupplier();
    }

    const state = this.store.getState();
    if (getShouldShowAbn(state)) {
      this.loadAbnFromSupplier();
    }
  };

  updateBillLayout = ({ value }) => {
    this.dispatcher.updateBillLayout({ value });
    const state = this.store.getState();

    if (!getIsLinesEmpty(state)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

  updateBillLine = ({ index, key, value }) => {
    this.dispatcher.updateBillLine({ index, key, value });

    if (key === 'taxCodeId' || key === 'accountId') {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    } else if (key === 'itemId' && value) {
      this.loadItem({ index, itemId: value });
    }
  };

  addBillLine = (line) => {
    const state = this.store.getState();

    const getKey = ({ id, ...lineWithoutId }) => Object.keys(lineWithoutId)[0];
    const key = getKey(line);
    const value = line[key];
    const index = getNewLineIndex(state);

    this.dispatcher.addBillLine();
    this.updateBillLine({ index, key, value });
  };

  removeBillLine = ({ index }) => {
    this.dispatcher.removeBillLine({ index });

    const state = this.store.getState();
    const isLinesEmpty = getIsLinesEmpty(state);

    if (!isLinesEmpty) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

  /*
   * Workflow:
   *  1. price calculation - update at most one extra field when formula prerequisite met
   *  2. tax calculation - update total
   */
  calculateRecurringBillLines = ({ index, key }) => {
    const state = this.store.getState();
    const isLineEdited = getIsLineEdited(state);
    if (isLineEdited) {
      this.dispatcher.calculateBillLineAmounts({ index, key });
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

  getTaxCalculations = ({ isSwitchingTaxInclusive }) => {
    const state = this.store.getState();
    const isTableEmpty = getIsLinesEmpty(state);

    if (isTableEmpty) {
      return;
    }

    const isTaxInclusive = getIsTaxInclusive(state);
    const taxCalculations = this.taxCalculate({
      isTaxInclusive,
      lines: getLinesForTaxCalculation(state),
      taxCodes: getTaxCodeOptions(state),
      isLineAmountsTaxInclusive: getIsLineAmountsTaxInclusive(
        isTaxInclusive,
        isSwitchingTaxInclusive
      ),
    });

    this.dispatcher.getTaxCalculations(
      taxCalculations,
      isSwitchingTaxInclusive
    );
  };

  loadItem = ({ index, itemId }) => {
    this.dispatcher.startSubmitting();

    const onSuccess = (item) => {
      this.dispatcher.loadItem({ index, item });
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      this.dispatcher.stopSubmitting();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.openDangerAlert({ message });
      this.dispatcher.stopSubmitting();
    };

    this.integrator.loadItem({ itemId, onSuccess, onFailure });
  };

  loadSupplier = () => {
    this.dispatcher.startSubmitting();

    const onSuccess = (response) => {
      this.dispatcher.stopSubmitting();
      this.dispatcher.loadSupplier(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.openDangerAlert({ message });
      this.dispatcher.stopSubmitting();
    };

    this.integrator.loadSupplier({ onSuccess, onFailure });
  };

  loadAbnFromSupplier = () => {
    this.dispatcher.setAbnLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setAbnLoadingState(false);
      this.dispatcher.loadAbn(response);
    };

    const onFailure = () => {
      this.dispatcher.setAbnLoadingState(false);
      this.dispatcher.loadAbn({ status: AbnStatus.UNAVAILABLE });
    };

    this.integrator.loadAbnFromSupplier({ onSuccess, onFailure });
  };

  redirectToRecurringTransactionList = () => {
    const state = this.store.getState();
    const url = getRecurringTransactionListUrl(state);

    this.navigateTo(url);
  };

  openAlert = ({ type, message }) => {
    if (type === AlertType.SUCCESS) {
      this.dispatcher.openSuccessAlert({ message });
    }

    if (type === AlertType.DANGER) {
      this.dispatcher.openDangerAlert({ message });
    }
  };

  openCancelModal = () => {
    const state = this.store.getState();
    const isPageEdited = getIsPageEdited(state);

    if (isPageEdited) {
      this.dispatcher.openModal({
        modalType: ModalType.CancelModal,
      });
    } else {
      this.cancelRecurringBill();
    }
  };

  cancelRecurringBill = () => {
    this.redirectToRecurringTransactionList();
  };

  openDeleteModal = () => {
    this.dispatcher.openModal({
      modalType: ModalType.DeleteModal,
    });
  };

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: (payload) =>
        this.loadAccountAfterCreate(payload, onChange),
      onLoadFailure: (message) => this.dispatcher.openDangerAlert({ message }),
    });
  };

  loadAccountAfterCreate = ({ message, id }, onChange) => {
    this.dispatcher.openSuccessAlert({ message });
    this.dispatcher.startSubmitting();
    this.accountModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.stopSubmitting();
      this.dispatcher.loadAccountAfterCreate(payload);
      onChange(payload);
    };

    const onFailure = () => {
      this.dispatcher.stopSubmitting();
    };
    this.integrator.loadAccountAfterCreate({ id, onSuccess, onFailure });
  };

  loadContactCombobox = () => {
    const state = this.store.getState();
    const context = getContactComboboxContext(state);
    this.contactComboboxModule.run(context);
  };

  updateContactCombobox = () => {
    const state = this.store.getState();
    const supplierId = getSupplierId(state);
    if (supplierId) {
      this.contactComboboxModule.load(supplierId);
    }
  };

  renderContactCombobox = (props) => {
    return this.contactComboboxModule
      ? this.contactComboboxModule.render(props)
      : null;
  };

  loadItemCombobox = () => {
    const state = this.store.getState();
    const context = getItemComboboxContext(state);
    this.itemComboboxModule.run(context);
  };

  updateItemCombobox = () => {
    const state = this.store.getState();
    const selectedItemIds = getUniqueSelectedItemIds(state);
    if (selectedItemIds.length > 0) {
      this.itemComboboxModule.load(selectedItemIds);
    }
  };

  renderItemCombobox = (props) => {
    return this.itemComboboxModule
      ? this.itemComboboxModule.render(props)
      : null;
  };

  loadJobCombobox = () => {
    const state = this.store.getState();
    const context = getJobModalContext(state);
    this.jobComboboxModule.run(context);
  };

  updateJobCombobox = () => {
    const state = this.store.getState();
    const selectedJobIds = getUniqueSelectedJobIds(state);
    if (selectedJobIds.length > 0) {
      this.jobComboboxModule.load(selectedJobIds);
    }
  };

  renderJobCombobox = (props) => {
    return this.jobComboboxModule ? this.jobComboboxModule.render(props) : null;
  };

  render = () => {
    const accountModal = this.accountModalModule.render();

    const view = (
      <Provider store={this.store}>
        <RecurringBillView
          renderItemCombobox={this.renderItemCombobox}
          renderContactCombobox={this.renderContactCombobox}
          renderJobCombobox={this.renderJobCombobox}
          accountModal={accountModal}
          onDismissAlert={this.dispatcher.closeAlert}
          onUpdateLayout={this.updateBillLayout}
          onUpdateScheduleOptions={this.dispatcher.updateScheduleOptions}
          actionListeners={{
            onSaveButtonClick: this.saveRecurringBill,
            onCancelButtonClick: this.openCancelModal,
            onDeleteButtonClick: this.openDeleteModal,
          }}
          confirmModalListeners={{
            onCloseModal: this.dispatcher.closeModal,
            onConfirmCancel: this.cancelRecurringBill,
            onConfirmDelete: this.deleteRecurringBill,
            onConfirmSaveAndRedirect: this.saveAndRedirect,
            onDiscardAndRedirect: this.discardAndRedirect,
          }}
          optionListeners={{
            onUpdateBillHeaderOption: this.updateBillHeaderOption,
            onUpdateSupplier: this.updateBillSupplierOptions,
            onInputAlert: this.openAlert,
          }}
          serviceLayoutListeners={{
            onAddRow: this.addBillLine,
            onRowChange: this.updateBillLine,
            onRowInputBlur: this.calculateRecurringBillLines,
            onRemoveRow: this.removeBillLine,
            onAddAccount: this.openAccountModal,
            onUpdateBillHeaderOption: this.updateBillHeaderOption,
          }}
          itemAndServiceLayoutListeners={{
            onRowInputBlur: this.calculateRecurringBillLines,
            onAddRow: this.addBillLine,
            onRowChange: this.updateBillLine,
            onRemoveRow: this.removeBillLine,
            onAddAccount: this.openAccountModal,
            onUpdateBillHeaderOption: this.updateBillHeaderOption,
          }}
        />
      </Provider>
    );
    this.setRootView(view);
  };

  setInitialState = (context) => {
    this.dispatcher.setInitialState({
      ...context,
    });
  };

  resetState = () => {
    this.contactComboboxModule.resetState();
    this.itemComboboxModule.resetState();
    this.accountModalModule.resetState();
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    const isRecurringTransactionEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isRecurringTransactionEnabled,
      isEarlyAccess: isToggleOn(FeatureToggles.RecurringTransactions),
    });

    this.setInitialState({ ...context, isRecurringTransactionEnabled });
    setupHotKeys(keyMap, {
      SAVE_ACTION: this.saveRecurringBill,
    });
    this.render();

    this.loadRecurringBill();
    this.loadContactCombobox();
    this.loadItemCombobox();
    this.loadJobCombobox();
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.dispatcher.setRedirectUrl(url);
      this.dispatcher.openModal({ modalType: ModalType.Unsaved });
    } else {
      this.navigateTo(url);
    }
  };
}

export default RecurringBillModule;
