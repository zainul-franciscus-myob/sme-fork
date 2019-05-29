import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import { LOAD_BILL_DETAIL, LOAD_NEW_BILL_ITEM_DETAIL, LOAD_NEW_BILL_SERVICE_DETAIL } from './BillIntents';
import BillItemModule from './billItems/BillItemsModule';
import BillServiceModule from './billService/BillServiceModule';

export default class BillModule {
  constructor({
    integration, setRootView, pushMessage, replaceURLParams,
  }) {
    this.module = undefined;
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.replaceURLParams = replaceURLParams;
  }

  unsubscribeFromStore = () => {
    if (this.module) {
      this.module.unsubscribeFromStore();
    }
  }

  loadBillModule = (context, payload) => {
    const { layout } = payload;
    const moduleParams = {
      integration: this.integration,
      setRootView: this.setRootView,
      pushMessage: this.pushMessage,
      replaceUrlParams: this.replaceURLParams,
    };
    if (layout === 'service') {
      this.module = new BillServiceModule(moduleParams);
    } else {
      this.module = new BillItemModule(moduleParams);
    }
    this.module.run({ context, payload });
  }

  loadBill = (context) => {
    const { businessId, billId } = context;
    const urlParams = {
      businessId,
      billId,
    };
    const intent = {
      newService: LOAD_NEW_BILL_SERVICE_DETAIL,
      newItem: LOAD_NEW_BILL_ITEM_DETAIL,
    }[billId] || LOAD_BILL_DETAIL;

    const onSuccess = payload => this.loadBillModule(context, payload);
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
    this.loadBill(context);
  }

  resetState = () => {
    if (this.module) {
      this.module.resetState();
    }
  };
}
