import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import Store from '../../../../../store/Store';
import SupplierPaymentDetailView from '../SupplierPaymentDetailView';
import supplierPaymentReducer from '../../supplierPaymentDetailReducer';

describe('SupplierPaymentDetailView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(supplierPaymentReducer);

    const view = (
      <Provider store={store}>
        <SupplierPaymentDetailView
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
