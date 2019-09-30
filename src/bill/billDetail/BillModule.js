import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import { LOAD_BILL_DETAIL } from '../BillIntents';
import { LOAD_NEW_BILL_ITEM_DETAIL } from './billItem/BillItemIntents';
import { LOAD_NEW_BILL_SERVICE_DETAIL } from './billService/BillServiceIntents';
import BillItemModule from './billItem/BillItemModule';
import BillServiceModule from './billService/BillServiceModule';
import createBillIntegrator from './createBillIntegrator';

export default class BillModule {
  constructor({
    integration, setRootView, pushMessage, replaceURLParams,
  }) {
    this.module = undefined;
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.replaceURLParams = replaceURLParams;
    this.integrator = createBillIntegrator(this.integration);
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

  loadBill = (context, intent) => {
    const { businessId, billId } = context;
    const urlParams = {
      businessId,
      billId,
    };

    const onSuccess = payload => this.loadBillModule(context, payload);
    const onFailure = () => console.log('Failed to get initial load');

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  checkBillIdAndLoadBill = (context) => {
    const { billId, businessId } = context;

    if (billId === 'new') {
      const onSuccess = (payload) => {
        const intent = payload.layout === 'service'
          ? LOAD_NEW_BILL_SERVICE_DETAIL
          : LOAD_NEW_BILL_ITEM_DETAIL;
        this.loadBill(context, intent);
      };

      const onFailure = () => console.log('Failed to determine default bill layout');

      this.integrator.loadDefaultBillLayout({ businessId, onSuccess, onFailure });
    } else {
      this.loadBill(context, LOAD_BILL_DETAIL);
    }
  };

  run(context) {
    this.setRootView(<Spinner />);
    this.checkBillIdAndLoadBill(context);
  }

  resetState = () => {
    if (this.module) {
      this.module.resetState();
    }
  };
}
