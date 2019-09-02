import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import {
  LOAD_DUPLICATE_INVOICE_ITEM_DETAIL,
  LOAD_NEW_INVOICE_ITEM_DETAIL,
  LOAD_NEW_INVOICE_ITEM_DETAIL_FROM_QUOTE,
} from './invoiceItem/InvoiceItemIntents';
import {
  LOAD_DUPLICATE_INVOICE_SERVICE_DETAIL,
  LOAD_NEW_INVOICE_SERVICE_DETAIL,
  LOAD_NEW_INVOICE_SERVICE_DETAIL_FROM_QUOTE,
} from './invoiceService/InvoiceServiceIntents';
import { LOAD_INVOICE_DETAIL } from '../InvoiceIntents';
import { SUCCESSFULLY_EMAILED_INVOICE, SUCCESSFULLY_SAVED_INVOICE_ITEM, SUCCESSFULLY_SAVED_INVOICE_SERVICE } from './invoiceMessageTypes';
import InvoiceItemModule from './invoiceItem/InvoiceItemModule';
import InvoiceServiceModule from './invoiceService/InvoiceServiceModule';

const messageTypes = [
  SUCCESSFULLY_SAVED_INVOICE_ITEM,
  SUCCESSFULLY_SAVED_INVOICE_SERVICE,
  SUCCESSFULLY_EMAILED_INVOICE,
];
export default class InvoiceModule {
  constructor({
    integration, setRootView, pushMessage, popMessages, replaceURLParams, reload,
  }) {
    this.module = undefined;
    this.integration = integration;
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.pushMessage = pushMessage;
    this.messageTypes = messageTypes;
    this.replaceURLParams = replaceURLParams;
    this.reload = reload;
  }

  unsubscribeFromStore = () => {
    if (this.module) {
      this.module.unsubscribeFromStore();
    }
  };

  loadInvoiceModule = (context, payload, message) => {
    const { layout } = payload;
    const moduleParams = {
      integration: this.integration,
      setRootView: this.setRootView,
      pushMessage: this.pushMessage,
      replaceURLParams: this.replaceURLParams,
      reload: this.reload,
    };
    if (layout === 'service') {
      this.module = new InvoiceServiceModule(moduleParams);
    } else {
      this.module = new InvoiceItemModule(moduleParams);
    }
    this.module.run({ context, payload, message });
  };

  getLoadNewInvoiceServiceIntent = (context) => {
    if (context.quoteId) {
      return LOAD_NEW_INVOICE_SERVICE_DETAIL_FROM_QUOTE;
    } if (context.duplicatedInvoiceId) {
      return LOAD_DUPLICATE_INVOICE_SERVICE_DETAIL;
    }
    return LOAD_NEW_INVOICE_SERVICE_DETAIL;
  }

  getLoadNewInvoiceItemIntent = (context) => {
    if (context.quoteId) {
      return LOAD_NEW_INVOICE_ITEM_DETAIL_FROM_QUOTE;
    } if (context.duplicatedInvoiceId) {
      return LOAD_DUPLICATE_INVOICE_ITEM_DETAIL;
    }
    return LOAD_NEW_INVOICE_ITEM_DETAIL;
  }

  loadInvoice = (context, message) => {
    const {
      businessId, invoiceId, quoteId, duplicatedInvoiceId,
    } = context;
    const urlParams = {
      businessId,
      invoiceId,
      quoteId,
      duplicatedInvoiceId,
    };

    const newServiceIntent = this.getLoadNewInvoiceServiceIntent(context);
    const newItemIntent = this.getLoadNewInvoiceItemIntent(context);

    const intent = {
      newService: newServiceIntent,
      newItem: newItemIntent,
    }[invoiceId] || LOAD_INVOICE_DETAIL;

    const onSuccess = payload => this.loadInvoiceModule(context, payload, message);
    const onFailure = () => console.log('Failed to get initial load');

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  readMessages = () => {
    const [message] = this.popMessages(this.messageTypes);
    this.message = message;
  }

  run(context) {
    this.setRootView(<Spinner />);
    this.readMessages();
    this.loadInvoice(context, this.message);
  }

  resetState = () => {
    if (this.module) {
      this.module.resetState();
    }
  };
}
