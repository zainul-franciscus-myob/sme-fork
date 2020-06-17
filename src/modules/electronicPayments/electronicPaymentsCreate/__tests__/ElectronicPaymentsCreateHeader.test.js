import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import ElectronicPaymentsCreateHeader from '../components/ElectronicPaymentsCreateHeader';
import Store from '../../../../store/Store';
import electronicPaymentsCreateReducer from '../electronicPaymentsCreateReducer';

describe('electronicPaymentsCreateHeader', () => {
  it('should limit bank file payment reference number to 13 characters', () => {
    const store = new Store(electronicPaymentsCreateReducer);
    const wrapper = mount(
      <Provider store={store}>
        <ElectronicPaymentsCreateHeader />
      </Provider>,
    );
    const filePaymentReferenceNumberInput = wrapper.find({ name: 'referenceNumber' }).first();
    expect(filePaymentReferenceNumberInput.prop('maxLength')).toBe(13);
  });
});
