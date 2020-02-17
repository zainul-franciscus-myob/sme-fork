import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import BillPaymentDetailView from '../BillPaymentDetailView';
import Store from '../../../../../store/Store';
import billPaymentReducer from '../../billPaymentDetailReducer';

describe('BillPaymentDetailView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(billPaymentReducer);

    const view = (
      <Provider store={store}>
        <BillPaymentDetailView
          onUpdateHeaderOption={() => {}}
          onUpdateTableInputField={() => {}}
          onUpdateDiscountAmount={() => {}}
          onCancelButtonClick={() => {}}
          onDeleteButtonClick={() => {}}
          onSaveButtonClick={() => {}}
          onCancelModal={() => {}}
          onCloseModal={() => {}}
          onDeleteModal={() => {}}
          onDismissAlert={() => {}}
        />
      </Provider>
    );
    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
