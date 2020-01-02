import { Provider } from 'react-redux';
import React from 'react';

import {
  getIsPageEdited,
  getIsTemplatesLoading,
  getNewSortOrder,
  getPendingDeleteTemplate,
  getSalesSettingsPayload,
  getSelectedTab,
  getTabData,
} from './SalesSettingsDetailSelectors';
import { mainTabIds } from './tabItems';
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
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(salesSettingsReducer);
    this.setRootView = setRootView;

    this.dispatcher = createSalesSettingsDispatcher(this.store);
    this.integrator = createSalesSettingsIntegrator(this.store, integration);
  }

  loadSalesSettings = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadSalesSettings(response);
    };

    const onFailure = () => {
      console.log('Failed to load sale setting');
    };

    this.integrator.loadSalesSettings({ onSuccess, onFailure });
  };

  updateSalesSettings = () => {
    const state = this.store.getState();
    this.dispatcher.setSubmittingState(true);
    const content = getSalesSettingsPayload(state);

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.saveDataTab();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.updateSalesSettings({ onSuccess, onFailure, content });
  };

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
    const content = getTabData(state);
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.saveDataTab();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
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
          onCreateTemplate: () => {},
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
    const selectTab = getSelectedTab(this.store.getState());

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

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.dispatcher.setLoadingState(true);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadSalesSettings();
  };
}
