import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import QuoteDetailOptions from '../components/QuoteDetailOptions';
import Store from '../../../../store/Store';
import quoteDetailReducer from '../reducer/quoteDetailReducer';

describe('quoteDetailsOptions', () => {
  it('should limit quote number to 13 characters', () => {
    const store = new Store(quoteDetailReducer);
    const wrapper = mount(
      <Provider store={store}>
        <QuoteDetailOptions />
      </Provider>,
    );
    const quoteNumberInput = wrapper.find({ name: 'quoteNumber' }).first();
    expect(quoteNumberInput.prop('maxLength')).toBe(13);
  });
});
