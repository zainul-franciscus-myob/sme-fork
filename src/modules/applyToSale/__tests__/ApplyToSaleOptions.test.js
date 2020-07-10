import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import ApplyToSaleOptions from '../components/ApplyToSaleOptions';
import Store from '../../../store/Store';
import applyToSaleReducer from '../applyToSaleReducer';

describe('applyToSaleOptions', () => {
  it('should limit reference number to 13 characters', () => {
    const store = new Store(applyToSaleReducer);
    const wrapper = mount(
      <Provider store={store}>
        <ApplyToSaleOptions />
      </Provider>
    );
    const referenceNumberInput = wrapper.find({ name: 'reference' }).first();
    expect(referenceNumberInput.prop('maxLength')).toBe(13);
  });
});
