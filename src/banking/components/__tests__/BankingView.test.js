import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import BankingView from '../BankingView';
import Store from '../../../store/Store';
import bankingReducer from '../../bankingReducer';

describe('TransactionListView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(bankingReducer);

    const view = (
      <Provider store={store}>
        <BankingView
          businessId=""
          onUpdateFilters={() => {}}
          onApplyFilter={() => {}}
          onSort={() => {}}
          onDismissAlert={() => {}}
        />
      </Provider>
    );
    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
