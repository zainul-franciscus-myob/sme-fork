import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import Store from '../../../store/Store';
import TrasnactionListView from '../TransactionListView';
import transactionListReducer from '../../transactionListReducer';

describe('TransactionListView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(transactionListReducer);

    const view = (
      <Provider store={store}>
        <TrasnactionListView
          bussinessId=""
          onUpdateFilters={() => {}}
          onApplyFilter={() => {}}
          onSort={() => {}}
          onDismissAlert={() => {}}
          onCreateNewEntry={() => {}}
        />
      </Provider>
    );
    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
