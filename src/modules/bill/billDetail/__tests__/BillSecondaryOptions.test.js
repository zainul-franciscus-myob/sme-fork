import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import BillSecondaryOptions from '../components/BillSecondaryOptions';
import Store from '../../../../store/Store';
import billReducer from '../reducer/billReducer';

describe('billSecondaryOptions', () => {
  it('should limit Bill number to 13 characters', () => {
    const store = new Store(billReducer);
    const wrapper = mount(
      <Provider store={store}>
        <BillSecondaryOptions />
      </Provider>
    );
    const billNumberInput = wrapper.find({ name: 'billNumber' }).first();
    expect(billNumberInput.prop('maxLength')).toBe(13);
  });
});
