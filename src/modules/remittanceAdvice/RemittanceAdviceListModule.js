import { Provider } from 'react-redux';
import React from 'react';

import RemittanceAdviceListView from './components/RemittanceAdviceListView';
import Store from '../../store/Store';
import createRemittanceAdviceListDispatcher from './createRemittanceAdviceListDispatcher';
import createRemittanceAdviceListIntegrator from './createRemittanceAdviceListIntegrator';
import customerStatementListReducer from './remittanceAdviceListReducer';

export default class RemittanceAdviceListModule {
  constructor({ integration, setRootView }) {
    this.setRootView = setRootView;
    this.store = new Store(customerStatementListReducer);
    this.dispatcher = createRemittanceAdviceListDispatcher(this.store);
    this.integrator = createRemittanceAdviceListIntegrator(
      this.store,
      integration
    );
  }

  render = () => {
    const view = <RemittanceAdviceListView />;

    const wrappedView = <Provider store={this.store}>{view}</Provider>;
    this.setRootView(wrappedView);
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };
}
