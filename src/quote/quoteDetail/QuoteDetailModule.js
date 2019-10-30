import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import { LOAD_DUPLICATE_ITEM_QUOTE, LOAD_NEW_ITEM_QUOTE } from './itemQuote/ItemQuoteIntents';
import { LOAD_DUPLICATE_SERVICE_QUOTE, LOAD_NEW_SERVICE_QUOTE } from './serviceQuote/ServiceQuoteIntents';
import { LOAD_QUOTE_DETAIL } from '../QuoteIntents';
import { SUCCESSFULLY_SAVED_ITEM_QUOTE, SUCCESSFULLY_SAVED_SERVICE_QUOTE } from './quoteMessageTypes';
import ItemQuoteModule from './itemQuote/ItemQuoteModule';
import ServiceQuoteModule from './serviceQuote/ServiceQuoteModule';

const messageTypes = [
  SUCCESSFULLY_SAVED_SERVICE_QUOTE,
  SUCCESSFULLY_SAVED_ITEM_QUOTE,
];

export default class QuoteDetailModule {
  constructor({
    integration, setRootView, pushMessage, popMessages, reload, replaceURLParams,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.reload = reload;
    this.replaceURLParams = replaceURLParams;
    this.messageTypes = messageTypes;
  }

  unsubscribeFromStore = () => {
    if (this.module) {
      this.module.unsubscribeFromStore();
    }
  };

  loadQuoteModule = (context, payload, message) => {
    const { layout } = payload;
    const moduleParams = {
      integration: this.integration,
      setRootView: this.setRootView,
      pushMessage: this.pushMessage,
      reload: this.reload,
      replaceURLParams: this.replaceURLParams,
    };
    if (layout === 'service') {
      this.module = new ServiceQuoteModule(moduleParams);
    } else {
      this.module = new ItemQuoteModule(moduleParams);
    }

    this.module.run({
      context, payload, message,
    });
  };

  loadQuote = (context, message) => {
    const { businessId, quoteId, duplicatedQuoteId } = context;
    const urlParams = {
      businessId,
      quoteId,
      duplicatedQuoteId,
    };

    const newServiceIntent = duplicatedQuoteId
      ? LOAD_DUPLICATE_SERVICE_QUOTE
      : LOAD_NEW_SERVICE_QUOTE;
    const newItemIntent = duplicatedQuoteId
      ? LOAD_DUPLICATE_ITEM_QUOTE
      : LOAD_NEW_ITEM_QUOTE;

    const intent = {
      newService: newServiceIntent,
      newItem: newItemIntent,
    }[quoteId] || LOAD_QUOTE_DETAIL;

    const onSuccess = payload => this.loadQuoteModule(context, payload, message);
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
    this.readMessages();
    this.loadQuote(context, this.message);
  }

  readMessages = () => {
    const [message] = this.popMessages(this.messageTypes);
    this.message = message;
  }

  resetState = () => {
    if (this.module) {
      this.module.resetState();
    }
  };
}
