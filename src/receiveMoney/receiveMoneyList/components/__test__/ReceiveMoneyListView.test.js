import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import ReceiveMoneyListView from '../ReceiveMoneyListView';
import Store from '../../../../store/Store';
import receiveMoneyListReducer from '../../receiveMoneyListReducer';

describe('ReceiveMoneyListView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(receiveMoneyListReducer);

    const view = (
      <Provider store={store}>
        <ReceiveMoneyListView
          bussinessId=""
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
