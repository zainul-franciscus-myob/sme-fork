import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_CONFIG,
  LOAD_NAVIGATION_CONFIG,
  SET_JOB_TOGGLE_STATUS,
  SET_LOADING_STATE,
  SET_ROUTE_INFO,
  SET_URLS,
} from './NavigationIntents';
import { RESET_STATE } from '../SystemIntents';
import { featuresConfig } from './navConfig';
import {
  getBusinessId,
  getPaymentDetailUrl,
  getProductManagementUrl,
  getRegion,
  getReportsUrl,
  getShowUrls,
  getUserEmail,
} from './NavigationSelectors';
import { logout } from '../Auth';
import FeatureToggle from '../FeatureToggles.js';
import NavigationBar from './components/NavigationBar';
import RouteName from '../router/RouteName';
import Store from '../store/Store';
import loadChangePlanUrl from '../modules/settings/subscription/loadChangePlanUrl';
import loadSubscriptionUrl from '../modules/settings/subscription/loadSubscriptionUrl';
import navReducer from './navReducer';

export default class NavigationModule {
  constructor({
    integration,
    setNavigationView,
    constructPath,
    replaceURLParamsAndReload,
    config,
    toggleHelp,
    toggleTasks,
    isToggleOn,
    recordPageVisit,
    trackUserEvent,
    navigateTo,
  }) {
    this.integration = integration;
    this.setNavigationView = setNavigationView;
    this.constructPath = constructPath;
    this.store = new Store(navReducer);
    this.replaceURLParamsAndReload = replaceURLParamsAndReload;
    this.onPageTransition = undefined;
    this.config = config;
    this.toggleHelp = toggleHelp;
    this.toggleTasks = toggleTasks;
    this.isToggleOn = isToggleOn;
    this.recordPageVisit = recordPageVisit;
    this.trackUserEvent = trackUserEvent;
    this.navigateTo = navigateTo;
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
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    const urls = Object.entries(featuresConfig)
      .map(([key, feature]) => ({
        [key]: this.buildUrl({
          region,
          businessId,
          key,
          feature,
          reportsUrl,
          paymentDetailUrl,
          productManagementUrl,
        }),
      }))
      .reduce((acc, obj) => ({ ...acc, ...obj }), {});

    this.store.dispatch({
      intent: SET_URLS,
      urls,
    });
  };

  buildUrl = ({
    region,
    businessId,
    key,
    feature,
    reportsUrl,
    paymentDetailUrl,
    productManagementUrl,
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
      default:
        return `/#${this.constructPath(feature.routeName, {
          region,
          businessId,
          ...feature.params,
        })}`;
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
    });
  };

  setJobToggleStatus = () => {
    this.store.dispatch({
      intent: SET_JOB_TOGGLE_STATUS,
      isJobEnabled: this.isToggleOn(FeatureToggle.EssentialsJobs),
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
    const telemetryProps = {
      ...this.routeProps,
      currentRouteName: 'createNewBusiness',
      telemetryData: {
        businessId: this.routeProps.routeParams.businessId,
      },
    };
    this.recordPageVisit(telemetryProps);
    this.redirectToPage(this.config.CREATE_BUSINESS_URL);
  };

  manageMyProduct = () => {
    const state = this.store.getState();
    const userEmail = getUserEmail(state);
    const productManagementUrl = getProductManagementUrl(state);
    const businessId = getBusinessId(state);

    const telemetryData = {
      eventName: 'manageMyProduct',
      eventProperties: {
        businessId,
        userEmail,
        timestamp: +new Date(),
      },
    };

    this.trackUserEvent(telemetryData);
    this.navigateTo(productManagementUrl, true);
  };

  changePlan = async () => {
    const businessId = getBusinessId(this.store.getState());
    const url = await loadChangePlanUrl(
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

  render = (
    tasks,
    businessId = '',
    businessName = '',
    serialNumber = '',
    businessRole = ''
  ) => {
    const {
      changePlan,
      constructPath,
      createBusiness,
      onPageTransition,
      redirectToPage,
      store,
      subscribeNow,
      toggleHelp,
      toggleTasks,
      manageMyProduct,
    } = this;

    return (
      <Provider store={store}>
        <NavigationBar
          businessId={businessId}
          businessName={businessName}
          businessRole={businessRole}
          constructPath={constructPath}
          hasTasks={tasks && tasks.some((t) => !t.isComplete)}
          onChangePlanClick={changePlan}
          onCreateBusinessClick={createBusiness}
          onHelpLinkClick={toggleHelp}
          onLogoutLinkClick={() => logout(true)}
          onMenuLinkClick={onPageTransition}
          onMenuSelect={redirectToPage}
          onSubscribeNowClick={subscribeNow}
          onTasksLinkClick={toggleTasks}
          serialNumber={serialNumber}
          onManageMyProductClick={manageMyProduct}
        />
      </Provider>
    );
  };

  setOnPageTransition = (onPageTransition) => {
    this.onPageTransition = onPageTransition;
  };

  run = (routeProps) => {
    const { routeParams, currentRouteName, onPageTransition } = routeProps;
    this.routeProps = routeProps;

    const previousBusinessId = getBusinessId(this.store.getState());
    const currentBusinessId = routeParams.businessId;

    this.setJobToggleStatus();
    this.loadConfig();
    this.buildAndSetRoutingInfo({ currentRouteName, routeParams });
    this.setOnPageTransition(onPageTransition);

    if (previousBusinessId !== currentBusinessId && currentBusinessId) {
      this.loadBusinessInfo();
      this.store.dispatch({ intent: RESET_STATE });
    }
  };
}
