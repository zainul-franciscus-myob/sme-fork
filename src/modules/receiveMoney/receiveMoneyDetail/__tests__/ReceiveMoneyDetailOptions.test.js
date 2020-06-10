import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import ReceiveMoneyDetailOptions from '../components/ReceiveMoneyDetailOptions';
import Store from '../../../../store/Store';
import receiveMoneyDetailReducer from '../receiveMoneyDetailReducer';

describe('payRefundDetail', () => {
  it('should limit pay refund  number to 13 characters', () => {
    const store = new Store(receiveMoneyDetailReducer);
    const wrapper = mount(
      <Provider store={store}>
        <ReceiveMoneyDetailOptions />
      </Provider>,
    );
    const referenceIdInput = wrapper.find({ name: 'referenceId' }).first();
    expect(referenceIdInput.prop('maxLength')).toBe(13);
  });
});
