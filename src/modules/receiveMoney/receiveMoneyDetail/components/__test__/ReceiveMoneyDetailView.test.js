import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import ReceiveMoneyDetailView from '../ReceiveMoneyDetailView';
import Store from '../../../../../store/Store';
import receiveMoneyDetailReducer from '../../receiveMoneyDetailReducer';

describe('ReceiveMoneyView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(receiveMoneyDetailReducer);
    const view = (
      <Provider store={store}>
        <ReceiveMoneyDetailView
          isCreating
          onUpdateHeaderOptions={() => {}}
          onSaveButtonClick={() => {}}
          onCancelButtonClick={() => {}}
          onDeleteButtonClick={() => {}}
          onCancelModal={() => {}}
          onDeleteModal={() => {}}
          onCloseModal={() => {}}
          onDismissAlert={() => {}}
          onUpdateRow={() => {}}
          onAddRow={() => {}}
          onRemoveRow={() => {}}
          onRowInputBlur={() => {}}
        />
      </Provider>
    );

    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
