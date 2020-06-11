import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import SpendMoneyDetailSecondaryOptions from '../SpendMoneyDetailSecondaryOptions';
import Store from '../../../../../store/Store';
import spendMoneyDetailReducer from '../../spendMoneyDetailReducer';

describe('spendMoneyDetailSecondaryOptions', () => {
  it('should limit spend money referenceId to 13 characters', () => {
    const store = new Store(spendMoneyDetailReducer);
    const wrapper = mount(
      <Provider store={store}>
        <SpendMoneyDetailSecondaryOptions />
      </Provider>,
    );
    const referenceIdInput = wrapper.find({ name: 'referenceId' }).first();
    expect(referenceIdInput.prop('maxLength')).toBe(13);
  });
});
