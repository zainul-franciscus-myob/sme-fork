import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import GeneralJournalDetailOptions from '../GeneralJournalDetailOptions';
import Store from '../../../../../store/Store';
import generalJournalDetailReducer from '../../generalJournalDetailReducer';

describe('generalJournalDetailOptions', () => {
  it('should limit general jouranl referenceId to 13 characters', () => {
    const store = new Store(generalJournalDetailReducer);
    const wrapper = mount(
      <Provider store={store}>
        <GeneralJournalDetailOptions />
      </Provider>,
    );
    const referenceIdInput = wrapper.find({ name: 'referenceId' }).first();
    expect(referenceIdInput.prop('maxLength')).toBe(13);
  });
});
