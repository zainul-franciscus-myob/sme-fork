import { Provider } from 'react-redux';
import React from 'react';

import { TEMPLATE_UPDATED } from '../../../common/types/MessageTypes';
import {
  encodeTemplateName,
  getBusinessId,
  getIsPageEdited,
  getIsTemplatesLoading,
  getLoadingState,
  getMarketplaceLink,
  getModalType,
  getNewSortOrder,
  getPendingDeleteTemplate,
  getPendingTab,
  getRegion,
  getSalesSettingsPayload,
  getSelectedTab,
  getShowOnlinePaymentOptions,
  getSortOrder,
  getTabData,
} from './SalesSettingsDetailSelectors';
import { mainTabIds } from './tabItems';
import { trackUserEvent } from '../../../telemetry';
import LoadingState from '../../../components/PageView/LoadingState';
import SalesSettingsView from './components/SalesSettingsDetailView';
import Store from '../../../store/Store';
import actionTypes from './components/templates/actionTypes';
import createSalesSettingsDispatcher from './createSalesSettingsDispatcher';
import createSalesSettingsIntegrator from './createSalesSettingsIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import loadSubscriptionUrl from '../../settings/subscription/loadSubscriptionUrl';
import modalTypes from './modalTypes';
import salesSettingsReducer from './salesSettingsDetailReducer';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class SalesSettingsModule {
  constructor({
    integration,
    navigateTo,
    setRootView,
    popMessages,
    replaceURLParams,
    addedPaymentDetailsSaved,
    featureToggles,
  }) {
    this.integration = integration;
    this.store = new Store(salesSettingsReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.closePaymentDetailsTask = addedPaymentDetailsSaved;
    this.replaceURLParams = replaceURLParams;
    this.dispatcher = createSalesSettingsDispatcher(this.store);
    this.integrator = createSalesSettingsIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
    this.featureToggles = featureToggles;
  }

  loadSalesSettings = () => {
    const state = this.store.getState();
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadSalesSettings(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    const templateListSortOrder = getSortOrder(state);

    this.integrator.loadSalesSettings({
      templateListSortOrder,
      onSuccess,
      onFailure,
    });
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

      if (getSelectedTab(state) === mainTabIds.payments) {
        this.closePaymentDetailsTask();
      }
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
  };

  switchTab = (selectedTab) => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setPendingTab(selectedTab);
      this.dispatcher.openModal(modalTypes.switchTab);
    } else {
      this.dispatcher.setTab(selectedTab);
      this.replaceURLParams({ selectedTab });
    }
  };

  onConfirmSwitchTab = () => {
    const state = this.store.getState();
    const pendingTab = getPendingTab(state);

    this.dispatcher.setTab(pendingTab);
    this.dispatcher.closeModal();
    this.replaceURLParams({ selectedTab: pendingTab });
  };

  closeModal = () => this.dispatcher.closeModal();

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

    if (getIsTemplatesLoading(state)) return;

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
    this.dispatcher.setTemplateListLoadingState(true);

    const templateName = getPendingDeleteTemplate(this.store.getState());

    const onSuccess = ({ message }) => {
      this.dispatcher.setAlert({ message, type: 'success' });
      this.dispatcher.setTemplateListLoadingState(false);
      this.dispatcher.deleteTemplate(templateName);
    };

    const onFailure = (error) => {
      this.dispatcher.setTemplateListLoadingState(false);
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

  handleActionSelect = (name) => (action) => {
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

  subscribeNow = async () => {
    const businessId = getBusinessId(this.store.getState());
    const url = await loadSubscriptionUrl(
      this.integration,
      businessId,
      window.location.href
    );

    if (!url) return;

    window.location.href = url;
  };

  render = () => {
    const salesSettingsView = (
      <SalesSettingsView
        onCloseModal={this.closeModal}
        onConfirmDeleteTemplate={this.onConfirmDeleteTemplate}
        onConfirmSwitchTab={this.onConfirmSwitchTab}
        onDismissAlert={this.dispatcher.dismissAlert}
        onSalesSettingsSave={this.updateSalesSettings}
        onSaveEmailSettings={this.saveEmailSettings}
        onSubscribeNowClick={this.subscribeNow}
        onTabSelect={this.switchTab}
        onUpdateEmailSettings={this.dispatcher.updateEmailSettings}
        onUpdateSalesSettingsItem={this.dispatcher.updateSalesSettingsItem}
        templateHandlers={{
          onCreateTemplate: this.redirectToCreateNewTemplate,
          onSortTemplateList: this.sortTemplateList,
          onActionSelect: this.handleActionSelect,
        }}
        onMarketPlaceClick={this.marketplaceClick}
      />
    );

    this.setRootView(
      <Provider store={this.store}>{salesSettingsView}</Provider>
    );
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

  handlers = { SAVE_ACTION: this.saveHandler };

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.dispatcher.resetState();

  readMessages = () => {
    const [successMessage] = this.popMessages([TEMPLATE_UPDATED]);

    if (successMessage) {
      const { content: message } = successMessage;

      this.dispatcher.setAlert({ type: 'success', message });
    }
  };

  run = (context) => {
    const fullContext = {
      ...context,
      isEInvoicingEnabled: this.featureToggles?.isEInvoicingEnabled,
    };
    this.dispatcher.setInitialState(fullContext);
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    setupHotKeys(keyMap, this.handlers);

    this.render();
    this.readMessages();
    this.loadSalesSettings();

    const showOnlinePaymentOptions = getShowOnlinePaymentOptions(
      this.store.getState()
    );

    if (showOnlinePaymentOptions) this.loadPayDirectSettings();
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

    window.location.href = `/#/${region}/${businessId}/template/${encodeTemplateName(
      name
    )}`;
  };

  marketplaceClick = () => {
    const state = this.store.getState();
    const link = getMarketplaceLink(state);
    this.navigateTo(link, true);
    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'clicked_eInvoicingMarketplace',
        page: 'salesSettings/eInvoicing',
      },
    });
  };
}
