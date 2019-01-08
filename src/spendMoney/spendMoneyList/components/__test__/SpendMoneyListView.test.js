import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import SpendMoneyListView from '../SpendMoneyListView';
import Store from '../../../../store/Store';
import spendMoneyListReducer from '../../spendMoneyListReducer';

describe('SpendMoneyListView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(spendMoneyListReducer);

    const view = (
      <Provider store={store}>
        <SpendMoneyListView
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
