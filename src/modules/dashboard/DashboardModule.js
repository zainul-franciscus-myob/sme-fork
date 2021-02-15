import { Provider } from 'react-redux';
import React from 'react';

import {
  getInTrayUploadOptionsModalContext,
  getUploadCompleteAlert,
  getUploadingEntry,
  getUploadingErrorMessage,
} from './selectors/DashboardInTraySelectors';
import {
  getShouldShowBanking,
  getShouldShowInTray,
  getShouldShowPayroll,
  getShouldShowPurchases,
  getShouldShowSales,
  getShouldShowTracking,
} from './selectors/DashboardSelectors';
import Config from '../../Config';
import DashboardView from './components/DashboardView';
import InTrayUploadOptionsModalModule from '../inTray/inTrayUploadOptionsModal/InTrayUploadOptionsModalModule';
import Store from '../../store/Store';
import createDashboardDispatcher from './createDashboardDispatcher';
import createDashboardIntegrator from './createDashboardIntegrator';
import dashboardReducer from './reducers/dashboardReducer';
import isFeatureEnabled from '../../common/feature/isFeatureEnabled';

export default class DashboardModule {
  constructor({
    globalCallbacks,
    integration,
    setRootView,
    navigateTo,
    constructPath,
    featureToggles,
  }) {
    this.integration = integration;
    this.store = new Store(dashboardReducer);
    this.setRootView = setRootView;
    this.dispatcher = createDashboardDispatcher(this.store);
    this.integrator = createDashboardIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
    this.inTrayUploadOptionsModalModule = new InTrayUploadOptionsModalModule({
      globalCallbacks,
      integration,
      navigateTo,
    });
    this.globalCallbacks = globalCallbacks;
    this.constructPath = constructPath;
    this.featureToggles = featureToggles;
  }

