import { Provider } from 'react-redux';
import React from 'react';

import { TEMPLATE_UPDATED } from '../../template/MessageTypes';
import {
  getBusinessId,
  getIsPageEdited,
  getIsTemplatesLoading,
  getLoadingState,
  getModalType,
  getNewSortOrder,
  getPendingDeleteTemplate,
  getRegion,
  getSalesSettingsPayload,
  getSelectedTab,
  getShowOnlinePaymentOptions,
  getTabData,
} from './SalesSettingsDetailSelectors';
import { mainTabIds } from './tabItems';
import LoadingState from '../../../components/PageView/LoadingState';
import SalesSettingsView from './components/SalesSettingsDetailView';
import Store from '../../../store/Store';
import actionTypes from './components/templates/actionTypes';
import createSalesSettingsDispatcher from './createSalesSettingsDispatcher';
import createSalesSettingsIntegrator from './createSalesSettingsIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import modalTypes from './modalTypes';
import salesSettingsReducer from './salesSettingsDetailReducer';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class SalesSettingsModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(salesSettingsReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;

    this.dispatcher = createSalesSettingsDispatcher(this.store);
    this.integrator = createSalesSettingsIntegrator(this.store, integration);
  }

  loadSalesSettings = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadSalesSettings(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadSalesSettings({ onSuccess, onFailure });
  };

  updateSalesSettings = () => {
    const state = this.store.getState();
    if (getLoadingState(state) === LoadingState.LOADING) return;

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const content = getSalesSettingsPayload(state);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.saveDataTab();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.updateSalesSettings({ onSuccess, onFailure, content });
  };

  loadPayDirectSettings = () => {
    this.dispatcher.setPayDirectSettingsLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setPayDirectSettingsLoadingState(false);
      this.dispatcher.loadPayDirectSettings(response);
    };

    const onFailure = () => {
      this.dispatcher.setPayDirectSettingsLoadingState(false);
    };

    this.integrator.loadPayDirectSettings({ onSuccess, onFailure });
  }

  switchTab = (selectedTab) => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setPendingTab(selectedTab);
      this.dispatcher.openModal(modalTypes.switchTab);
    } else {
      this.dispatcher.setTab(selectedTab);
    }
  };

  onConfirmSwitchTab = () => {
    const state = this.store.getState();
    this.dispatcher.setTab(state.pendingTab);
    this.dispatcher.closeModal();
  };

  closeModal = () => {
    this.dispatcher.closeModal();
  };

  saveEmailSettings = () => {
    const state = this.store.getState();
    if (getLoadingState(state) === LoadingState.LOADING) return;

    const content = getTabData(state);
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.saveDataTab();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.saveEmailSettings({ onSuccess, onFailure, content });
  };

  sortTemplateList = (orderBy) => {
    const state = this.store.getState();
    if (getIsTemplatesLoading(state)) {
      return;
    }

    this.dispatcher.setTemplateListLoadingState(true);

    const sortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setTemplateListSortOrder(orderBy, sortOrder);

    const onSuccess = ({ templates }) => {
      this.dispatcher.setTemplateListLoadingState(false);
      this.dispatcher.setSortedTemplates(templates);
    };

    const onFailure = (error) => {
      this.dispatcher.setTemplateListLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.sortTemplateList({
      orderBy,
      sortOrder,
      onSuccess,
      onFailure,
    });
  };

  deleteTemplate = () => {
    const templateName = getPendingDeleteTemplate(this.store.getState());

    const onSuccess = ({ message }) => {
      this.dispatcher.setAlert({ message, type: 'success' });
      this.dispatcher.deleteTemplate(templateName);
    };

    const onFailure = (error) => {
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.deleteTemplate({
      templateName,
      onSuccess,
      onFailure,
    });
  };

  onConfirmDeleteTemplate = () => {
    this.deleteTemplate();
    this.closeModal();
  };

  handleActionSelect = name => (action) => {
    switch (action) {
      case actionTypes.delete:
        this.dispatcher.setPendingDeleteTemplate(name);
        this.dispatcher.openModal(modalTypes.deleteTemplate);
        break;
      case actionTypes.editTemplate:
        this.redirectToEditTemplate(name);
        break;
      default:
    }
  };

  render = () => {
    const salesSettingsView = (
      <SalesSettingsView
        onDismissAlert={this.dispatcher.dismissAlert}
        onUpdateSalesSettingsItem={this.dispatcher.updateSalesSettingsItem}
        onSalesSettingsSave={this.updateSalesSettings}
        onTabSelect={this.switchTab}
        onConfirmSwitchTab={this.onConfirmSwitchTab}
        onConfirmDeleteTemplate={this.onConfirmDeleteTemplate}
        onCloseModal={this.closeModal}
        onUpdateEmailSettings={this.dispatcher.updateEmailSettings}
        onSaveEmailSettings={this.saveEmailSettings}
        templateHandlers={{
          onCreateTemplate: this.redirectToCreateNewTemplate,
          onSortTemplateList: this.sortTemplateList,
          onActionSelect: this.handleActionSelect,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{salesSettingsView}</Provider>
    );

    this.setRootView(wrappedView);
  };

  saveHandler = () => {
    const state = this.store.getState();

    const modalType = getModalType(state);
    if (modalType) return;

    const selectTab = getSelectedTab(state);

    const handler = {
      [mainTabIds.layoutAndTheme]: this.updateSalesSettings,
      [mainTabIds.payments]: this.updateSalesSettings,
      [mainTabIds.emailDefaults]: this.saveEmailSettings,
    }[selectTab];

    if (handler) {
      handler();
    }
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  readMessages = () => {
    const [successMessage] = this.popMessages([TEMPLATE_UPDATED]);

    if (successMessage) {
      const {
        content: message,
      } = successMessage;

      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    }
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.readMessages();
    this.loadSalesSettings();

    const showOnlinePaymentOptions = getShowOnlinePaymentOptions(this.store.getState());
    if (showOnlinePaymentOptions) {
      this.loadPayDirectSettings();
    }
  };

  redirectToCreateNewTemplate = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/template/`;
  };

  redirectToEditTemplate = (name) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/template/${name}`;
  };
}
