import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import Store from '../../../../../store/Store';
import TaxListView from '../TaxListView';
import taxListReducer from '../../taxListReducer';

describe('TaxListView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(taxListReducer);

    const view = (
      <Provider store={store}>
        <TaxListView />
      </Provider>
    );
    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
