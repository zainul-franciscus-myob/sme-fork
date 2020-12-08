import { Provider } from 'react-redux';
import React from 'react';

import {
  DUPLICATE_PURCHASE_ORDER,
  SUCCESSFULLY_DELETED_PURCHASE_ORDER,
  SUCCESSFULLY_DOWNLOADED_REMITTANCE_ADVICE,
  SUCCESSFULLY_EMAILED_REMITTANCE_ADVICE,
  SUCCESSFULLY_SAVED_PURCHASE_ORDER,
  SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK,
} from '../../../common/types/MessageTypes';
import {
  TaxCalculatorTypes,
  createTaxCalculator,
} from '../../../common/taxCalculator';
import {
  getContactComboboxContext,
  getHasLineBeenPrefilled,
  getIsBeforeConversionDate,
  getIsCreating,
  getIsLineAmountsTaxInclusive,
  getIsLineEdited,
  getIsLinesEmpty,
  getIsPageEdited,
  getIsTaxInclusive,
  getItemComboboxContext,
  getLinesForTaxCalculation,
  getModalContext,
  getModalType,
  getNewLineIndex,
  getPurchaseOrderId,
  getRedirectUrl,
  getShouldShowAbn,
  getSupplierId,
  getTaxCodeOptions,
  getUniqueSelectedItemIds,
  getViewedAccountToolTip,
} from './selectors/purchaseOrderSelectors';
import {
  getCreateBillFromOrderUrl,
  getCreateNewPurchaseOrderUrl,
  getPurchaseOrderListUrl,
} from './selectors/PurchaseOrderRedirectSelectors';
import {
  getExportPdfFilename,
  getShouldSaveAndReload,
} from './selectors/exportPdfSelectors';
import {
  getIsLineAccountIdKey,
  getIsLineItemIdKey,
  getIsLineTaxCodeIdKey,
  getIsSupplierIdKey,
  getIsTaxInclusiveKey,
} from './selectors/PurchaseOrderModuleSelectors';
import { trackUserEvent } from '../../../telemetry';
import AbnStatus from '../../../components/autoFormatter/AbnInput/AbnStatus';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import AlertType from '../../../common/types/AlertType';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import ItemComboboxModule from '../../inventory/itemCombobox/ItemComboboxModule';
import JobModalModule from '../../job/jobModal/JobModalModule';
import ModalType from './types/ModalType';
import PurchaseOrderView from './components/PurchaseOrderView';
import SaveActionType from './types/SaveActionType';
import Store from '../../../store/Store';
import createPurchaseOrderDispatcher from './createPurchaseOrderDispatcher';
import createPurchaseOrderIntegrator from './createPurchaseOrderIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import openBlob from '../../../common/blobOpener/openBlob';
import purchaseOrderReducer from './reducer/purchaseOrderReducer';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

class PurchaseOrderModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    replaceURLParams,
    globalCallbacks,
    navigateTo,
    subscribeOrUpgrade,
    featureToggles,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(purchaseOrderReducer);
    this.dispatcher = createPurchaseOrderDispatcher(this.store);
    this.integrator = createPurchaseOrderIntegrator(this.store, integration);
    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.jobModalModule = new JobModalModule({
      integration,
    });
    this.taxCalculate = createTaxCalculator(TaxCalculatorTypes.purchaseOrder);
    this.globalCallbacks = globalCallbacks;
    this.navigateTo = navigateTo;
    this.subscribeOrUpgrade = subscribeOrUpgrade;
    this.contactComboboxModule = new ContactComboboxModule({
      integration,
      featureToggles,
    });
    this.itemComboboxModule = new ItemComboboxModule({
      integration,
      onAlert: this.openAlert,
    });
  }

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: (payload) =>
        this.loadAccountAfterCreate(payload, onChange),
      onLoadFailure: (message) => this.dispatcher.openDangerAlert({ message }),
    });
  };

  loadAccountAfterCreate = ({ message, id }, onChange) => {
    this.dispatcher.loadingAfterCreate({ message });
    this.accountModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.loadAccountAfterCreate(payload);
      onChange(payload);
    };

    const onFailure = () => {
      this.dispatcher.stopBlocking();
    };
    this.integrator.loadAccountAfterCreate({ id, onSuccess, onFailure });
  };

  openJobModal = (onChange) => {
    const state = this.store.getState();
    const jobModalContext = getModalContext(state);
    this.jobModalModule.run({
      context: jobModalContext,
      onSaveSuccess: (payload) => this.loadJobAfterCreate(payload, onChange),
      onLoadFailure: (message) => this.dispatcher.openDangerAlert({ message }),
    });
  };

  loadJobAfterCreate = ({ message, id }, onChange) => {
    this.dispatcher.loadingAfterCreate({ message });
    this.jobModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.loadJobAfterCreate({
        ...payload,
        id,
      });
      onChange({
        ...payload,
        id,
      });
    };

    const onFailure = () => {
      this.dispatcher.stopBlocking();
    };
    this.integrator.loadJobAfterCreate({ id, onSuccess, onFailure });
  };

  loadPurchaseOrder = () => {
    const onSuccess = (response) => {
      this.dispatcher.stopLoading();
      this.dispatcher.loadPurchaseOrder(response);

      const state = this.store.getState();

      this.updateContactCombobox();
      this.updateItemCombobox();

      const shouldShowAbn = getShouldShowAbn(state);
      if (shouldShowAbn) {
        this.loadAbnFromSupplier();
      }
    };

    const onFailure = () => {
      this.dispatcher.failLoading();
    };

    this.dispatcher.startLoading();
    this.integrator.loadPurchaseOrder({ onSuccess, onFailure });
  };

  reloadPurchaseOrder = ({ onSuccess: next = () => {} }) => {
    this.dispatcher.startBlocking();

    const onSuccess = (response) => {
      this.dispatcher.reloadPurchaseOrder(response);

      const shouldShowAbn = getShouldShowAbn(this.store.getState());
      if (shouldShowAbn) {
        this.loadAbnFromSupplier();
      }

      next();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.reloadPurchaseOrderFailed({ message });
    };

    this.integrator.loadPurchaseOrder({ onSuccess, onFailure });
  };

  savePurchaseOrderAnd = ({ onSuccess }) => {
    const handleSaveSuccess = (response) => {
      if (response.monthlyLimit) {
        this.dispatcher.stopBlocking();
        this.dispatcher.showUpgradeModal(response.monthlyLimit);
      } else {
        this.dispatcher.stopBlocking();
        onSuccess(response);
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.savePurchaseOrderFailed({ message });
    };

    this.dispatcher.startBlocking();
    this.integrator.savePurchaseOrder({
      onSuccess: handleSaveSuccess,
      onFailure,
    });
  };

  savePurchaseOrder = () => {
    const state = this.store.getState();

    if (getModalType(state)) {
      this.closeModal();
    }

    const onSuccess = ({ message }) => {
      this.dispatcher.openSuccessAlert({ message });
    };
    this.saveAndReload({ onSuccess });
  };

  discardAndRedirect = () => {
    this.dispatcher.closeModal();
    const url = getRedirectUrl(this.store.getState());
    this.navigateTo(url);
  };

  saveAndRedirect = () => {
    this.dispatcher.closeModal();

    const onSuccess = () => {
      const url = getRedirectUrl(this.store.getState());
      this.navigateTo(url);
    };

    this.savePurchaseOrderAnd({ onSuccess });
  };

  saveAndCreateNewPurchaseOrder = () => {
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_PURCHASE_ORDER,
        content: message,
      });

      this.redirectToCreateNewPurchaseOrder();
    };

    this.savePurchaseOrderAnd({ onSuccess });
  };

  saveAndDuplicatePurchaseOrder = () => {
    this.dispatcher.closeModal();

    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      const duplicateId = isCreating ? id : getPurchaseOrderId(state);

      this.pushMessage({
        type: SUCCESSFULLY_SAVED_PURCHASE_ORDER,
        content: message,
      });
      this.pushMessage({ type: DUPLICATE_PURCHASE_ORDER, duplicateId });

      this.redirectToCreateNewPurchaseOrder();
    };

    this.savePurchaseOrderAnd({ onSuccess });
  };

  saveAndReload = ({ onSuccess: next = () => {} }) => {
    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      if (isCreating) {
        this.dispatcher.updatePurchaseOrderId(id);
        this.replaceURLParams({ purchaseOrderId: id });
      }

      this.reloadPurchaseOrder({ onSuccess: () => next({ message }) });
    };

    this.savePurchaseOrderAnd({ onSuccess });
  };

  deletePurchaseOrder = () => {
    this.dispatcher.deletingPurchaseOrder();

    const onSuccess = ({ message }) => {
      this.dispatcher.stopBlocking();
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_PURCHASE_ORDER,
        content: message,
      });
      this.redirectToPurchaseOrderList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.deletePurchaseOrderFailed({ message });
    };
    this.integrator.deletePurchaseOrder({ onSuccess, onFailure });
  };

  openSaveAndModal = (saveActionType) => {
    const modalType = {
      [SaveActionType.SAVE_AND_CREATE_NEW]: ModalType.SaveAndCreateNew,
      [SaveActionType.SAVE_AND_DUPLICATE]: ModalType.SaveAndDuplicate,
    }[saveActionType];

    this.dispatcher.openModal({ modalType });
  };

  openCancelModal = () => {
    const state = this.store.getState();
    const isPageEdited = getIsPageEdited(state);

    if (isPageEdited) {
      this.dispatcher.openModal({
        modalType: ModalType.CancelModal,
      });
    } else {
      this.redirectToPurchaseOrderList();
    }
  };

  openDeleteModal = () => {
    this.dispatcher.openModal({
      modalType: ModalType.DeleteModal,
    });
  };

  closeModal = () => {
    this.dispatcher.closeModal();
  };

  closeAlert = () => {
    this.dispatcher.closeAlert();
  };

  updatePurchaseOrderOption = ({ key, value }) => {
    const isTaxInclusiveKey = getIsTaxInclusiveKey(key);
    const isSupplierIdKey = getIsSupplierIdKey(key);

    if (isSupplierIdKey) {
      this.dispatcher.resetSupplier();
    }

    this.dispatcher.updatePurchaseOrderOption({ key, value });

    if (isSupplierIdKey && value) {
      this.loadSupplierDetail();
    }

    if (isTaxInclusiveKey) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: true });
    }
  };

  validateIssueDate = () => {
    if (getIsBeforeConversionDate(this.store.getState())) {
      this.openPreConversionModal();
    }
  };

  openPreConversionModal = () => {
    this.dispatcher.openModal({
      modalType: ModalType.PreConversionPurchaseOrder,
    });
  };

  updateLayout = ({ value }) => {
    this.dispatcher.updateLayout({ value });
    const state = this.store.getState();

    if (!getIsLinesEmpty(state)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

  updatePurchaseOrderLine = ({ index, key, value }) => {
    this.dispatcher.updatePurchaseOrderLine({ index, key, value });

    if (getIsLineTaxCodeIdKey(key) || getIsLineAccountIdKey(key)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    } else if (
      getIsLineItemIdKey(key) &&
      !getHasLineBeenPrefilled(this.store.getState(), index) &&
      value
    ) {
      this.loadItemDetailForLine({ index, itemId: value });
    }
  };

  addPurchaseOrderLine = (line) => {
    const state = this.store.getState();

    const getKey = ({ id, ...lineWithoutId }) => Object.keys(lineWithoutId)[0];
    const key = getKey(line);
    const value = line[key];
    const index = getNewLineIndex(state);

    this.dispatcher.addPurchaseOrderLine();
    this.updatePurchaseOrderLine({ index, key, value });
  };

  removePurchaseOrderLine = ({ index }) => {
    this.dispatcher.removePurchaseOrderLine({ index });

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
  calculatePurchaseOrderLines = ({ index, key }) => {
    const state = this.store.getState();
    const isLineEdited = getIsLineEdited(state);
    if (isLineEdited) {
      this.dispatcher.calculateLineAmounts({ index, key });
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

  loadItemDetailForLine = ({ index, itemId }) => {
    this.dispatcher.startBlocking();

    const onSuccess = (updatedLine) => {
      this.dispatcher.loadItemDetailForLine({ index, updatedLine });
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      this.dispatcher.stopBlocking();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.loadItemDetailForLineFailed({ message });
    };

    this.integrator.loadItemDetailForLine({
      index,
      itemId,
      onSuccess,
      onFailure,
    });
  };

  loadSupplierDetail = () => {
    this.dispatcher.startBlocking();

    const onSuccess = (response) => {
      this.dispatcher.loadSupplierDetail(response);

      const state = this.store.getState();

      const shouldShowAbn = getShouldShowAbn(state);
      if (shouldShowAbn) {
        this.loadAbnFromSupplier();
      }
    };
    const onFailure = ({ message }) => {
      this.dispatcher.loadSupplierDetailFailed({ message });
    };

    this.integrator.loadSupplierDetail({ onSuccess, onFailure });
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

  exportPdf = () => {
    this.dispatcher.startModalBlocking();
    const onSuccess = (data) => {
      this.dispatcher.stopModalBlocking();
      this.closeModal();

      const state = this.store.getState();
      const filename = getExportPdfFilename(state);
      openBlob({ blob: data, filename });
    };

    const onFailure = () => {
      this.dispatcher.exportPurchaseOrderPdfFailed({
        message: 'Failed to export PDF',
      });
      this.closeModal();
    };

    this.integrator.exportPdf({ onSuccess, onFailure });
  };

  openExportPdfModal = () => {
    this.dispatcher.openModal({ modalType: ModalType.ExportPdf });
  };

  openExportPdfModalOrSaveAndExportPdf = () => {
    const state = this.store.getState();
    const shouldSaveAndExport = getShouldSaveAndReload(state);
    if (shouldSaveAndExport) {
      this.saveAndReload({ onSuccess: this.openExportPdfModal });
    } else {
      this.openExportPdfModal();
    }
  };

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({
      modalType: ModalType.Unsaved,
      redirectUrl: url,
    });
  };

  redirectToCreateNewBill = () => {
    const state = this.store.getState();
    const url = getCreateBillFromOrderUrl(state);

    this.navigateTo(url);
  };

  convertToBillOrOpenUnsavedModal = () => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      const url = getCreateBillFromOrderUrl(state);
      this.openUnsavedModal(url);
    } else {
      this.redirectToCreateNewBill();
    }
  };

  readMessages = () => {
    this.popMessages([
      SUCCESSFULLY_DOWNLOADED_REMITTANCE_ADVICE,
      SUCCESSFULLY_EMAILED_REMITTANCE_ADVICE,
      SUCCESSFULLY_SAVED_PURCHASE_ORDER,
      SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK,
      DUPLICATE_PURCHASE_ORDER,
    ]).forEach((message) => {
      switch (message.type) {
        case SUCCESSFULLY_SAVED_PURCHASE_ORDER:
          this.dispatcher.openSuccessAlert({ message: message.content });
          break;
        case SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK:
          this.dispatcher.openInfoAlert({ message: message.content });
          break;
        case DUPLICATE_PURCHASE_ORDER:
          this.dispatcher.setDuplicateId(message.duplicateId);
          break;
        default:
      }
    });
  };

  viewedAccountToolTip = () => {
    if (getViewedAccountToolTip(this.store.getState()) === false) {
      this.dispatcher.setViewedAccountToolTip(true);
      trackUserEvent({
        eventName: 'viewedAccountToolTip',
        customProperties: {
          action: 'viewed_accountToolTip',
          page: 'PurchaseOrder',
        },
      });
    }
  };

  redirectToCreateNewPurchaseOrder = () => {
    const state = this.store.getState();
    const url = getCreateNewPurchaseOrderUrl(state);

    this.navigateTo(url);
  };

  redirectToPurchaseOrderList = () => {
    const state = this.store.getState();
    const url = getPurchaseOrderListUrl(state);

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

  render = () => {
    const accountModal = this.accountModalModule.render();
    const jobModal = this.jobModalModule.render();

    const view = (
      <Provider store={this.store}>
        <PurchaseOrderView
          renderItemCombobox={this.renderItemCombobox}
          renderContactCombobox={this.renderContactCombobox}
          accountModal={accountModal}
          jobModal={jobModal}
          onSaveButtonClick={this.savePurchaseOrder}
          onSaveAndButtonClick={this.openSaveAndModal}
          onConfirmSaveAndRedirect={this.saveAndRedirect}
          onDiscardAndRedirect={this.discardAndRedirect}
          onCancelButtonClick={this.openCancelModal}
          onDeleteButtonClick={this.openDeleteModal}
          onExportPdfButtonClick={this.openExportPdfModalOrSaveAndExportPdf}
          onModalClose={this.closeModal}
          onCancelModalConfirm={this.redirectToPurchaseOrderList}
          onDeleteModalConfirm={this.deletePurchaseOrder}
          onConfirmSaveAmountDueWarningButtonClick={this.savePurchaseOrder}
          onConfirmSaveAndCreateNewButtonClick={
            this.saveAndCreateNewPurchaseOrder
          }
          onConfirmSaveAndDuplicateButtonClick={
            this.saveAndDuplicatePurchaseOrder
          }
          onInputAlert={this.openAlert}
          onDismissAlert={this.closeAlert}
          onUpdateLayout={this.updateLayout}
          onUpdatePurchaseOrderOption={this.updatePurchaseOrderOption}
          onIssueDateBlur={this.validateIssueDate}
          serviceLayoutListeners={{
            onAddRow: this.addPurchaseOrderLine,
            onRowChange: this.updatePurchaseOrderLine,
            onRowInputBlur: this.calculatePurchaseOrderLines,
            onRemoveRow: this.removePurchaseOrderLine,
            onAddAccount: this.openAccountModal,
            onAddJob: this.openJobModal,
            onUpdatePurchaseOrderOption: this.updatePurchaseOrderOption,
            onViewedAccountToolTip: this.viewedAccountToolTip,
          }}
          itemAndServiceLayoutListeners={{
            onRowInputBlur: this.calculatePurchaseOrderLines,
            onAddRow: this.addPurchaseOrderLine,
            onRowChange: this.updatePurchaseOrderLine,
            onRemoveRow: this.removePurchaseOrderLine,
            onAddAccount: this.openAccountModal,
            onAddJob: this.openJobModal,
            onAddItemButtonClick: this.openInventoryModal,
            onUpdatePurchaseOrderOption: this.updatePurchaseOrderOption,
            onViewedAccountToolTip: this.viewedAccountToolTip,
          }}
          exportPdfModalListeners={{
            onCancel: this.closeModal,
            onConfirm: this.exportPdf,
            onChange: this.dispatcher.updateExportPdfDetail,
          }}
          onConvertToBillButtonClick={this.convertToBillOrOpenUnsavedModal}
          onAddSupplierButtonClick={this.openSupplierModal}
          onUpgradeModalDismiss={this.dispatcher.hideUpgradeModal}
          onUpgradeModalUpgradeButtonClick={this.subscribeOrUpgrade}
        />
      </Provider>
    );
    this.setRootView(view);
  };

  setInitialState = (context) => {
    this.dispatcher.setInitialState(context);
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
    this.setInitialState(context);
    setupHotKeys(keyMap, {
      SAVE_ACTION: this.savePurchaseOrder,
    });
    this.render();
    this.readMessages();

    this.loadPurchaseOrder();
    this.loadContactCombobox();
    this.loadItemCombobox();
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

export default PurchaseOrderModule;
