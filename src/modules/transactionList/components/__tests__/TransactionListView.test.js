import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { tabItemIds } from '../../tabItems';
import CreditsAndDebitsListView from '../../creditAndDebitTransactions/components/CreditsAndDebitsListView';
import JournalTransactionListView from '../../journalTransaction/components/JournalTransactionListView';
import Store from '../../../../store/Store';
import TrasnactionListView from '../TransactionListView';
import transactionListReducer from '../../transactionListReducer';

describe('TransactionListView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(transactionListReducer);

    const view = (
      <Provider store={store}>
        <TrasnactionListView
          businessId=""
          onUpdateFilters={() => {}}
          onApplyFilter={() => {}}
          onSort={() => {}}
          onDismissAlert={() => {}}
          onCreateNewEntry={() => {}}
          onAddTransaction={() => {}}
          tabViews={{
            [tabItemIds.journal]: {
              getView() {
                return <JournalTransactionListView />;
              },
            },
            [tabItemIds.debitsAndCredits]: {
              getView() {
                return <CreditsAndDebitsListView />;
              },
            },
          }}
        />
      </Provider>
    );
    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
