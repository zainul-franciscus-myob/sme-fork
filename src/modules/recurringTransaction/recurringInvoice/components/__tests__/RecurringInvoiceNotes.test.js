import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import RecurringInvoiceNotes from '../RecurringInvoiceNotes';
import Store from '../../../../../store/Store';
import recurringInvoiceReducer from '../../reducer/RecurringInvoiceReducer';

describe('recurringInvoicesOptions', () => {
  it('should limit notes to customer field to 2000 characters', () => {
    const store = new Store(recurringInvoiceReducer);
    const wrapper = mount(
      <Provider store={store}>
        <RecurringInvoiceNotes />
      </Provider>
    );
    const noteInput = wrapper
      .find('TextArea')
      .filterWhere((t) => t.prop('name') === 'note');
    expect(noteInput.prop('maxLength')).toBe(2000);
  });
});
