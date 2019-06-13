import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import InvoicePaymentView from '../InvoicePaymentDetailView';
import Store from '../../../../store/Store';
import invoicePaymentReducer from '../../invoicePaymentDetailReducer';

describe('InvoicePaymentView', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = new Store(invoicePaymentReducer);

    const view = (
      <Provider store={store}>
        <InvoicePaymentView
          onUpdateInvoicePaymentDetails={() => {}}
          onUpdateInvoicePaymentEntries={() => {}}
          onUpdateShowPaidInvoices={() => {}}
          onUpdateCustomer={() => {}}
          onSaveButtonClick={() => {}}
          onDeleteButtonClick={() => {}}
          onConfirmDelete={() => {}}
          onCloseModal={() => {}}
          onCancelButtonClick={() => {}}
          onConfirmCancel={() => {}}
          onDismissAlert={() => {}}
          onAmountInputBlur={() => {}}
          isLoading
          alertMessage=""
          modalType=""
        />
      </Provider>
    );
    ReactDOM.render(view, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
