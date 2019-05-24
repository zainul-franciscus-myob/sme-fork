import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import BillPaymentView from '../BillPaymentDetailView';
import Store from '../../../../store/Store';
import billPaymentReducer from '../../billPaymentDetailReducer';

describe('BillPaymentView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(billPaymentReducer);

    const view = (
      <Provider store={store}>
        <BillPaymentView
          isLoading
          isTableEmpty
          totalAmount=""
          onUpdateHeaderOption={() => {}}
          onUpdateTableInputField={() => {}}
          onUpdateDiscountAmount={() => {}}
          onCancelButtonClick={() => {}}
          onDeleteButtonClick={() => {}}
          onSaveButtonClick={() => {}}
          modalType=""
          onAmountInputBlur={() => {}}
          onCancelModal={() => {}}
          onCloseModal={() => {}}
          onDeleteModal={() => {}}
        />
      </Provider>
    );
    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
