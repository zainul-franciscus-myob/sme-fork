import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import QuoteListView from '../QuoteListView';
import Store from '../../../../store/Store';
import quoteListReducer from '../../quoteListReducer';

describe('QuoteListView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(quoteListReducer);

    const view = (
      <Provider store={store}>
        <QuoteListView />
      </Provider>
    );
    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
