import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import InvoiceDetailOptions from '../components/InvoiceDetailOptions';
import Store from '../../../../store/Store';
import invoiceDetailReducer from '../reducer/invoiceDetailReducer';

describe('invoiceDetailsOptions', () => {
  it('should limit invoice number to 13 characters', () => {
    const store = new Store(invoiceDetailReducer);
    const wrapper = mount(
      <Provider store={store}>
        <InvoiceDetailOptions />
      </Provider>
    );
    const invoiceNumberInput = wrapper.find({ name: 'invoiceNumber' }).first();
    expect(invoiceNumberInput.prop('maxLength')).toBe(13);
  });
});
