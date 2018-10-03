import React from 'react';

import { getHeaderOptions } from './GeneralJournalDetailSelectors';
import GeneralJournalDetailView from './components/GeneralJournalDetailView';
import GeneralJournalIntents from './GeneralJournalIntents';
import Store from '../store/Store';
import generalJournalDetailReducer from './generalJournalDetailReducer';

export default class GeneralJournalDetailModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(generalJournalDetailReducer);
    this.setRootView = setRootView;
    this.businessId = '';
  }

  loadGeneralJournalDetail = () => {
    const intent = GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL;

    const urlParams = {
      businessId: this.businessId,
      referenceId: this.referenceId,
    };

    const onSuccess = ({ generalJournal, accounts }) => {
      this.store.publish({
        intent,
        generalJournal,
        accounts,
      });
    };

    const onFailure = () => {
      console.log('Failed to load general journal details');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  updateHeaderOptions = ({ key, value }) => {
    const intent = GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_HEADER_OPTIONS;

    this.store.publish({
      intent,
      key,
      value,
    });
  }

  render = (state) => {
    this.setRootView(<GeneralJournalDetailView
      headerOptions={getHeaderOptions(state)}
      onUpdateHeaderOptions={this.updateHeaderOptions}
    />);
  };

  run(context) {
    this.businessId = context.businessId;
    this.referenceId = context.referenceId;
    this.store.subscribe(this.render);
    this.loadGeneralJournalDetail();
  }
}
