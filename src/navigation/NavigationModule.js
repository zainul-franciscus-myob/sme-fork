import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_CONFIG,
  LOAD_NAVIGATION_CONFIG,
  SET_DISPLAY_ACCOUNT_BILLING_MENU_TEXT,
  SET_IS_NON_GST_FEATURE_TOGGLE,
  SET_LOADING_STATE,
  SET_MOVE_TO_MYOB_FEATURE_TOGGLE,
  SET_NZPAYROLL_ACCOUNTING_FEATURE_TOGGLE,
  SET_NZPAYROLL_PAYRUNS_VIEW_FEATURE_TOGGLE,
  SET_PAYDAY_FILING_FEATURE_TOGGLE,
  SET_PURCHASE_ORDER_FEATURE_TOGGLE,
  SET_RECURRING_TRANSACTION_FEATURE_TOGGLE,
  SET_ROUTE_INFO,
  SET_URLS,
} from './NavigationIntents';
import { RESET_STATE } from '../SystemIntents';
import { featuresConfig } from './navConfig';
import {
  getAppMarketplaceUrl,
  getBusinessId,
  getCreateNewBusinessUrl,
  getMoveToMYOBUrl,
  getMyobTeamUrl,
  getPaymentDetailUrl,
  getProductManagementUrl,
  getReportsUrl,
  getShowUrls,
  getUserEmail,
} from './NavigationSelectors';
import { isToggleOn } from '../splitToggle';
import { logout } from '../Auth';
import { recordPageVisit, trackUserEvent } from '../telemetry';
import FeatureToggles from '../FeatureToggles';
import ModuleAction from '../common/types/ModuleAction';
import NavigationBar from './components/NavigationBar';
import RouteName from '../router/RouteName';
import Store from '../store/Store';
import isFeatureEnabled from '../common/feature/isFeatureEnabled';
import loadSubscriptionUrl from '../modules/settings/subscription/loadSubscriptionUrl';
import navReducer from './navReducer';

export default class NavigationModule {
  constructor({
    integration,
    constructPath,
    replaceURLParamsAndReload,
    config,
    toggleHelp,
    featureToggles,
    toggleTasks,
    navigateTo,
  }) {
    this.integration = integration;
    this.constructPath = constructPath;
    this.store = new Store(navReducer);
    this.replaceURLParamsAndReload = replaceURLParamsAndReload;
    this.onPageTransition = undefined;
    this.config = config;
    this.featureToggles = featureToggles;
    this.toggleHelp = toggleHelp;
    this.toggleTasks = toggleTasks;
    this.navigateTo = navigateTo;
    this.shouldDisplayAccountBillingMenuText =
      featureToggles?.shouldDisplayAccountBillingMenuText;
    this.isNonGSTEnabled = featureToggles?.isNonGSTEnabled;
  }

  setLoadingState = (isLoading) => {
    this.store.dispatch({ intent: SET_LOADING_STATE, isLoading });
  };

