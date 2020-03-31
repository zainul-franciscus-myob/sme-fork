import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { tabItemIds } from '../../tabItems';
import Store from '../../../../store/Store';
import TransactionListView from '../TransactionListView';
import transactionListReducer from '../../transactionListReducer';

describe('TransactionListView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(transactionListReducer);

    const view = (
      <Provider store={store}>
        <TransactionListView
          selectedTab={tabItemIds.debitsAndCredits}
          onTabSelected={() => {}}
          alert={{ type: 'danger', message: 'some-message ' }}
          onDismissAlert={() => {}}
          pageHeadTitle={'Some Title'}
          onUpdateFilters={() => {}}
          onPeriodChange={() => {}}
          onSort={() => {}}
          onLoadMoreButtonClick={() => {}}
        />
      </Provider>
    );
    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
