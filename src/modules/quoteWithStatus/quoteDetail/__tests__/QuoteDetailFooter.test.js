import { Provider } from 'react-redux';
import { TextArea } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import QuoteDetailFooter from '../components/QuoteDetailFooter';
import Store from '../../../../store/Store';
import quoteDetailReducer from '../reducer/quoteDetailReducer';

describe('quoteDetailFooter', () => {
  it('should limit note max length to 2000 characters', () => {
    const store = new Store(quoteDetailReducer);
    const wrapper = mount(
      <Provider store={store}>
        <QuoteDetailFooter />
      </Provider>
    );
    const noteTextArea = wrapper
      .find(TextArea)
      .filterWhere((t) => t.prop('name') === 'note');
    expect(noteTextArea.prop('maxLength')).toBe(2000);
  });
});
