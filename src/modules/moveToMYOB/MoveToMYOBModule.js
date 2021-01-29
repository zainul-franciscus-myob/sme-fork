import { Provider } from 'react-redux';
import React from 'react';

import { trackUserEvent } from '../../telemetry';
import LoadingState from '../../components/PageView/LoadingState';
import MoveToMYOBView from './components/MoveToMYOBView';
import Store from '../../store/Store';
import createMoveToMYOBDispatcher from './CreateMoveToMYOBDispatcher';
import createMoveToMYOBIntegrator from './CreateMoveToMYOBIntegrator';
import moveToMYOBReducer from './MoveToMYOBReducer';

export default class MoveToMYOBModule {
  constructor({ integration, setRootView, navigateTo }) {
    this.store = new Store(moveToMYOBReducer);
    this.setRootView = setRootView;
    this.navigateTo = navigateTo;
    this.integrator = createMoveToMYOBIntegrator(this.store, integration);
    this.dispatcher = createMoveToMYOBDispatcher(this.store);
  }

  getSerialNumber = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setSerialNumber(response.serialNumber);
    };

    const onFailure = () =>
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    this.integrator.getSerialNumber({ onSuccess, onFailure });
  };

  onGetStartedClick = (url) => {
    trackUserEvent({
      eventName: 'elementClicked',
      customProperties: {
        action: 'get_started_button_clicked',
        page: 'Move to MYOB',
      },
    });

    this.navigateTo(url, true);
  };

  render = () =>
    this.setRootView(
      <Provider store={this.store}>
        <MoveToMYOBView onGetStartedClick={this.onGetStartedClick} />
      </Provider>
    );

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
    this.getSerialNumber();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