  loadBusinessInfo = () => {
    const state = this.store.getState();

    if (!getShowUrls(state)) return;

    this.setLoadingState(true);

    const businessId = getBusinessId(this.store.getState());
    const intent = LOAD_NAVIGATION_CONFIG;
    const urlParams = { businessId };
    const onSuccess = (config) => {
      this.setLoadingState(false);
      this.store.dispatch({ ...config, intent });
      this.replaceURLParamsAndReload({
        businessId,
        region: config.region.toLowerCase(),
      });
      // TODO: To be removed in next patch version
      // This is a temporary fix for Feelix bug introduced in version 5.10.0
      window.dispatchEvent(new Event('resize'));
      this.buildUrls();
    };

    const onFailure = () => {
      this.setLoadingState(false);
      // eslint-disable-next-line no-console
      console.log('Failed to load navigation config');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  buildUrls = () => {
    const state = this.store.getState();
    const reportsUrl = getReportsUrl(state);
    const paymentDetailUrl = getPaymentDetailUrl(state);
    const productManagementUrl = getProductManagementUrl(state);
    const myobTeamUrl = getMyobTeamUrl(state);
    const appMarketplaceUrl = getAppMarketplaceUrl(state);
    const moveToMYOBUrl = getMoveToMYOBUrl(state);

    const urls = Object.entries(featuresConfig).reduce(
      (acc, [key, feature]) => {
        acc[key] = this.buildUrl({
          key,
          feature,
          reportsUrl,
          paymentDetailUrl,
          productManagementUrl,
          myobTeamUrl,
          appMarketplaceUrl,
          moveToMYOBUrl,
        });
        return acc;
      },
      {}
    );

    this.store.dispatch({
      intent: SET_URLS,
      urls,
    });
  };

  buildUrl = ({
    key,
    feature,
    reportsUrl,
    paymentDetailUrl,
    productManagementUrl,
    myobTeamUrl,
    appMarketplaceUrl,
    moveToMYOBUrl,
  }) => {
    switch (key) {
      case RouteName.REPORTS_PDF_STYLE_TEMPLATES:
        return `${reportsUrl}/pdfStyleTemplates`;
      case RouteName.REPORTS_STANDARD:
        return `${reportsUrl}/reports/standardReports`;
      case RouteName.REPORTS_FAVOURITE:
        return `${reportsUrl}/reports/favouriteReports`;
      case RouteName.REPORTS_CUSTOM:
        return `${reportsUrl}/reports/customReports`;
      case RouteName.REPORTS_EXCEPTION:
        return `${reportsUrl}/reports/exceptionsReports`;
      case RouteName.REPORTS_PACK_BUILDER:
        return `${reportsUrl}/reports/reportPackBuilder`;
      case RouteName.REPORT_SETTINGS:
        return `${reportsUrl}/reportSettings`;
      case RouteName.PAYMENT_DETAIL:
        return paymentDetailUrl;
      case RouteName.PRODUCT_MANAGEMENT_DETAIL:
        return productManagementUrl;
      case RouteName.MYOB_TEAM_LINK:
        return myobTeamUrl;
      case RouteName.APP_MARKETPLACE:
        return appMarketplaceUrl;
      case RouteName.MOVE_TO_MYOB:
        return moveToMYOBUrl;
      default:
        return `/#${this.constructPath(feature.routeName, feature.params)}`;
    }
  };

  buildAndSetRoutingInfo = ({ currentRouteName, routeParams }) => {
    this.store.dispatch({
      intent: SET_ROUTE_INFO,
      currentRouteName,
      routeParams,
    });
  };

  loadConfig = () => {
    this.store.dispatch({
      intent: LOAD_CONFIG,
      selfServicePortalUrl: this.config.SELF_SERVICE_PORTAL_URL,
      myReportsUrl: this.config.MY_REPORTS_URL,
      myobUrl: this.config.MYOB_URL,
      myobTeamUrl: this.config.MYOB_TEAM_URL,
    });
  };

  redirectToPage = (url) => {
    window.location.href = url;
  };

  subscribeNow = async () => {
    const businessId = getBusinessId(this.store.getState());
    const url = await loadSubscriptionUrl(
      this.integration,
      businessId,
      window.location.href
    );

    if (!url) {
      // eslint-disable-next-line no-console
      console.warn('"Subscription details" url has no value');
      return;
    }

    this.redirectToPage(url);
  };

  createBusiness = async () => {
    recordPageVisit({
      ...this.routeProps,
      currentRouteName: 'createNewBusiness',
    });

    this.redirectToPage(getCreateNewBusinessUrl(this.store.getState()));
  };

  manageMyProduct = () => {
    const state = this.store.getState();

    trackUserEvent({
      eventName: 'manageMyProduct',
      customProperties: { userEmail: getUserEmail(state) },
    });

    this.navigateTo(getProductManagementUrl(state), true);
  };

  moveToMYOB = () => {
    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'move_to_myob_nav_link_clicked',
      },
    });

