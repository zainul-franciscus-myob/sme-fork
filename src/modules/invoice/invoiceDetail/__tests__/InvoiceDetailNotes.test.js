import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import InvoiceDetailNotes from '../components/InvoiceDetailNotes';
import Store from '../../../../store/Store';
import invoiceDetailReducer from '../reducer/invoiceDetailReducer';

describe('invoiceDetailsOptions', () => {
  it('should limit notes to customer field to 2000 characters', () => {
    const store = new Store(invoiceDetailReducer);
    const wrapper = mount(
      <Provider store={store}>
        <InvoiceDetailNotes />
      </Provider>,
    );
    const noteInput = wrapper.find('TextArea').filterWhere((t) => t.prop('name') === 'note');
    expect(noteInput.prop('maxLength')).toBe(2000);
  });
});
