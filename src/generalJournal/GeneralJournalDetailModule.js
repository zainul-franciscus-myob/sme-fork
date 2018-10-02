import React from 'react';

import GeneralJournalDetailView from './components/GeneralJournalDetailView';
import Store from '../store/Store';
import generalJournalDetailReducer from './generalJournalDetailReducer';

export default class GeneralJournalDetailModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(generalJournalDetailReducer);
    this.setRootView = setRootView;
    this.businessId = '';
  }

  render = () => {
    this.setRootView(<GeneralJournalDetailView />);
  };

  run(context) {
    this.businessId = context.businessId;
    console.log('Journal ID: ', context.generalJournalId);
    this.store.subscribe(this.render);
    this.render();
  }
}
