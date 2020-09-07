import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import InvoicePaymentDetailOptions from '../components/InvoicePaymentDetailOptions';
import Store from '../../../../store/Store';
import invoicePaymentDetailReducer from '../invoicePaymentDetailReducer';

describe('invoicePaymentDetailsOptions', () => {
  it('should limit invoice payment number to 13 characters', () => {
    const store = new Store(invoicePaymentDetailReducer);
    const wrapper = mount(
      <Provider store={store}>
        <InvoicePaymentDetailOptions renderContactCombobox={() => {}} />
      </Provider>
    );
    const invoicePaymentNumberInput = wrapper
      .find({ name: 'referenceId' })
      .first();
    expect(invoicePaymentNumberInput.prop('maxLength')).toBe(13);
  });
});
