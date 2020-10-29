import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_BANKING_RULE,
  SUCCESSFULLY_SAVED_BANKING_RULE,
} from '../../../common/types/MessageTypes';
import {
  getBankingRuleListUrl,
  getBankingRuleType,
  getContactComboboxContext,
  getCustomerComboboxContext,
  getIsPagedEdited,
  getJobModalContext,
  getLoadingState,
  getModalUrl,
  getOpenedModalType,
  getSaveUrl,
  getSupplierComboboxContext,
  getViewedAccountToolTip,
} from './bankingRuleDetailSelectors';
import { trackUserEvent } from '../../../telemetry';
import AlertType from '../../../common/types/AlertType';
import BankingRuleDetailView from './components/BankingRuleDetailView';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import FeatureToggles from '../../../FeatureToggles';
import JobModalModule from '../../job/jobModal/JobModalModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from './ModalType';
import RuleTypes from './RuleTypes';
import Store from '../../../store/Store';
import bankingRuleDetailReducer from './reducers';
import createBankingRuleDetailDispatcher from './createBankingRuleDetailDispatcher';
import createBankingRuleDetailIntegrator from './createBankingRuleDetailIntegrator';
import isFeatureEnabled from '../../../common/feature/isFeatureEnabled';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class BankingRuleDetailModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    featureToggles,
    isToggleOn,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(bankingRuleDetailReducer);
    this.dispatcher = createBankingRuleDetailDispatcher(this.store);
    this.integrator = createBankingRuleDetailIntegrator(
      this.store,
      this.integration
    );
    this.jobModalModule = new JobModalModule({ integration });
    this.contactComboboxModule = new ContactComboboxModule({
      integration,
      featureToggles,
    });
    this.isToggleOn = isToggleOn;
    this.featureToggles = featureToggles;
  }

  viewedAccountToolTip = () => {
    if (getViewedAccountToolTip(this.store.getState()) === false) {
      this.dispatcher.setViewedAccountToolTip(true);
      trackUserEvent({
        eventName: 'viewedAccountToolTip',
        customProperties: {
          action: 'viewed_accountToolTip',
          page: 'Banking rule detail',
        },
      });
    }
  };

  render = () => {
    const jobModal = this.jobModalModule.render();

    const renderContactCombobox = (props) => {
      return this.contactComboboxModule
        ? this.contactComboboxModule.render(props)
        : null;
    };

    const bankingRuleDetailView = (
      <BankingRuleDetailView
        renderContactCombobox={renderContactCombobox}
        onContactChange={this.updateContact}
        onRuleDetailsChange={this.updateForm}
        onRuleConditionsChange={this.updateForm}
        onConditionChange={this.updateRuleCondition}
        onConditionAdd={this.addRuleCondition}
        onPredicateAdd={this.addConditionPredicate}
        onPredicateChange={this.updateConditionPredicate}
        onPredicateRemove={this.removeConditionPredicate}
        jobModal={jobModal}
        onAddRow={this.addTableRow}
        onAddJob={this.openJobModal}
        onRowChange={this.changeTableRow}
        onRemoveRow={this.removeTableRow}
        onSaveButtonClick={this.saveBankingRule}
        onCancelButtonClick={this.cancelBankingRule}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissModal={this.dismissModal}
        onConfirmDeleteButtonClick={this.deleteBankingRule}
        onConfirmCancelButtonClick={this.redirectToModalUrl}
        onConfirmSave={this.saveBankingRule}
        onAlert={this.dispatcher.displayAlert}
        onDismissAlert={this.dispatcher.dismissAlert}
        onViewedAccountToolTip={this.viewedAccountToolTip}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{bankingRuleDetailView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  loadBankingRule = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (intent) => (bankingRule) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBankingRule(intent, bankingRule);
      this.loadContactCombobox();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBankingRule(onSuccess, onFailure);
  };

  loadContactCombobox = () => {
    const state = this.store.getState();
    const ruleType = getBankingRuleType(state);
    this.contactComboboxModule.resetState();
    switch (ruleType) {
      case RuleTypes.bill:
        this.contactComboboxModule.run(getSupplierComboboxContext(state));
        break;
      case RuleTypes.invoice:
        this.contactComboboxModule.run(getCustomerComboboxContext(state));
        break;
      case RuleTypes.spendMoney:
      case RuleTypes.receiveMoney:
      default:
        this.contactComboboxModule.run(getContactComboboxContext(state));
        break;
    }
  };

  saveBankingRule = () => {
    const state = this.store.getState();
    if (getLoadingState(state) === LoadingState.LOADING) return;

    this.dismissModal();
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);

      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BANKING_RULE,
        content: message,
      });

      const url = getSaveUrl(state);
      this.redirectToUrl(url);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.displayAlert({
        type: AlertType.DANGER,
        message,
      });
    };

    this.integrator.saveBankingRule(onSuccess, onFailure);
  };

  deleteBankingRule = () => {
    this.dismissModal();
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BANKING_RULE,
        content: message,
      });

      this.redirectToBankingRuleList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.displayAlert({
        type: AlertType.DANGER,
        message,
      });
    };

    this.integrator.deleteBankingRule(onSuccess, onFailure);
  };

  redirectToBankingRuleList = () => {
    const state = this.store.getState();
    const url = getBankingRuleListUrl(state);
    this.redirectToUrl(url);
  };

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.redirectToUrl(url);
  };

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  addTableRow = (row) => {
    this.dispatcher.setIsPageEdited();
    this.dispatcher.addTableRow(row);
  };

  changeTableRow = (index, key, value) => {
    this.dispatcher.setIsPageEdited();
    this.dispatcher.changeTableRow(index, key, value);
  };

  removeTableRow = (index) => {
    this.dispatcher.setIsPageEdited();
    this.dispatcher.removeTableRow(index);
  };

  addRuleCondition = () => {
    this.dispatcher.addRuleCondition();
  };

  updateRuleCondition = (conditionIndex, { key, value }) => {
    this.dispatcher.updateRuleCondition(conditionIndex, key, value);
  };

  addConditionPredicate = (conditionIndex, newData) => {
    this.dispatcher.addConditionPredicate(conditionIndex, newData);
  };

  updateConditionPredicate = (
    conditionIndex,
    predicationIndex,
    { key, value }
  ) => {
    this.dispatcher.updateConditionPredicate(
      conditionIndex,
      predicationIndex,
      key,
      value
    );
  };

  removeConditionPredicate = (conditionIndex, predicationIndex) => {
    this.dispatcher.removeConditionPredicate(conditionIndex, predicationIndex);
  };

  updateForm = ({ key, value }) => {
    this.dispatcher.setIsPageEdited();
    this.dispatcher.updateForm(key, value);

    if (key === 'ruleType') {
      this.loadContactCombobox();
    }
  };

  updateContact = ({ key, value, contactType, isReportable }) => {
    this.dispatcher.updateContact({
      key,
      value,
      contactType,
      isPaymentReportable: isReportable,
    });
  };

  openDeleteModal = () => {
    const state = this.store.getState();
    const url = getBankingRuleListUrl(state);
    this.dispatcher.openModal({ type: ModalType.DELETE, url });
  };

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
  };

  cancelBankingRule = () => {
    const state = this.store.getState();
    const isPageEdited = getIsPagedEdited(state);
    const url = getBankingRuleListUrl(state);

    if (isPageEdited) {
      this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
    } else {
      this.redirectToBankingRuleList();
    }
  };

  openJobModal = (onChange) => {
    const state = this.store.getState();
    const context = getJobModalContext(state);

    this.jobModalModule.run({
      context,
      onLoadFailure: (message) =>
        this.dispatcher.displayAlert({
          type: AlertType.DANGER,
          message,
        }),
      onSaveSuccess: (payload) => this.loadJobAfterCreate(payload, onChange),
    });
  };

  loadJobAfterCreate = ({ id }, onChange) => {
    this.jobModalModule.resetState();
    this.dispatcher.setJobLoadingState(true);

    const onSuccess = (payload) => {
      const job = { ...payload, id };

      this.dispatcher.setJobLoadingState(false);
      this.dispatcher.loadJobAfterCreate(id, job);
      onChange(job);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setJobLoadingState(false);
      this.dispatcher.displayAlert({
        type: AlertType.DANGER,
        message,
      });
    };

    this.integrator.loadJobAfterCreate({ id, onSuccess, onFailure });
  };

  dismissModal = () => {
    this.dispatcher.closeModal();
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getOpenedModalType(state);

    if (this.contactComboboxModule.isContactModalOpened()) {
      this.contactComboboxModule.createContact();
      return;
    }

    switch (modalType) {
      case ModalType.DELETE:
        // DO NOTHING
        break;
      case ModalType.UNSAVED:
      default:
        this.saveBankingRule();
        break;
    }
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run = (context) => {
    const isNoConditionRuleEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isBankLinkPayeeEnabled,
      isEarlyAccess: this.isToggleOn(FeatureToggles.BankLinkPayee),
    });

    this.dispatcher.setInitialState({
      isNoConditionRuleEnabled,
      ...context,
    });

    this.render();
    setupHotKeys(keyMap, {
      SAVE_ACTION: this.saveHandler,
    });
    this.loadBankingRule();
  };

  resetState = () => {
    this.dispatcher.resetState();
    this.contactComboboxModule.resetState();
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPagedEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  };
}
