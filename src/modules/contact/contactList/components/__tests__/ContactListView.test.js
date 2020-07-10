import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import ContactListView from '../ContactListView';
import Store from '../../../../../store/Store';
import contactListReducer from '../../contactListReducer';

describe('ContactListView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(contactListReducer);

    const view = (
      <Provider store={store}>
        <ContactListView businessId="" onDismissAlert={() => {}} />
      </Provider>
    );
    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
