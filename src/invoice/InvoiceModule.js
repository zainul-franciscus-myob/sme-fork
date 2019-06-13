import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import { LOAD_INVOICE_DETAIL } from './InvoiceIntents';
import { LOAD_NEW_INVOICE_ITEM_DETAIL } from './invoiceItem/InvoiceItemIntents';
import { LOAD_NEW_INVOICE_SERVICE_DETAIL } from './invoiceService/InvoiceServiceIntents';
import InvoiceItemModule from './invoiceItem/InvoiceItemModule';
import InvoiceServiceModule from './invoiceService/InvoiceServiceModule';

export default class InvoiceModule {
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
  };

  loadInvoiceModule = (context, payload) => {
    const { layout } = payload;
    const moduleParams = {
      integration: this.integration,
      setRootView: this.setRootView,
      pushMessage: this.pushMessage,
      replaceUrlParams: this.replaceURLParams,
    };
    if (layout === 'service') {
      this.module = new InvoiceServiceModule(moduleParams);
    } else {
      this.module = new InvoiceItemModule(moduleParams);
    }
    this.module.run({ context, payload });
  };

  loadInvoice = (context) => {
    const { businessId, invoiceId } = context;
    const urlParams = {
      businessId,
      invoiceId,
    };
    const intent = {
      newService: LOAD_NEW_INVOICE_SERVICE_DETAIL,
      newItem: LOAD_NEW_INVOICE_ITEM_DETAIL,
    }[invoiceId] || LOAD_INVOICE_DETAIL;

    const onSuccess = payload => this.loadInvoiceModule(context, payload);
    const onFailure = () => console.log('Failed to get initial load');

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  run(context) {
    this.setRootView(<Spinner />);
    this.loadInvoice(context);
  }

  resetState = () => {
    if (this.module) {
      this.module.resetState();
    }
  };
}