  loadDashboard = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadDashboard(payload);
      this.loadDashboardTasks();
      this.loadSales();
      this.loadPurchase();
      this.loadTracking();
      this.loadBanking();
      this.loadPayroll();
      this.loadPayrollReports();
      this.loadInTray();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(false);
    };

    this.integrator.loadDashboard({ onSuccess, onFailure });
  };

  loadConfig = () => {
    this.dispatcher.loadConfig({
      myReportsUrl: Config.MY_REPORTS_URL,
    });
  };

  loadDashboardTasks = () => {
    const onSuccess = (dashboardTasks) => {
      this.dispatcher.setDashboardTasks(dashboardTasks);
    };

    const onFailure = () => {};

    this.integrator.loadTasks({ onSuccess, onFailure });
  };

  loadInTray = () => {
    if (!getShouldShowInTray(this.store.getState())) {
      return;
    }

    this.dispatcher.setInTrayErrorState(false);
    this.dispatcher.setInTrayLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setInTrayLoadingState(false);
      this.dispatcher.loadInTray(payload);
    };

    const onFailure = () => {
      this.dispatcher.setInTrayLoadingState(false);
      this.dispatcher.setInTrayErrorState(true);
    };

    this.integrator.loadInTray({ onSuccess, onFailure });
  };

  loadSales = () => {
    if (!getShouldShowSales(this.store.getState())) {
      return;
    }

    this.dispatcher.setSalesErrorState(false);
    this.dispatcher.setSalesLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setSalesLoadingState(false);
      this.dispatcher.loadSales(payload);
    };

    const onFailure = () => {
      this.dispatcher.setSalesLoadingState(false);
      this.dispatcher.setSalesErrorState(true);
    };

    this.integrator.loadSales({ onSuccess, onFailure });
  };

  loadPurchase = () => {
    if (!getShouldShowPurchases(this.store.getState())) {
      return;
    }

    this.dispatcher.setPurchaseErrorState(false);
    this.dispatcher.setPurchaseLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setPurchaseLoadingState(false);
      this.dispatcher.loadPurchase(payload);
    };

    const onFailure = () => {
      this.dispatcher.setPurchaseLoadingState(false);
      this.dispatcher.setPurchaseErrorState(true);
    };

    this.integrator.loadPurchase({ onSuccess, onFailure });
  };

  loadTracking = () => {
    if (!getShouldShowTracking(this.store.getState())) {
      return;
    }

    this.dispatcher.setTrackingErrorState(false);
    this.dispatcher.setTrackingLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setTrackingLoadingState(false);
      this.dispatcher.loadTracking(payload);
    };

    const onFailure = () => {
      this.dispatcher.setTrackingLoadingState(false);
      this.dispatcher.setTrackingErrorState(true);
    };

    this.integrator.loadTracking({ onSuccess, onFailure });
  };

  loadTrackingDetail = () => {
    this.dispatcher.setTrackingErrorState(false);
    this.dispatcher.setTrackingDetailLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setTrackingDetailLoadingState(false);
      this.dispatcher.loadTrackingDetail(payload);
    };

    const onFailure = () => {
      this.dispatcher.setTrackingDetailLoadingState(false);
      this.dispatcher.setTrackingErrorState(true);
    };

    this.integrator.loadTrackingDetail({ onSuccess, onFailure });
  };

  setTrackingOptions = ({ key, value }) => {
    this.dispatcher.setTrackingOptions({ key, value });
    this.loadTrackingDetail();
  };

  loadBanking = () => {
    if (!getShouldShowBanking(this.store.getState())) {
      return;
    }

    this.dispatcher.setBankingErrorState(false);
    this.dispatcher.setBankingLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setBankingLoadingState(false);
      this.dispatcher.loadBanking(payload);
    };

    const onFailure = () => {
      this.dispatcher.setBankingLoadingState(false);
      this.dispatcher.setBankingErrorState(true);
    };

    this.integrator.loadBanking({ onSuccess, onFailure });
  };

  loadPayroll = () => {
    if (!getShouldShowPayroll(this.store.getState())) {
      return;
    }

    this.dispatcher.setPayrollErrorState(false);
    this.dispatcher.setPayrollLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setPayrollLoadingState(false);
      this.dispatcher.loadPayroll(payload);
    };

    const onFailure = () => {
      this.dispatcher.setPayrollLoadingState(false);
      this.dispatcher.setPayrollErrorState(true);
    };

    this.integrator.loadPayroll({ onSuccess, onFailure });
  };

  loadPayrollReports = () => {
    if (!getShouldShowPayroll(this.store.getState())) {
      return;
    }

    this.dispatcher.setPayrollReportsErrorState(false);
    this.dispatcher.setPayrollReportsLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setPayrollReportsLoadingState(false);
      this.dispatcher.loadPayrollReports(payload);
    };

    const onFailure = () => {
      this.dispatcher.setPayrollReportsLoadingState(false);
      this.dispatcher.setPayrollReportsErrorState(true);
    };

    this.integrator.loadPayrollReports({ onSuccess, onFailure });
  };

  updateBankFeedAccount = (bankFeedAccount) => {
    const { id } = bankFeedAccount;
    this.dispatcher.setBankFeedAccount(id);
    this.loadBanking();
  };

  openInTrayUploadOptionsModal = () => {
    const state = this.store.getState();
    const modalContext = getInTrayUploadOptionsModalContext(state);
    this.inTrayUploadOptionsModalModule.run({
      context: modalContext,
    });
  };

  uploadInTrayFiles = (files) => {
    const entries = files.reverse().reduce((acc, file, index) => {
      const errorMessage = getUploadingErrorMessage(file);
      if (errorMessage) {
        this.dispatcher.setInTrayAlert({
          message: errorMessage,
          type: 'danger',
        });

        return acc;
      }

      const entry = getUploadingEntry(index);
      const { uploadId } = entry;

      this.dispatcher.addInTrayEntry(entry);

      return [...acc, { uploadId, file }];
    }, []);

    if (entries.length) {
      this.createInTrayDocuments(entries);
    }
  };

  createInTrayDocuments = (entries) => {
    const onProgress = () => {
      this.dispatcher.setInTrayUploadingState(true);
    };

    const onSuccess = ({ entry }, index) => {
      const { uploadId } = entries[index] || { uploadId: 'none' };

      this.dispatcher.createInTrayDocument(uploadId, entry);
    };

    const onFailure = (response, index) => {
      const { uploadId } = entries[index] || { uploadId: 'none' };

      this.dispatcher.removeInTrayListEntry(uploadId);
    };

    const onComplete = (results) => {
      this.dispatcher.setInTrayUploadingState(false);
      this.dispatcher.setInTrayAlert(getUploadCompleteAlert(results));
    };

    this.integrator.createInTrayDocuments({
      onProgress,
      onSuccess,
      onFailure,
      onComplete,
      entries,
    });
  };

  closeTask = (closeEvent) => {
    const onSuccess = (response) => {
      this.dispatcher.setDashboardTasks(response);
    };

    const onFailure = () => {};

    this.integrator.closeTask({
      onSuccess,
      onFailure,
      closeEvent,
    });
  };

  redirectToUrl = (url) => {
    this.navigateTo(url);
  };

  render = () => {
    const inTrayUploadOptionsModal = this.inTrayUploadOptionsModalModule.render();

    const dashboardView = (
      <DashboardView
        inTrayUploadOptionsModal={inTrayUploadOptionsModal}
        onDismissAlert={this.dispatcher.dismissAlert}
        onLinkClick={this.redirectToUrl}
        onSalesReload={this.loadSales}
        onPurchaseReload={this.loadPurchase}
        onTrackingReload={this.loadTracking}
        onTrackingChange={this.setTrackingOptions}
        onBankingReload={this.loadBanking}
        onPayrollReload={this.loadPayroll}
        onPayrollReportsReload={this.loadPayrollReports}
        onBankFeedAccountChange={this.updateBankFeedAccount}
        inTrayListeners={{
          onDismissAlert: this.dispatcher.dismissInTrayAlert,
          onMoreWaysToUploadButtonClick: this.openInTrayUploadOptionsModal,
          onUpload: this.uploadInTrayFiles,
        }}
        tasksListeners={{
          closeTask: this.closeTask,
          constructPath: this.constructPath,
        }}
      />
    );

    const wrappedView = <Provider store={this.store}>{dashboardView}</Provider>;

    this.setRootView(wrappedView);
  };

  setInitialState = (context) => this.dispatcher.setInitialState(context);

  resetState = () => {
    this.inTrayUploadOptionsModalModule.resetState();
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run = (context) => {
    const isMoveToMyobEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isMoveToMyobEnabled,
    });

    this.setInitialState({
      ...context,
      isMoveToMyobEnabled,
    });
    this.render();
    this.loadConfig();
    this.loadDashboard();
  };
}
