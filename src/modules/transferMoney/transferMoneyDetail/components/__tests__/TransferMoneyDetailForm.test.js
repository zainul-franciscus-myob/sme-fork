import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import Store from '../../../../../store/Store';
import TransferMoneyDetailForm from '../TransferMoneyDetailForm';
import receiveMoneyDetailReducer from '../../transferMoneyDetailReducer';

describe('TransferMoneyDetailForm', () => {
  it('should limit reference id  number to 13 characters', () => {
    const store = new Store(receiveMoneyDetailReducer);
    const wrapper = mount(
      <Provider store={store}>
        <TransferMoneyDetailForm />
      </Provider>
    );
    const referenceIdInput = wrapper.find({ name: 'referenceId' }).first();
    expect(referenceIdInput.prop('maxLength')).toBe(13);
  });
});
