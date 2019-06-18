import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import { LOAD_SUPER_FUND } from './SuperFundIntents';
import SuperFundNoPaySuperModule from './superFundNoPaySuper/SuperFundNoPaySuperModule';
import SuperFundSelfManagedModule from './superFundSelfManaged/SuperFundSelfManagedModule';

export default class SuperFundModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.module = undefined;
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  unsubscribeFromStore = () => {
    if (this.module) {
      this.module.unsubscribeFromStore();
    }
  }

  loadSuperFundModule = (context, payload) => {
    const { isPaySuperEnabled } = payload;
    const moduleParams = {
      integration: this.integration,
      setRootView: this.setRootView,
      pushMessage: this.pushMessage,
    };
    if (isPaySuperEnabled) {
      this.module = new SuperFundSelfManagedModule(moduleParams);
    } else {
      this.module = new SuperFundNoPaySuperModule(moduleParams);
    }
    this.module.run({ context, payload });
  }

  loadSuperFund = (context) => {
    const { businessId, superFundId } = context;
    const urlParams = {
      businessId,
      superFundId,
    };
    const intent = LOAD_SUPER_FUND;

    const onSuccess = payload => this.loadSuperFundModule(context, payload);
    const onFailure = () => console.log('Failed to get initial load');

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  run(context) {
    this.setRootView(<Spinner />);
    this.loadSuperFund(context);
  }

  resetState = () => {
    if (this.module) {
      this.module.resetState();
    }
  };
}
