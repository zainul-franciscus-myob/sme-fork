import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import { LOAD_INVOICE_DETAIL } from '../InvoiceIntents';
import {
  LOAD_NEW_INVOICE_ITEM_DETAIL,
  LOAD_NEW_INVOICE_ITEM_DETAIL_FROM_QUOTE,
} from './invoiceItem/InvoiceItemIntents';
import {
  LOAD_NEW_INVOICE_SERVICE_DETAIL,
  LOAD_NEW_INVOICE_SERVICE_DETAIL_FROM_QUOTE,
} from './invoiceService/InvoiceServiceIntents';
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
    integration, setRootView, pushMessage, popMessages, replaceURLParams,
  }) {
    this.module = undefined;
    this.integration = integration;
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.pushMessage = pushMessage;
    this.messageTypes = messageTypes;
    this.replaceURLParams = replaceURLParams;
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
    };
    if (layout === 'service') {
      this.module = new InvoiceServiceModule(moduleParams);
    } else {
      this.module = new InvoiceItemModule(moduleParams);
    }
    this.module.run({ context, payload, message });
  };

  loadInvoice = (context, message) => {
    const { businessId, invoiceId, quoteId } = context;
    const urlParams = {
      businessId,
      invoiceId,
      quoteId,
    };

    const newServiceIntent = quoteId
      ? LOAD_NEW_INVOICE_SERVICE_DETAIL_FROM_QUOTE
      : LOAD_NEW_INVOICE_SERVICE_DETAIL;
    const newItemIntent = quoteId
      ? LOAD_NEW_INVOICE_ITEM_DETAIL_FROM_QUOTE
      : LOAD_NEW_INVOICE_ITEM_DETAIL;

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
