import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import { LOAD_NEW_ITEM_QUOTE } from './itemQuote/ItemQuoteIntents';
import { LOAD_NEW_SERVICE_QUOTE } from './serviceQuote/ServiceQuoteIntents';
import { LOAD_QUOTE_DETAIL } from '../QuoteIntents';
import ItemQuoteModule from './itemQuote/ItemQuoteModule';
import ServiceQuoteModule from './serviceQuote/ServiceQuoteModule';

export default class QuoteDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  unsubscribeFromStore = () => {
    if (this.module) {
      this.module.unsubscribeFromStore();
    }
  };

  loadQuoteModule = (context, payload) => {
    const { layout } = payload;
    const moduleParams = {
      integration: this.integration,
      setRootView: this.setRootView,
      pushMessage: this.pushMessage,
    };
    if (layout === 'service') {
      this.module = new ServiceQuoteModule(moduleParams);
    } else {
      this.module = new ItemQuoteModule(moduleParams);
    }
    this.module.run({ context, payload });
  };

  loadQuote = (context) => {
    const { businessId, quoteId } = context;
    const urlParams = {
      businessId,
      quoteId,
    };
    const intent = {
      newService: LOAD_NEW_SERVICE_QUOTE,
      newItem: LOAD_NEW_ITEM_QUOTE,
    }[quoteId] || LOAD_QUOTE_DETAIL;

    const onSuccess = payload => this.loadQuoteModule(context, payload);
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
    this.loadQuote(context);
  }

  resetState = () => {
    if (this.module) {
      this.module.resetState();
    }
  };
}
