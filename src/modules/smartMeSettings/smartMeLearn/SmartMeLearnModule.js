import { Provider } from 'react-redux';
import React from 'react';

import { trackUserEvent } from '../../../telemetry';
import Config from '../../../Config';
import SmartMeLearnView from './components/SmartMeLearnView';
import Store from '../../../store/Store';
import createSmartMeDispatcher from './createSmartMeDispatcher';
import smartMeReducer from './smartMeReducer';

export default class SmartMeLearnModule {
  constructor({ setRootView, globalCallbacks, navigateTo }) {
    this.setRootView = setRootView;
    this.store = new Store(smartMeReducer);
    this.dispatcher = createSmartMeDispatcher(this.store);
    this.globalCallbacks = globalCallbacks;
    this.navigateTo = navigateTo;
  }

  onClick = () => {
    this.globalCallbacks.smartMEUpdated();
    this.dispatcher.openSmartMeRedirectModal();
    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'clicked_ConnectBills',
        page: 'smartMe/learning',
      },
    });
  };

  onCloseModal = () => {
    this.dispatcher.closeSmartMeRedirectModal();
    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'clicked_cancelOpenSmartMePortal',
        page: 'smartMe/learning',
      },
    });
  };

  onOpenRedirectToSmartMe = () => {
    this.dispatcher.closeSmartMeRedirectModal();
    const url = Config.SMART_ME_URL;
    const openInNewTab = true;
    this.navigateTo(url, openInNewTab);
    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'clicked_continueOpenSmartMePortal',
        page: 'smartMe/learning',
      },
    });
  };

  render = () => {
    const view = (
      <Provider store={this.store}>
        <SmartMeLearnView
          onClick={this.onClick}
          onCancel={this.onCloseModal}
          onContinue={this.onOpenRedirectToSmartMe}
        />
      </Provider>
    );

    this.setRootView(view);
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