    this.navigateTo(getMoveToMYOBUrl(this.store.getState()));
  };

  render = (tasks, businessName = '', serialNumber = '', businessRole = '') => {
    const {
      createBusiness,
      manageMyProduct,
      moveToMYOB,
      onPageTransition,
      redirectToPage,
      store,
      subscribeNow,
      toggleHelp,
      toggleTasks,
    } = this;

    return (
      <Provider store={store}>
        <NavigationBar
          businessName={businessName}
          businessRole={businessRole}
          hasTasks={tasks && tasks.some((t) => !t.isComplete)}
          onCreateBusinessClick={createBusiness}
          onHelpLinkClick={toggleHelp}
          onLogoutLinkClick={() => logout(true)}
          onManageMyProductClick={manageMyProduct}
          onMenuLinkClick={onPageTransition}
          onMenuSelect={redirectToPage}
          onMoveToMYOBClick={moveToMYOB}
          onSubscribeNowClick={subscribeNow}
          onTasksLinkClick={toggleTasks}
          serialNumber={serialNumber}
        />
      </Provider>
    );
  };

  setOnPageTransition = (onPageTransition) => {
    this.onPageTransition = onPageTransition;
  };

  setRecurringTransactionFeatureToggle = () => {
    const isRecurringTransactionEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isRecurringTransactionEnabled,
      isEarlyAccess: isToggleOn(FeatureToggles.RecurringTransactions),
    });

    this.store.dispatch({
      intent: SET_RECURRING_TRANSACTION_FEATURE_TOGGLE,
      isRecurringTransactionEnabled,
    });
  };

  setPurchaseOrderFeatureToggle = () => {
    const isPurchaseOrderEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isPurchaseOrderEnabled,
      isEarlyAccess: isToggleOn(FeatureToggles.PurchaseOrders),
    });

    this.store.dispatch({
      intent: SET_PURCHASE_ORDER_FEATURE_TOGGLE,
      isPurchaseOrderEnabled,
    });
  };

  setPayRunsViewFeatureToggle = () => {
    const isNzPayRunsViewEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isNzPayRunsViewEnabled,
    });

    this.store.dispatch({
      intent: SET_NZPAYROLL_PAYRUNS_VIEW_FEATURE_TOGGLE,
      isNzPayRunsViewEnabled,
    });
  };

  setNzPayrollAccountingFeatureToggle = () => {
    const isNzPayrollAccountingEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isNzPayrollAccountingEnabled,
    });

    this.store.dispatch({
      intent: SET_NZPAYROLL_ACCOUNTING_FEATURE_TOGGLE,
      isNzPayrollAccountingEnabled,
    });
  };

  setPaydayFilingFeatureToggle = () => {
    const isPaydayFilingEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isPaydayFilingEnabled,
    });

    this.store.dispatch({
      intent: SET_PAYDAY_FILING_FEATURE_TOGGLE,
      isPaydayFilingEnabled,
    });
  };

  setAccountBillingMenuTextFeatureToggle = () => {
    this.store.dispatch({
      intent: SET_DISPLAY_ACCOUNT_BILLING_MENU_TEXT,
      shouldDisplayAccountBillingMenuText: this
        .shouldDisplayAccountBillingMenuText,
    });
  };

  setIsNonGSTFeatureToggle = () => {
    this.store.dispatch({
      intent: SET_IS_NON_GST_FEATURE_TOGGLE,
      isNonGSTEnabled: this.isNonGSTEnabled,
    });
  };

  setMoveToMyobFeatureToggle = () => {
    const isMoveToMyobEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isMoveToMyobEnabled,
    });

    this.store.dispatch({
      intent: SET_MOVE_TO_MYOB_FEATURE_TOGGLE,
      isMoveToMyobEnabled,
    });
  };

  run = ({ routeProps, onPageTransition, action = {} }) => {
    const { routeParams, currentRouteName } = routeProps;
    this.routeProps = routeProps;

    this.loadConfig();
    this.buildAndSetRoutingInfo({ currentRouteName, routeParams });
    this.setOnPageTransition(onPageTransition);
    this.setRecurringTransactionFeatureToggle();
    this.setPayRunsViewFeatureToggle();
    this.setNzPayrollAccountingFeatureToggle();
    this.setPaydayFilingFeatureToggle();
    this.setAccountBillingMenuTextFeatureToggle();
    this.setPurchaseOrderFeatureToggle();
    this.setMoveToMyobFeatureToggle();
    this.setIsNonGSTFeatureToggle();
    if (action[ModuleAction.LOAD_BUSINESS]) {
      this.loadBusinessInfo();
      this.store.dispatch({ intent: RESET_STATE });
    }
  };
}
