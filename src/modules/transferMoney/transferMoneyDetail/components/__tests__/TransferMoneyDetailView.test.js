import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import Store from '../../../../../store/Store';
import TransferMoneyDetailView from '../TransferMoneyDetailView';
import transferMoneyDetailReducer from '../../transferMoneyDetailReducer';

describe('TransferMoneyView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(transferMoneyDetailReducer);
    const view = (
      <Provider store={store}>
        <TransferMoneyDetailView
          isCreating
          onUpdateForm={() => {}}
          onSave={() => {}}
          onCancel={() => {}}
          onCancelModal={() => {}}
          onDelete={() => {}}
          onDeleteModal={() => {}}
          onCloseModal={() => {}}
          onDismissAlert={() => {}}
        />
      </Provider>
    );


    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
