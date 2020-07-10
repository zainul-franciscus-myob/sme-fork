import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import Store from '../../../store/Store';
import SupplierReturnPurchaseOptions from '../components/SupplierReturnPurchaseOptions';
import supplierReturnPurchaseReducer from '../SupplierReturnPurchaseReducer';

describe('supplierReturnPurchaseOptions', () => {
  it('should limit supplier return purchase number to 13 characters', () => {
    const store = new Store(supplierReturnPurchaseReducer);
    const wrapper = mount(
      <Provider store={store}>
        <SupplierReturnPurchaseOptions />
      </Provider>
    );
    const supplierReturnPurchaseInput = wrapper
      .find({ name: 'referenceId' })
      .first();
    expect(supplierReturnPurchaseInput.prop('maxLength')).toBe(13);
  });
});
